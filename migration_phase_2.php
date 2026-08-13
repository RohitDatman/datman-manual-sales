<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
// $merchant_id=663184566; //CS-OBN2
// $merchant_id= 663191524; //CS-OBN
// $merchant_id=663192242; //CS-CH
// $merchant_id= 1234700; //CS-CH-US
$merchant_id=663192401; //CS_CH-AUS
// $merchant_id=1235000; //CS
// $merchant_id=663191840; //checkout
// $merchant_id= 1234572 ; //spreedly
// $merchant_id=63182138; //paystack
// $merchant_id=663185441 ;//adyen-hf
// $merchant_id=63154671 ;//stripe
// $merchant_id=663207586 ;//- stripe-supper
// $merchant_id=63155140 ;//- stripe
// $merchant_id=663192887;
// $merchant_id=663207590;
// $merchant_id=63182138 ;//paystack

// $merchant_id=1235010; // non-cs merchnat from ireland
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://webhook.site/6168c3b1-2e00-4a36-8a9e-1683513f268a"; //$faker->url;
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";

$payload = array(
  "host"                  => $host,
  "merchant_id"           => $merchant_id,
  // "order_id"=>"591368638",
  "order_id"              => $faker->numberBetween(500000000, 599999999),
  "customer_id"           => $faker->numberBetween(10000000, 19999999),
  // "customer_id"           => 19880068,

  "provider"              => $provider,
  "email"                 => "mohd.ruhan@datman.je",
  "phoneNumber"           => $faker->numerify("07##########"),
  "name"                  => $business_name,
  // "Amount"                =>  $faker->randomFloat(2, 10, 50),
  "AvsHouseNumber"        => $faker->buildingNumber,
  "Amount"                => "-10",
  "AvsHouseNumber"        => 'Flat',
  // "AvsPostcode"           => $faker->postcode,
  "AvsPostcode"           => 'NN17 8YG',
  "MerchantReference"     => $faker->numerify("MerchantReference##########"),
  "RedirectUrl"           => $RedirectUrl,
  "CancelUrl"             => $CancelUrl,
  "WebhookUrl"            => $webhookUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname"             => $faker->firstName, //new field
  "lastname"              => $faker->lastName, //new field
  "flat"                  => (string) $faker->randomNumber(2), //new field
  "address1"              => $faker->city, //new field
  "address1"              => '6', //new field
  "address2"              => $faker->streetName, //new field
  "backurl"               => 'https:\/\/sit-web30-uk.fhcdn.dev\/order-now',
  // "source"                => 'mobile-app', //hide GooglePay/ApplePay

  // "TokenAvs" => "",
  // "token" => "mxtoken_e68d1bd73725b4e3a99b28bca92bfc4fd339fb655d8b1238e46d83e99267eca6", // cardstream
  "last4Digits" => "0821",
//   // "DbTotal"=> "true"
);

$SplitFee = [ 
    [
      "partner_merchant_id" => 63185007, 
      "type_id" => 3,
      "value" => 1.00,
      "value_type" => "amount"
    ]
    // [
    //   "partner_merchant_id" => 63153527, 
    //   "type_id" => 4,
    //   "value" => 10,
    //   "value_type" => "percentage"
    // ]
];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

// $encryptedData = payment_encrypt2($payload);

$encryptedoldData = payment_encrypt2($payload);

$encryptedData = EncryptNew(json_encode($payload));

// $datmanHost = "http://legacy-qa-5.datmanpay.com";
// $datmanHost = "http://legecy-release.datmanpay.com";
$datmanHost = "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// $datmanHost = "http://localhost:3000";
// $datmanHost = "http://legacy-qa-4.datmanpay.com";
// $datmanHost = "http://legacy-qa-3.datmanpay.com";
// $datmanHost = "https://legacy-qa-3.datmanpay.com";
// $datmanHost='http://localhost:4010/dev';
// $phpHost='http://localhost';
$phpHost = "https://ws1.datmanpay.com";
// $phpHost = "https://stage.datmanpay.com";


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

echo "<a href='$phpHost/opto/card.php?data=$encryptedoldData' target='_blank'>old PHP </a> ";

echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>PHP MIGRATION </a> ";

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








?>