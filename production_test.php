<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
//$merchant_id = 11111111; //63155140;//63155140  /1234568
//$merchant_id = 63189382;
$provider = "FH"; 
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "cbb361f7-b6be-44f4-8190-7f9b7332e606@email.webhook.site"; //$faker->email;
// $webhookUrl = $faker->url;//"https://9b25d4d122dbf021b9b247f6e0d94ed0"
$webhookUrl = "https://webhook.site/ae531780-f338-4d3d-bef0-66699ecf931e";
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";
$CashPaymentUrl = "https://".$host."/paybycash";


$payload = array(
    "host"                  => $host,
    "merchant_id"           =>  663195606,//,AUD//663195604, US: 663195603 //uk: 663168198, nuvei: 663180081
    "order_id"              =>  $faker->numberBetween(5000000,5999999),
    // "order_id"              =>  595159122,
    "customer_id"           =>  80491037,//$faker->numberBetween(10000000,19999999),//nitish: 74334715  80491037
    "provider"              => $provider,
    "email"                 => "rohit@datman.je",
    "phoneNumber"           => "984940429",
    "name"                  => $business_name,
    "Amount"                => "0.52",//$faker->randomFloat(2,10,99),
    "AvsHouseNumber"        => '6',//$faker->buildingNumber,
    "AvsPostcode"           => 'ST5 7TF',//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => "https://www.google.com/",
    "CancelUrl"             => $CancelUrl,
    // "CancelUrl"             => "http://chart.apis.google.com/chart?chs=500x500&chma=0,0,100,100&cht=p&chco=FF0000%2CFFFF00%7CFF8000%2C00FF00%7C00FF00%2C0000FF&chd=t%3A122%2C42%2C17%2C10%2C8%2C7%2C7%2C7%2C7%2C6%2C6%2C6%2C6%2C5%2C5&chl=122%7C42%7C17%7C10%7C8%7C7%7C7%7C7%7C7%7C6%7C6%7C6%7C6%7C5%7C5&chdl=android%7Cjava%7Cstack-trace%7Cbroadcastreceiver%7Candroid-ndk%7Cuser-agent%7Candroid-webview%7Cwebview%7Cbackground%7Cmultithreading%7Candroid-source%7Csms%7Cadb%7Csollections%7Cactivity|Chart",
    // "WebhookUrl"            => $webhookUrl,
    "WebhookUrl"            => "https://webhook.site/c27ff9b2-589e-4fbc-8932-e70ee0dc956d",
    // "BackUrl" => "https://sit-web30-uk.fhcdn.dev/order-now",
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => 'anil', //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    "CashPaymentUrl"        => $CashPaymentUrl,
    "DbTotal" => false,  //mxtoken_8f94fc8e10842571bfac21c2f0b8c394
    // "TokenAvs" => 'a:1:{i:0;a:2:{s:14:\"AvsHouseNumber\";s:1:\"6\";s:11:\"AvsPostcode\";s:6:\"ST67EY\";}}', //optional (Applicable for Optomany only)
    "token" => 'mxtoken_9739026abccd03a45fbc71c295640e45', //optional (Applicable for Optomany/EG)  mxtoken_96706890e2d1b315759834165b8926da
    "last4Digits" => "0968"
);

$SplitFee = [ 

  //   [
  //     "partner_merchant_id" => 663191840,
  //     "type_id" => 2,
  //     "value" => 1.01,
  //     "value_type" => "amount"
  //   ],
  
    // [
    //   "partner_merchant_id" => 663195606,
    //   "type_id" => 3,
    //   "value" => 0.01,
    //   "value_type" => "amount"
    // ],
  
    [
      "partner_merchant_id" => 663195606,
      "type_id" => 5,
      "value" => 0.01,
      "value_type" => "amount"
    ]
  
  ];
  $payload['SplitFee'] = $SplitFee;
  echo "<pre>";
  print_r($payload);
  echo "</pre>";

var_dump($payload);
$encryptedData = payment_encrypt2($payload);
$datmanHost = "https://datmanpay.com";
// $datmanHost = "https://b.datmanpay.com";
// $datmanHost = "https://legacy-pre-prod.datmanpay.com";
// $datmanHost = "https://legacy-pre-prod.datmanpay.com";
// $datmanHost = "https://b.datmanpay.com"; 
// $datmanHost = 'https://stage-3.datmanpay.com';
//$datmanHost = "https://legacy-pre-prod-2.datmanpay.com";


//$switchHost = "https://y01c7t4ne8.execute-api.eu-central-1.amazonaws.com/cp_e2e/api/v1";
//  $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
$switchHost = 'https://test-payments.datmanpay.com/switch/api/v1';
//$switchHost = 'https://t3d862fccf.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1';
//$switchHost = 'https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1';
  

$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<a href='$datmanHost/barclays/phonePayment.php?data=$encryptedData' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Avaialble in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/barclays/localPhonepPaymentsWin.php?data=$encryptedData' target='_blank'>Uranus - Phone payment Win(GBP)</a> - <i style='color:green'>Avaialble in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/barclays/onlinePaymentV2.php?data=$encryptedData' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Avaialble in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/barclays-irl/onlinePaymentV4.php?data=$encryptedData' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Avaialble in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Avaialble in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj          prod key:  A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH  ...  phonePay:   wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h
function payment_encrypt2($string, $key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),                           
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', $encryptionMethod = "AES-256-CBC"){
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

function DecryptNew($str, $secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', $encryptionMethod = "AES-256-CBC"){

  $iv                     = substr($secret, 0, 16);
  $base64EncryptedMessage = base64_decode($str);
  $decryptedMessage       = openssl_decrypt($base64EncryptedMessage, $encryptionMethod, $secret, 0, $iv);
  return json_decode($decryptedMessage,true); // converting data into associative array and returning it

}
echo "<br>";
