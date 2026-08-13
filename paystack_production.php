<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
$merchant_id = 663190049; //63155140 - uk //1234568 - aud //663176349 - us //63162502 //63169827 - adyen-hf
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://webhook.site/1d7e9c2a-2e63-41f2-82cb-87ae6f695baa"; //$faker->url;
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";
$CashPaymentUrl = "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiio7TVir30AhWQwzgGHTCADqYQ_AUoAnoECAEQBA&biw=1226&bih=689&dpr=2";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    "customer_id"           => "87130921",//$faker->numberBetween(10000000,19999999),
    "provider"              => $provider, 
    "email"                 => "rohit@datman.je",//$email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => "51.01",//$faker->randomFloat(2,10,49),
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => "ST57TF",//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => "flat",//$faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    "CashPaymentUrl"        => $CashPaymentUrl,

    // "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST67EY";}}', //optional (Applicable for Optomany only)
    // "token" => 'mxtoken_e6d619ecdda88d4541ff21f601b6e967', //optional (Applicable for Optomany/EG)
    // "last4Digits" => "0985"
);
// $SplitFee = [ 
//   [
//     "partner_merchant_id" => 663197152, 
//     "type_id" => 2,
//     "value" => 2,
//     "value_type" => "percentage"
//   ],
//   [
//     "partner_merchant_id" => 663197152,
//     "type_id" => 1,
//     "value" => 0.50,
//     "value_type" => "amount"
//   ]

// ];
// $payload['SplitFee'] = $SplitFee;
echo "<pre>";
print_r($payload);
echo "</pre>";
$encryptedData = payment_encrypt2($payload);
//https://legecy-release-2.datmanpay.com
//$datmanHost = "http://legecy-release.datmanpay.com";
// $datmanHost = "https://test-payments-api.foodhub.com";
//$datmanHost = "https://legacy-qa-1.datmanpay.com";
// $datmanHost = "https://legacy-pre-prod.datmanpay.com";
//$datmanHost = "https://release.gateway.datmanpay.com";
//$datmanHost = "https://legacy-qa-2.datmanpay.com";
// $datmanHost = "http://datmanpay.com";
// $datmanHost = "https://Legac-Legac-DK6HVU9PPYH8-1600187464.eu-west-1.elb.amazonaws.com";
$datmanHost = "https://gateway.foodhub.com"; //paystack
//$datmanHost = "https://pre-prod.gateway.datmanpay.com";
//$datmanHost = "https://legacy-pre-prod.datmanpay.com";
//$switchHost = "https://payments.datmanpay.com/switch/api/v1/phone-payment";

//$switchHost = 'https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/dev/api/v1';
  $switchHost = 'https://test-payments.datmanpay.com/switch/api/v1';
  //$switchHost = "https://payments.datmanpay.com/switch/api/v1";
//$switchHost = "	https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/t2srelease/api/v1"; //sandbox
//  $switchHost = "https://ikt9v6id79.execute-api.eu-west-1.amazonaws.com/pre-prod/api/v1" ; //pre-prod

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
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target=''>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
//echo "<a href='$switchHost/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload));
//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj     A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH   //switch : wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h //p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF
function payment_encrypt2($string, $key = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}
//p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF
//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj //sandbox
//A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH //prod
function EncryptNew($textToEncrypt, $secret = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH', $encryptionMethod = "AES-256-CBC")
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


Billing address order id: 294502459

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