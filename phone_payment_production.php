<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
// $merchant_id = "663197155"; // cs
// $merchant_id = 663195603;
$merchant_id = 63181447;//checkout
// $merchant_id = "663159021";//cs-ch usa non o2m
// $merchant_id = "63191145";//cs-ch o2m pre-prod
// $merchant_id = 663206519;
// $merchant_id = 663194940; //adyen
// $merchant_id = 63181447;//cs
// $merchant_id = 663214163;//cs-bigtable

// $merchant_id = 111111;//cs-paysafe
// adyen-hf - 663190774
// $merchant_id = 63169829;//adyen usa
// $merchant_id = "663206519"; // Adyen DI USA

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
    "order_id"              => $faker->numberBetween(500000000,599999999),
    // "customer_id"           => $faker->numberBetween(10000000,19999999),
    "customer_id"           => 80491037,
    // "customer_id" => "12456192",
    "provider"              => $provider, 
    "email"                 => "rohit@datman.je",//$email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => "1.14",//$faker->randomFloat(2,10,49),
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => "ST57TF",//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "backurl"               => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
   "flat"                  => "t",//$faker->randomNumber(2), //new field
   "address1"              => "vg ",//$faker->city, //new field
   "address2"              => "vgh",//$faker->streetName, //new field
    "CashPaymentUrl"        => $CashPaymentUrl,

  //  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}',
  //   "token" => '', //optional (Applicable for Optomany/EG)
  //   "last4Digits" => "2718"
);
$SplitFee = [ 
  (object)[
    "partner_merchant_id" => 663195604,
    "type_id" => 1,
    "value" => 0.05,
    "value_type" => "amount"
  ]

];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";
$encryptedData = payment_encrypt2($payload);

// $datmanHost = "http://datmanpay.com";

// $datmanHost = "https://dr-payments.datmanpay.com";


// $datmanHost="https://dr-payments.datmanpay.com/switch/api/v1";

// $switchHost = "https:/payments-b.datmanpay.com/switch/api/v1";
// $datmanHost = "http://datmanpay.com";//prod
$switchHost = "https://dr-payments.datmanpay.com/switch/api/v1";//prod

// $switchHost = "https://dr-payments.datmanpay.com/switch/api/v1"



$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload));

function payment_encrypt2($string, $key = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h', $encryptionMethod = "AES-256-CBC") // Prod
// function EncryptNew($textToEncrypt, $secret = 'EAHoxLsA9GD8yUR1H3N7H8Dcw8IreEwg', $encryptionMethod = "AES-256-CBC") // Pre-Prod
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

