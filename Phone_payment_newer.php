<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

$merchant_id = 663210061;
// 663209723; //63155140 - uk //1234568 - aud //663176349 - us //63162502 //63169827 - adyen-hf
$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net"; //$faker->url;
$RedirectUrl = "https://" . $host . "/success";
$CancelUrl = "https://" . $host . "/cancel";
$CashPaymentUrl = "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiio7TVir30AhWQwzgGHTCADqYQ_AUoAnoECAEQBA&biw=1226&bih=689&dpr=2";

$payload = array(
  "host" => $host,
  "merchant_id" => $merchant_id,
  "order_id" => $faker->numberBetween(500000000, 599999999),
  "customer_id" => $faker->numberBetween(10000000, 19999999),

  // "customer_id" => "663208572",
  "provider" => $provider,
  "email" => "dharmesh.gandham@datman.je",
  "phoneNumber" => $faker->numerify("07##########"),
  "name" => $business_name,
  "Amount" => "30.00",//$faker->randomFloat(2, 10, 49),
  "AvsHouseNumber" =>$faker->buildingNumber,
  "AvsPostcode" => "NN178YG  NN1234  54",
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "RedirectUrl" => $RedirectUrl,
  "CancelUrl" => $CancelUrl,
  "WebhookUrl" => $webhookUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname" => "Anant",
  // $faker->firstName,
  //new field
  "lastname" => "Singh",
  // $faker->lastName,
  //new field
  "flat" =>"10",
  "address1" => "Flat 6",
  //$faker->city, //new field
  "address2" => $faker->streetName, //new field
  "CashPaymentUrl" => $CashPaymentUrl,
  // "txnType" => "CREATE_MIT_TOKEN"

  //  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  //   "token" => 'mxtoken_2e451c74f065cdea7e01fa80c69c2540', //optional (Applicable for Optomany/EG)
  //   "last4Digits" => "2690"
);


$SplitFee = [
  (object) [
    "partner_merchant_id" => 1234567,
    "type_id" => 1,
    "value" => 6.0,
    "value_type" => "amount"
  ],
  (object) [
    "partner_merchant_id" => 1234580,
    "type_id" => 7,
    "value" => 5.0,
    "value_type" => "amount"
  ]

];
// $payload['SplitFee'] = $SplitFee;


echo "<pre>";
print_r($payload);
echo "</pre>";
$encryptedData = payment_encrypt2($payload);

// $switchHost = 'https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/dev/api/v1';
// $switchHost = 'https://xigzn8bjt3.execute-api.eu-west-1.amazonaws.com/dev/api/v1';
// $switchHost = "https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/sandbox/api/v1";
// $switchHost = "https://q401eb08zj.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1";
$switchHost = "https://ws8-payments.datmanpay.com/switch/api/v1";
// $switchHost = "https://uzvrznj3v9.execute-api.eu-west-2.amazonaws.com/ws4/api/v1";
// $switchHost = "https://cf3e5he4x1.execute-api.eu-west-1.amazonaws.com/stage/api/v1";
//$switchHost = "	https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/dev/api/v1"; //sandbox
//  $switchHost = "https://ikt9v6id79.execute-api.eu-west-1.amazonaws.com/pre-prod/api/v1" ; //pre-prod

$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=" . EncryptNew(json_encode($payload)) . "' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
//echo "<a href='$switchHost/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>$switchHost/phone-payment/?data=" . EncryptNew(json_encode($payload));
//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj     A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH   //switch : wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h //p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
{
  return urlencode((
    base64_encode(
      @mcrypt_encrypt(
        MCRYPT_RIJNDAEL_256,
        md5($key),
        serialize($string),
        MCRYPT_MODE_CBC,
        md5(md5($key))
      )
    )
  ));
}
//p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF
//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj //sandbox
//A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH //prod
function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
{
  $iv = substr($secret, 0, 16);
  $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
  $base64EncryptedMessage = base64_encode($encryptedMessage);
  return $base64EncryptedMessage;
}