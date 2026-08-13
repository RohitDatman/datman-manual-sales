<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
$merchant_id = "663207623";
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net?simple=1&bSuccess&id=330831810&transaction=66643"; //$faker->url;
$RedirectUrl = "https://www.google.com";
$CancelUrl = "https://".$host."/cancel?simple=1&bSuccess&id=330831810&transaction=66643";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    "customer_id"           => "180252445",//$faker->numberBetween(10000000,19999999),
    "provider"              => $provider, 
    "email"                 => "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site",
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => "62.00",//$faker->randomFloat(2,10,50),
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => $faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    // "TokenAvs" => "",
    // "token" => "mxtoken_b071fa0c83b52e03d19511fd0fde0743",
    // "last4Digits" => "4081",
);

$SplitFee = [ 
    [
      "partner_merchant_id" => 1234600, 
      "type_id" => "1",
      "value" => 10.00,
      "value_type" => "amount"
    ],
    [
        "partner_merchant_id" => 1235000, 
        "type_id" => "2",
        "value" => 10.00,
        "value_type" => "amount"
      ]
];
 $payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);
$datmanHost = "https://ws7-payments.datmanpay.com";
// $datmanHost = "https://legacy-test.datmanpay.com";
// $datmanHost  ='https://stage.datmanpay.com';
$switchHost = 'https://payments.datmanpay.com/switch/api/v1';
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
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}