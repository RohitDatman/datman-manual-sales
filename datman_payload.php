<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
$merchant_id = 663190053; // 63155140, 63169827, 1234580;
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://webhook.site/73d00cff-01fe-49cb-ab70-54ca264406f7"; //$faker->url;
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    // "customer_id"           => $faker->numberBetween(10000000,19999999),
    "customer_id"           => 984943042,
    "provider"              => $provider, 
    // "email"                 => $email,
    "email"                 => "dharmesh@omni-pay.com",
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    // "Amount"                => $faker->randomFloat(2,10,50),
    "Amount"                => 1.01,
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => $faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    // "CancelUrl"             => $CancelUrl,
    "CancelUrl"             => "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe",
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    // "TokenAvs" => "",
    // "token" => "mxtoken_462e5cf60dbed6fd698e69d8fc1860c3",
    // // "token" => "",
    // // "token" => "",
    // "last4Digits" => "0821",
    "SplitFee" => [ 
      // (object)[
      //   "partner_merchant_id" => 63174796,  //63183378
      //   "type_id" => 1,
      //   "value" => 1.00,
      //   "value_type" => "amount"
      // ],
      // (object)[
      //   "partner_merchant_id" => 63174796,  //63183378
      //   "type_id" => 3,
      //   "value" => 1.00,
      //   "value_type" => "amount"
      // ]
    ]
    
);
echo "<pre>";
print_r($payload);
echo "</pre>";
$encryptedData = payment_encrypt2($payload);

// $datmanHost = "http://legacy-qa-5.datmanpay.com";
// $datmanHost = "http://legacy-qa-3.datmanpay.com";
// $datmanHost = "http://datmanpay.com";
$datmanHost = "https://legacy-qa-1.datmanpay.com";
// $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<a href='$datmanHost/barclays/phonePayment.php?data=$encryptedData' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Available in production</i>";
echo "<br>";
echo "<br>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/barclays/onlinePaymentV2.php?data=$encryptedData' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Available in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/barclays-irl/onlinePaymentV4.php?data=$encryptedData' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Available in production</i>";
echo "<br>";
echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
//Prod key - $secret = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH',
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


/*
Merchant Id will be automatically retreived from T2S Database based on the host used
hostname qa3.t2scdn.com points to MID => 63159841

T2S ORDER IDS (staging)
  320039674	website3.bigfoodie1.co.uk	63355140	15.00
  294493536	qaweb1.t2scdn.com	63355140	5.76
  294493537	qaweb1.t2scdn.com	63355140	3.60
  294493570	qaweb1.t2scdn.com	63355140	8.28

DATMAN MERCHANT IDS (staging)
  BARCLAYS => 63355140

Customer IDS (staging)
  nitish@datman.je    => 31837
  muzammil@datman.je  => 27202

BARCLAYS Test card
card no: 4917 6100 0000 0000
exp date: 03/2030
cvv: 737


BARCLAYS MMS (sandbox)
https://ca-test.barclaycardsmartpay.com/ca/ca/login.shtml

SQL QUERIES
   update card_payment set payment_status = 'FAILED' where order_id = 294482156;
   select * from card_payment where order_id = 294482156 order by id desc limit 10;
*/