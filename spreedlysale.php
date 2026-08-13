<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values

// $merchant_id = "63169827"; // o2m 
// $merchant_id = "63154549";  //o2m 
$merchant_id = "663209310";
// * 63153688 - cardstream UK
// * 663207711 - cardstream Ireland
// * 63155126 - cardstream-ch us
// * 63155116 - cardstream-ch au
// * 63155245,1234580 - checkout-hf
// * 663207622 - checkout-hf Canada
// * 1234571 - checkout-hf US
// * 63154456 - checkout-hf ireland
// * 663184566 - cardstream-OBNs
// * 63169829 - Adyen-HF
// 63155428 - adyen-hf
// 63182138 - paystack-hf
// 63154766 - optomany
// 63189380 - DNA
// 663176007 - cp e2e
// 1234581,1234574 - o2m
// ! 663192467,663207586 - STRIPE SUPPER
//* 1234572 - Spreedly
//* 663185226 - adyen BP account
// 63181447 - Spreedly

$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = $faker->email;
$webhookUrl = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook"; //$faker->url;
$RedirectUrl = "https://www.google.com";
$CancelUrl = "https://www.datman.je";
$overrideChecks = [
 "forceThreeDSecure" => false,
 "challengeIndicator" => false // Not respecting this as of now - YES/NO value
 ];
$payload = array(
  "host" => $host,
  "merchant_id" => $merchant_id,
  "order_id" => $faker->numberBetween(500000000, 599999999),
  "customer_id" => "63154549",//$faker->numberBetween(10000000,19999999),
  // "customer_id" => $faker->numberBetween(10000000,19999999),
  "provider" => $provider,
  // "source"=> "mobile-app",
  // "email" => $email,
  "email" => "DHARMESH.GANDHAM@DATMAN.JE😴😴😴😴😴",
  "phoneNumber" => $faker->numerify("07##########"),
  "name" => $business_name,
  "Amount" => "15.00",//$faker->randomFloat(2,10,50),
  "AvsHouseNumber" => "7😴😴😴😴",//$faker->buildingNumber,
  "AvsPostcode" => "M63X 7TH",//$faker->postcode,
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "RedirectUrl" => $RedirectUrl,
  "CancelUrl" => $CancelUrl,
  "overrideChecks" => $overrideChecks,
  // "cancel_url": null,
  "WebhookUrl" => $webhookUrl,
  "backurl" => $CancelUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  // "firstname" => "Dharmesh", //new field
  "firstname" => "Dharmesh@#!@%@^#^😴😴😴😴😴", //new field
  // "lastname" => $faker->lastName, //new field
  "lastname" => "Gandham😴😴😴😴", //new field
  "flat" => (string) $faker->randomNumber(2), //new field
  "address1" => $faker->city, //new field
  // "address1" => "😂❤️☺️😊😭😩💕''e",
  "address2" => $faker->streetName, //new field,
  // "address2" => "Test😂❤️☺️😊😭😩💕(''e",
  "txnType"  => "WALLET_RECHARGE_AGAINST_ORDER",
  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  // "token" => 'mxtoken_3qyZiWAEvaSZuaCiwyN36Z-NsCM1Zsur', //optional (Applicable for Optomany/EG)
  "last4Digits" => "1111"

);

$SplitFee = [
  // [
  //   "partner_merchant_id" => 1235000,
  //   "type_id" => 2,
  //   "value" => 2.00,
  //   "value_type" => "amount"
  // ],
  [
    "partner_merchant_id" => 663208350,
    "type_id" => 1,
    "value" => 3.00,
    "value_type" => "amount"
  ],
  [
    "partner_merchant_id" => 663208470,
    "type_id" => 3,
    "value" => 2.00,
    "value_type" => "amount"
  ]
  // [
  //   "partner_merchant_id" => 1234580,
  //   "type_id" => 7,
  //   "value" => 3.00,
  //   "value_type" => "amount"
  // ]


];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);
$encryptNewData = EncryptNew(json_encode($payload));

$datmanHost = "https://ws10-payments.datmanpay.com";
// $datmanHost =  "https://ws8.datmanpay.com";
// $datmanHost = "https://stage-fh-1.datmanpay.com";
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

function payment_encrypt2($string, $key = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF')
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

function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
{
  $iv = substr($secret, 0, 16);
  $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
  $base64EncryptedMessage = base64_encode($encryptedMessage);
  return $base64EncryptedMessage;
}

// function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
// {
//   $iv = substr($secret, 0, 16);
//   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
//   $base64EncryptedMessage = base64_encode($encryptedMessage);
//   return $base64EncryptedMessage;
// }
