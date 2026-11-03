<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values  
$merchant_id = "663227683";
//  $merchant_id = "663197155"; // cs
// $merchant_id = 663195606;
//  $merchant_id = 663227683; //adyen  us store id enabled
//  $merchant_id = 663209575; // Adyen UK
// $merchant_id = 663194535; // Cashflow
// $merchant_id = 63191145; // CS-CH us
// checkout-hf - 663195606
// cardstream - 663197155
// adyen-hf - 663190774
// cs-ch usa
// "63191145";
// 663232982 Spreedly [do not make sale]
// 663195603 - spreedly
// 63181447 - CS new UI
$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = $faker->email;
$webhookUrl = "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net";
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";
$CashPaymentUrl = "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiio7TVir30AhWQwzgGHTCADqYQ_AUoAnoECAEQBA&biw=1226&bih=689&dpr=2";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id, 
    "order_id"              => $faker->numberBetween(500000,599999),
    "customer_id"           => $faker->numberBetween(10000000,19999999),
    // "customer_id"           => 80491037,
    "provider"              => $provider, 
    "email"                 => "rohit@datman.je",//$email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => "5.99",//$faker->randomFloat(2,10,49),
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => "ST57TF",//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    // "backurl"              => "",
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => "Rohit",//$faker->firstName, //new field
    "lastname"              => "testing",//$faker->lastName, //new field
   "flat"                  => "10",//$faker->randomNumber(2), //new field
   "address1"              => $faker->city, //new field
   "address2"              => $faker->streetName, //new field
  //  "address1"              => "Flat 6", //new field
  //  "address2"              => "AA11AA", //new field
    "CashPaymentUrl"        => $CashPaymentUrl,
    "txnType" => "CREATE_MIT_TOKEN",

  //  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}',
  //   "token" => '', //optional (Applicable for Optomany/EG)
  //   "last4Digits" => "2718"
  //  "metadata" => [
//  description => "testing description"
  // ]
);
$SplitFee = [ 
  (object)[
    "partner_merchant_id" => 63181447,
    "type_id" => 6,
    "value" => 0.50,
    "value_type" => "amount"
  ]

];
//$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";
$encryptedData = payment_encrypt2($payload);


//https:/payments-b.datmanpay.com/switch/api/v1
$datmanHost = "http://datmanpay.com";
$switchHost = "https:/payments.datmanpay.com/switch/api/v1";
// "https:/payments.datmanpay.com/switch/api/v1";
//https:/payments-b.datmanpay.com/switch/api/v1
// EAHoxLsA9GD8yUR1H3N7H8Dcw8IreEwg - Pre prod token
// wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h - prod token

$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload));

  function payment_encrypt2($string, $key = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h') //PROD 
  //  function payment_encrypt2($string, $key = 'EAHoxLsA9GD8yUR1H3N7H8Dcw8IreEwg') // pre-prod
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h', $encryptionMethod = "AES-256-CBC")

{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

