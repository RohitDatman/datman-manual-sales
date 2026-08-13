<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();
// forming business related values
// $merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// $merchant_id = 63155480; // adyen - OMNICART
// $merchant_id = 663211239; // fastfood
$merchant_id = 663212350;  // adyen - fastfood 
// $merchant_id = 663212494;  // adyen - Quickchow
// $merchant_id = 663192104; // adyen BP
// $merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663209873 - Edining Adyen
// 663211239 - FASTFOOD
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "rohit@datman.je"; //$faker->email;
$webhook_url = "https://webhook.site/12179e55-2b05-4d4e-86b0-e7a0ced81b20"; //$faker->url;
// $webhook_url = "https://www.google.com";
$redirect_url = "https://www.google.com";
$cancel_url = "https://".$host."/cancel";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(5000000,5999999),
    // "order_id"              => '355b-6e0d-48c3-b9e9-439752b9b22',
    // "customer_id"           => 13831683, // adyen
    "customer_id"           =>  $faker->numberBetween(500000000,599999999),
    // "provider"              => $provider, 
    "email"                 => $email,
    "phone_number"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    // "amount"                => $faker->randomFloat(2,10,50),
    "amount"                => 35.00,
    // "avs_house_number"        => $faker->buildingNumber,
    "avs_house_number"        => '347',
    // "avs_postcode"           => $faker->postcode,
    // "avs_postcode"           => 'NN17 8YG',
    "avs_postcode"           => '92837',
    "merchant_reference"     => $faker->numerify("MerchantReference##########"),
    "redirect_url"           => $redirect_url,
    "cancel_url"             => $cancel_url,
    "cash_payment_url"        => $redirect_url,
    "webhook_url"            => $webhook_url,
    // "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "first_name"             => $faker->firstName,
    "last_name"              => $faker->lastName,
    "flat"                  => (string) $faker->randomNumber(2),
    "address1"              => $faker->city,
    "address2"              => $faker->streetName,
    // "txn_type"            => "WALLET_RECHARGE_AGAINST_ORDER",
    // "source"             => "mobile-app",
    "back_url"               => $cancel_url,
    "DbTotal"               => false,
    // "source"                => "mobile-app",
    // "token_avs" => "",
//     "token" => "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen OMNICART
//     "token" => "mxtoken_e1ea0a4b52774ff8789c32893ae594284916ed4b548330b0d90f1b5fac2350c0", // adyen EDININGEXPRESS 
// "token" => "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen
    // "last4_digits" => "4444", // spreedly
    // "last4_digits" => "4242", // checkout/supper
    // "last4_digits" => "0004", // adyen/dna
    // "last4_digits" => "1111",
    // "last4_digits" => "0821",
    // "last4_digits" => "0004",
);

$split_fee = [
    [
      "partner_merchant_id" => 663212342,  // sandbox BP - US
      "type_id" => 370,
      "value" => 5.00,
      "value_type" => "amount"
    ],
    [
      // "partner_merchant_id" => 663176007,
      "partner_merchant_id" => 663212156,  // sandbox BP - US
      "type_id" => 8,
      "value" => 1.90,
      "value_type" => "amount"
    ]
];

$payload['split_fee'] = $split_fee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

// $datmanHost = "https://ws6-payments.datmanpay.com";
$datmanHost = "https://sandbox-payments-fastfood.datmanpay.com";
// $datmanHost = "https://ws11.datmanpay.com";
// https://ws9-payments-edining.datmanpay.com

// $switchHost = 'https://ws3-payments.datmanpay.com/switch/api/v1';
// $switchHost = 'https://ws7-payments.datmanpay.com/switch/api/v1';
$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

// echo "<a href='$datmanHost/barclays/phonePayment.php?data=$encryptedData' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Available in production</i>";
// echo "<br>";
// echo "<br>";
// echo "<br>";
// echo "<br>";
// echo "<a href='$datmanHost/barclays/onlinePaymentV2.php?data=$encryptedData' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Available in production</i>";
// echo "<br>";
// echo "<br>";
// echo "<a href='$datmanHost/barclays-irl/onlinePaymentV4.php?data=$encryptedData' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Available in production</i>";
// echo "<br>";
// echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=".EncryptNew(json_encode($payload))."' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
//lszOjEGjqUyMjggJUMvzYfELIUnTLWxFlqn
//tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf - Partners Stage key
//dVTEP9mTLerN6nKi5o54QYBGXu58b7NG
// function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
function payment_encrypt2($string, $key = 'dVTEP9mTLerN6nKi5o54QYBGXu58b7NG')  //Fastfood stage key
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'dVTEP9mTLerN6nKi5o54QYBGXu58b7NG', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}


// 3ds token - 599486996 - mxtoken_6505c035b30226df3e1b18a0af7808aee8e5ff7c958ee160defe43f0daf8e3e3
// non 3ds token - 565841547 - mxtoken_e1ea0a4b52774ff8789c32893ae594284916ed4b548330b0d90f1b5fac2350c0