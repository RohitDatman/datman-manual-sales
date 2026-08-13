<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values

$merchant_id = 663195603;

$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = $faker->email;
$webhookUrl = "https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net"; //$faker->url;
$RedirectUrl = "https://www.google.com";
$CancelUrl = "https://" . $host . "/cancel";

$payload = array(
  // "source"=> "mobile-app",
  "host" => $host,
  "merchant_id" => $merchant_id,
  "order_id" => 
  // "hgbhhgn",
  $faker->numberBetween(500000, 599999),
  "customer_id" => "80491037",
  // "customer_id"           => $faker->numberBetween(10000000,19999999),
  "provider" => $provider,
  "email" => "rohit@datman.je",
  "phoneNumber" => $faker->numerify("07##########"),
  "name" => $business_name,
  "Amount" => "0.80",//$faker->randomFloat(2,10,50),
  "AvsHouseNumber" => "7",//$faker->buildingNumber,
  "AvsPostcode" => "NN178YG",//$faker->postcode,
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "RedirectUrl" => $RedirectUrl,
  "CancelUrl" => $CancelUrl,
  "WebhookUrl" => $webhookUrl,
  "backurl" => $CancelUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname" => "😭😭Rohit", //new field
  "lastname" => "😭😭M", //new field
  "flat" => (string) $faker->randomNumber(2), //new field
  "address1" => $faker->city, //new field
  "address2" => $faker->streetName, //new field,
  // "txnType" => "WALLET_RECHARGE_AGAINST_ORDER",
  // "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  // "CashPaymentUrl"        => $CashPaymentUrl,
  
  

  // cs prod token for 80491037

  // "token" =>"mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",
  // "last4Digits" => '5005'

  // 5262 card
  //   "token" => "mxtoken_7c61dc13c7ddec87f278fb822659a3c4df691a5a5064cc3ad7b41a6591622223",
  // "last4Digits" => '5262'

  // adyen master token
  // "token" => 'mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea',
  // "last4Digits" => '5005'
  
  // 'mxtoken_OGr4durMmjyIN7ypKr4r5zkj_tI1sinU',
  // 5005 card 

   "token" => "mxtoken_OGr4durMmjyIN7ypKr4r5zkj_tI1sinU",  //cs prod token for 80491037

  // // // // // // // //  cs ch master token 
  // // // // // // // 'mxtoken_142c523573d2ff8e57d7bf8c2802b37e', //optional (Applicable for Optomany/EG)
  
  //adyen usa master token
  // "token" => "mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c" ,
  "last4Digits" => '5005'
  
  
  // cs master token 
  // "token"  => "mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",
  // "last4Digits" => '5005'

);

$SplitFee = [
  [
    "partner_merchant_id" => 663206519,
    "type_id" => 2,
    "value" => 0.51,
    "value_type" => "amount"
  ],
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 7,
  //   "value" => 0.05,
  //   "value_type" => "amount"
  // ]
];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);
$encryptNewData = EncryptNew(json_encode($payload));

// $datmanHost = "https://ws4.datmanpay.com";

$datmanHost = "https://datmanpay.com";// prod

// $datmanHost = "https://b.datmanpay.com";// pre prod

// $datmanHost = "https://dr-payments.datmanpay.com";

// $datmanHost = "https://dr.datmanpay.com";// dr encrionment prod

$switchHost = 'https://payments.datmanpay.com/switch/api/v1';
$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<a href='$datmanHost/opto/card.php?data=$encryptNewData' target='_blank'>New encryption</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=" . EncryptNew(json_encode($payload)) . "' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

function payment_encrypt2($string, $key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
    MCRYPT_RIJNDAEL_256,
    md5($key),
    serialize($string),
    MCRYPT_MODE_CBC,
    md5(md5($key))
  )
  )));
}

function EncryptNew($textToEncrypt, $secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}


