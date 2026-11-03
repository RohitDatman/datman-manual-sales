<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Website;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class DatmanPaymentService
{
    public function configurationIsReady(): bool
    {
        return filled(config('datman.secret_key'))
            && filled(config('datman.webhook_secret'))
            && filled(config('datman.provider_merchant_id'));
    }

    public function canProcess(Website $website): bool
    {
        return $this->configurationIsReady() && filled($website->datman_merchant_id);
    }

    /**
     * Build the Datman hosted card URL for this order.
     *
     * The vendor merchant on the website receives the payment. The order
     * processing fee is split to the platform merchant in the environment.
     *
     * @return array{url: string, reference: string, amount: float, currency: string, processing_fee: float}
     */
    public function createHostedCheckout(Order $order): array
    {
        $order->loadMissing(['website', 'contactInfo']);
        $website = $order->website;

        if (!$website || !$this->canProcess($website)) {
            Log::warning('Datman payment configuration missing', [
                'order_id' => $order->id,
                'website_id' => $order->website_id,
            ]);

            throw new RuntimeException('Datman is not configured for this website.');
        }

        $amount = round((float) $order->final_order_total, 2);
        if ($amount <= 0) {
            throw new RuntimeException('Datman payment amount must be greater than zero.');
        }

        $fee = round((float) ($order->processing_fee ?? 0), 2);
        if ($fee >= $amount) {
            Log::warning('Datman processing fee is not less than the charge amount', [
                'order_id' => $order->id,
                'website_id' => $order->website_id,
                'amount' => $amount,
                'processing_fee' => $fee,
            ]);

            throw new RuntimeException('The processing fee must be less than the card payment amount.');
        }

        $contact = $order->contactInfo;
        $nameParts = preg_split('/\s+/', trim((string) ($contact?->name ?? 'Customer')), 2) ?: [];
        $reference = $this->newReference($order);
        $currency = strtoupper((string) config('datman.currency', 'GBP'));

        $merchantId = trim((string) $website->datman_merchant_id);
        if ($merchantId === '' || !ctype_digit($merchantId)) {
            throw new RuntimeException(
                'Datman merchant ID must be the numeric merchant ID from the Datman portal (Admin → Website → Datman Merchant ID).'
            );
        }

        $email = trim((string) ($contact?->email ?? ''));
        $phoneNumber = $this->internationalPhone($contact?->phone_no);
        $customerId = trim((string) ($order->user_id ?: $order->guest_id));

        if ($email === '' || $phoneNumber === '' || $customerId === '') {
            throw new RuntimeException('Customer email, phone, and session are required before Datman card payment.');
        }

        $payload = [
            'host' => $this->hostFor($website),
            'merchant_id' => (int) $merchantId,
            'order_id' => $reference,
            'customer_id' => $customerId,
            'provider' => (string) config('datman.provider', 'DATMAN'),
            'email' => $email,
            'phone_number' => $phoneNumber,
            'name' => (string) ($website->business_name ?: $website->title),
            'amount' => number_format($amount, 2, '.', ''),
            'merchant_reference' => (string) $order->id,
            'redirect_url' => $this->datmanCallbackUrl($this->absoluteRoute('datman.payment.success', $order, $website)),
            'cancel_url' => $this->datmanCallbackUrl($this->absoluteRoute('datman.payment.cancel', $order, $website)),
            'webhook_url' => $this->datmanCallbackUrl($this->webhookUrl($order, $website)),
            'back_url' => $this->datmanCallbackUrl($this->absoluteRoute('catalog.viewCart', $order, $website)),
            'first_name' => $nameParts[0] ?: 'Customer',
            'last_name' => $nameParts[1] ?? 'Customer',
        ];

        $postcode = trim((string) ($contact?->postcode ?? ''));
        if ($postcode !== '') {
            $payload['avs_postcode'] = str_replace(' ', '', $postcode);
        }

        $address = trim((string) ($contact?->address ?? ''));
        if ($address !== '') {
            $payload['address1'] = $address;
            $house = strtok($address, ' ');
            if ($house !== false && $house !== '') {
                $payload['avs_house_number'] = $house;
            }
        }

        if ($fee > 0) {
            $partnerMerchantId = trim((string) config('datman.provider_merchant_id'));
            if ($partnerMerchantId === '' || !ctype_digit($partnerMerchantId)) {
                throw new RuntimeException('DATMAN_PROVIDER_MERCHANT_ID must be a numeric Datman merchant ID for processing fee splits.');
            }

            $payload['split_fee'] = [[
                'partner_merchant_id' => (int) $partnerMerchantId,
                'type_id' => '2',
                'value' => number_format($fee, 2, '.', ''),
                'value_type' => 'amount',
            ]];
        }

        $redirectUrl = $this->hostedUrl($payload);
        $this->logRedirectRequest($order, $website, $payload, $redirectUrl, $reference);

        return [
            'url' => $redirectUrl,
            'reference' => $reference,
            'amount' => $amount,
            'currency' => $currency,
            'processing_fee' => $fee,
        ];
    }

    public function signatureIsValid(string $rawBody, ?string $signature): bool
    {
        $secret = (string) config('datman.webhook_secret');
        if ($secret === '' || $signature === null || $signature === '') {
            return false;
        }

        $received = trim($signature);

        // Datman docs: Base64-encode raw HMAC-SHA256 bytes of the unparsed body.
        // https://docs.datman.je/webhook-verification-1861632m0
        $expectedBase64 = base64_encode(hash_hmac('sha256', $rawBody, $secret, true));
        if (hash_equals($expectedBase64, $received)) {
            return true;
        }

        // Some Datman PHP samples compare hex HMAC-SHA256(trim(body)) without Base64.
        $expectedHex = hash_hmac('sha256', trim($rawBody), $secret);
        if (hash_equals($expectedHex, $received)) {
            return true;
        }

        $expectedBase64TrimmedBody = base64_encode(hash_hmac('sha256', trim($rawBody), $secret, true));
        if (hash_equals($expectedBase64TrimmedBody, $received)) {
            return true;
        }

        return false;
    }

    private function hostedUrl(array $payload): string
    {
        $encrypted = $this->encryptPayload($payload);
        $url = $this->baseUrl() . '/opto/card.php?data=' . rawurlencode($encrypted);

        $publicKey = (string) config('datman.public_key');
        if ($publicKey !== '') {
            $url .= '&pub_key=' . rawurlencode($publicKey);
        }

        return $url;
    }

    private function logRedirectRequest(Order $order, Website $website, array $payload, string $redirectUrl, string $reference): void
    {
        if (!$this->shouldLogRedirectPayload()) {
            return;
        }

        $payloadJson = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        if ($payloadJson === false) {
            $payloadJson = '(json_encode failed)';
        }

        $meta = [
            'order_id' => $order->id,
            'website_id' => $website->id,
            'website_title' => $website->title,
            'payment_reference' => $reference,
            'datman_base_url' => $this->baseUrl(),
            'payload_double_base64' => filter_var(config('datman.payload_double_base64', false), FILTER_VALIDATE_BOOLEAN),
            'provider' => config('datman.provider'),
            'public_key_suffix' => $this->maskedPublicKey(),
        ];

        // Put JSON in the log message so viewers always show full values (not just context keys).
        Log::info(
            'Datman hosted redirect — plaintext payload (pre-encryption)' . PHP_EOL
            . json_encode($meta, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
            . '--- payload ---' . PHP_EOL
            . $payloadJson . PHP_EOL
            . '--- end payload ---'
        );

        Log::info('Datman hosted redirect — customer redirect URL (order ' . $order->id . '): ' . $redirectUrl);
    }

    private function shouldLogRedirectPayload(): bool
    {
        $configured = config('datman.log_redirect_payload');

        // When config is not cached, env() is available; when cached, rebuild config after .env changes.
        if ($configured === null && !app()->configurationIsCached()) {
            $configured = env('DATMAN_LOG_REDIRECT_PAYLOAD', false);
        }

        return filter_var($configured, FILTER_VALIDATE_BOOLEAN);
    }

    private function maskedPublicKey(): ?string
    {
        $publicKey = trim((string) config('datman.public_key'));
        if ($publicKey === '') {
            return null;
        }

        if (strlen($publicKey) <= 10) {
            return '***';
        }

        return substr($publicKey, 0, 7) . '...' . substr($publicKey, -4);
    }

    private function encryptPayload(array $payload): string
    {
        $secret = (string) config('datman.secret_key');
        if (strlen($secret) < 32) {
            $secret = str_pad($secret, 32, "\0");
        } elseif (strlen($secret) > 32) {
            $secret = substr($secret, 0, 32);
        }

        $json = json_encode($payload, JSON_UNESCAPED_SLASHES);
        if ($json === false) {
            throw new RuntimeException('Datman payload could not be encoded.');
        }

        $iv = substr($secret, 0, 16);
        $encrypted = openssl_encrypt($json, 'AES-256-CBC', $secret, OPENSSL_RAW_DATA, $iv);
        if ($encrypted === false) {
            throw new RuntimeException('Datman payload could not be encrypted.');
        }

        $encoded = base64_encode($encrypted);

        if (filter_var(config('datman.payload_double_base64', false), FILTER_VALIDATE_BOOLEAN)) {
            return base64_encode($encoded);
        }

        return $encoded;
    }

    /**
     * Datman requires HTTPS callback URLs ([Sale hosted form](https://docs.datman.je/sale-2189714m0)).
     */
    private function datmanCallbackUrl(string $url): string
    {
        $forceHttps = config('datman.force_https_urls');
        if ($forceHttps !== null && !filter_var($forceHttps, FILTER_VALIDATE_BOOLEAN)) {
            return $url;
        }

        return (string) preg_replace('#^http://#i', 'https://', $url);
    }

    private function baseUrl(): string
    {
        $configured = trim((string) config('datman.base_url'));
        if ($configured !== '') {
            return rtrim($configured, '/');
        }

        $account = trim((string) config('datman.account_name'));
        $sandbox = filter_var(config('datman.test_mode', true), FILTER_VALIDATE_BOOLEAN);

        if ($account !== '') {
            return $sandbox
                ? 'https://sandbox-payments-' . $account . '.datmanpay.com'
                : 'https://payments-' . $account . '.datmanpay.com';
        }

        return $sandbox
            ? 'https://sandbox-payments.datmanpay.com'
            : 'https://payments.datmanpay.com';
    }

    private function hostFor(Website $website): string
    {
        $host = trim((string) $website->title);
        $host = (string) preg_replace('#^https?://#i', '', $host);
        $host = (string) preg_replace('#/.*$#', '', $host);

        return rtrim($host, '/');
    }

    private function webhookUrl(Order $order, Website $website): string
    {
        $configured = trim((string) config('datman.webhook_url'));
        if ($configured !== '') {
            return rtrim($configured, '/');
        }

        return $this->absoluteRoute('datman.payment.webhook', $order, $website);
    }

    private function absoluteRoute(string $routeName, Order $order, Website $website, array $parameters = []): string
    {
        $parameters = array_merge(['order' => $order->id], $parameters);

        if ($routeName === 'catalog.viewCart') {
            unset($parameters['order']);

            return $this->paymentBaseUrl($website) . route($routeName, [], false);
        }

        return $this->paymentBaseUrl($website) . route($routeName, $parameters, false);
    }

    /**
     * Multivendor: callback URLs always use the vendor's websites.title domain,
     * not a global APP_URL or .env base URL. The current request is only used
     * when its host matches that vendor (scheme preserved for http local / https prod).
     */
    private function paymentBaseUrl(Website $website): string
    {
        $configured = trim((string) config('datman.callback_base_url'));
        if ($configured !== '') {
            return rtrim($configured, '/');
        }

        $vendorHost = $this->hostFor($website);
        if ($vendorHost === '') {
            throw new RuntimeException('Website URL (title) is required to build Datman callback URLs.');
        }

        $host = $this->callbackHost($vendorHost);
        $scheme = $this->callbackScheme($vendorHost);

        return $scheme . '://' . $host;
    }

    private function callbackHost(string $vendorHost): string
    {
        if ($this->requestMatchesVendor($vendorHost)) {
            return request()->getHttpHost();
        }

        return $vendorHost;
    }

    private function callbackScheme(string $vendorHost): string
    {
        $forceHttps = config('datman.force_https_urls');
        if ($forceHttps !== null) {
            return filter_var($forceHttps, FILTER_VALIDATE_BOOLEAN) ? 'https' : 'http';
        }

        if ($this->requestMatchesVendor($vendorHost) && request()->getScheme() !== '') {
            if (request()->getScheme() === 'https') {
                return 'https';
            }

            return app()->environment('production') ? 'https' : 'http';
        }

        return app()->environment('production') ? 'https' : 'http';
    }

    private function requestMatchesVendor(string $vendorHost): bool
    {
        if (app()->runningInConsole() || request()->getHttpHost() === '') {
            return false;
        }

        return strcasecmp(
            $this->normalizeHost(request()->getHttpHost()),
            $this->normalizeHost($vendorHost)
        ) === 0;
    }

    private function normalizeHost(string $host): string
    {
        $host = (string) preg_replace('#^https?://#i', '', trim($host));
        $host = (string) preg_replace('#/.*$#', '', $host);

        return (string) preg_replace('#^www\.#i', '', $host);
    }

    private function internationalPhone(?string $phone): string
    {
        $digits = preg_replace('/\D+/', '', (string) $phone) ?? '';

        if (str_starts_with($digits, '44')) {
            return '+' . $digits;
        }

        if (str_starts_with($digits, '0')) {
            return '+44' . substr($digits, 1);
        }

        return $digits !== '' ? '+' . $digits : '';
    }

    private function newReference(Order $order): string
    {
        return sprintf('DM-%d-%d-%s', $order->website_id, $order->id, now()->format('YmdHis'));
    }
}