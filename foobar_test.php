<?php
$merchant_id = 63155140;
$order_id = 123456790;
$customer_id = 223456789;
$provider = "FOOBAR";
$business_name = "Merchant Name";
$host = "example.com";
$email = "test@test.com";
$phoneNumber = "07123456789";
$webhookUrl = "https://example.com/webhook"; //$faker->url;
$RedirectUrl = "https://example.com/success";
$CancelUrl = "https://example.com/cancel";

$datmanHost = "https://legacy-sandbox.datmanpay.com";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $order_id,
    "customer_id"           => $customer_id,
    "provider"              => $provider, 
    "email"                 => $email,
    "phoneNumber"           => $phoneNumber,
    "name"                  => $business_name,
    "Amount"                => 10.00,
    "AvsHouseNumber"        => '10 streetname',
    "AvsPostcode"           => 'NN17 8YG',
    "MerchantReference"     => "some_reference_123",
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => "2022-01-15 16:00:00",
    "firstname"             => "John", 
    "lastname"              => "Doe",
    "flat"                  => "10", 
    "address1"              => "Address,Line,1",
    "address2"              => "Address,Line,2",
);
var_dump($payload);

echo "<a href='$datmanHost/opto/card.php?data=".Encrypt(json_encode($payload))."&from=FOOBAR' target='_blank'>Click here to make payment</a>";
echo "<br>";
echo "<br>";

//h3fTf7vrGkcuNPGBjGW4hExGdLCRfeq5 //foodbar staging
function Encrypt($textToEncrypt, $secret = 'h3fTf7vrGkcuNPGBjGW4hExGdLCRfeq5', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}
