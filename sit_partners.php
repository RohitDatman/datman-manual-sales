<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();
// forming business related values
// $merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// $merchant_id = 63155480; // adyen - OMNICART
$merchant_id = 663210808; // adyen - EDININGEXPRESS
// $merchant_id = 663192104; // adyen BP
// $merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663209873 - Edining Adyen
// 663211239 - FASTFOOD
// 663212494 - QuickChow
//663212985 - ask4dish
// 663214243 - gksoft
// 2. QuickChow_split1 - 663212495
// 663212983 - smebizness
// 663214345 - Ask4dish - CS
 
// 3. QuickChow_split2 - 663212454
$business_name = $faker->company;
$provider = "Partners";
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "sundaresan@datman.je"; //$faker->email;
$webhook_url = "https://webhook.site/fc8688cf-9d96-4716-ab15-43bc65955bbf"; //$faker->url;
// $webhook_url = "https://www.google.com";
$redirect_url = "http://localhost:8081/basket/success?orderId=a521f6fe-fd7b-45ea-8dd1-b36b2bfc4007";
$cancel_url = "https://".$host."/cancel";

$payload = array(
  "host" => $host,
  "merchant_id" => $merchant_id,  
  // "order_id" => "87455555",//$faker->numberBetween(500000, 599999),
  "order_id" => $faker->numberBetween(500000000, 9999999999),
  // "customer_id" => "14505148",//$faker->numberBetween(10000000,19999999),//UK Adyen
  "customer_id" =>$faker->numberBetween(10000000,19999999),//US Adyen
  "provider" => $provider,
  "email" => "sundaresan@datman.je",
  "phone_number" => $faker->numerify("07##########"),
  "name" => $business_name,
  "amount" => "15.00",//$faker->randomFloat(2,10,50),
  "avs_house_number" => "",//$faker->buildingNumber,
  "avs_postcode" => "",//$faker->postcode,
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "redirect_url" => "https://foodhub.co.uk/api/payment/success?simple=1&bSuccess&id=1006268852",
  "cancel_url" => $cancel_url,
  "webhook_url" => $webhook_url,
  "back_url" => "https://datman.je",//$cancel_url,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "first_name" => "Datman",//$faker->firstName, //new field
  "last_name" => "Testing",//$faker->lastName, //new field
  "flat" => "",//(string) $faker->randomNumber(2), //new field
  "address1" => "",//$faker->city, //new field
  "address2" => "",//$faker->streetName, //new field,
  // "txnType"               => "WALLET_RECHARGE_AGAINST_ORDER",
  // "txnType"               => "CREATE_MIT_TOKEN",
  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  "token" => 'mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d', //optional (Applicable for Optomany/EG)
  "last4Digits" => "5005",

// "captureDelayHours" => "1",
//  "authorisation_type" => "PreAuth",
  // "source"    => "mobile-app"
  // mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c - cs token
  // mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea - adyen token

);
$split_fee = [
    [
      "partner_merchant_id" => 663215404,  // sandbox BP - US
      "type_id" => 1,
      "value" => 5.00,
      "value_type" => "amount"
    ],
    // [
    //   // "partner_merchant_id" => 663176007,
    //   "partner_merchant_id" => 663212495,  // sandbox BP - US
    //   "type_id" => 2,
    //   "value" => 1.50,
    //   "value_type" => "amount"
    // ]
];

// $payload['split_fee'] = $split_fee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

// $datmanHost = "https://sandbox-payments-fastfood.datmanpay.com";
// $datmanHost = "https://sandbox-payments-gksoft.datmanpay.com";
$datmanHost = "https://stage-fh-1.datmanpay.com";
// $datmanHost = "https://ws2.datmanpay.com";
// https://ws9-payments-edining.datmanpay.com
// https://sandbox-payments.datmanpay.com
// sandbox-payments-quickchow.datmanpay.com
//sandbox-payments-ask4dish.datmanpay.com
// sandbox-payments-smebizness.datmanpay.com
//9lY7eSvaKcsoZwc2qz47GIf9a9Cm1XtO

// $switchHost = 'https://ws3-payments.datmanpay.com/switch/api/v1';
$switchHost = 'https://ws7-payments.datmanpay.com/switch/api/v1';
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
echo "<a href='$datmanHost/opto/card.php?data=".EncryptNew(json_encode($payload))."' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
//lszOjEGjqUyMjggJUMvzYfELIUnTLWxFlqn
//tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf - Partners Stage key
// noci1oPw7pKavuPWyqoHiB0RDxE62Y6A - quickchow
// dVTEP9mTLerN6nKi5o54QYBGXu58b7NG - Fastfood
// 9lY7eSvaKcsoZwc2qz47GIf9a9Cm1XtO - ask4dish
// HdCl9F84zD8X595j2W3cgJOOs746jXjU - smebizness
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
// function payment_encrypt2($string, $key = 'P6VRBHonS12Wsumz6Kpl4J1IuYXS59nO')
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


// 3ds token - 599486996 - mxtoken_6505c035b30226df3e1b18a0af7808aee8e5ff7c958ee160defe43f0daf8e3e3
// non 3ds token - 565841547 - mxtoken_e1ea0a4b52774ff8789c32893ae594284916ed4b548330b0d90f1b5fac2350c0

// domain -> sandbox-payments-edining.datmanpay.com
// Api key - jKuZ0tDojNa2SnAYO66J7U7Hu8p8pw9A3EZ
// Enc Key -> xejPvqKFb50ZMBIN6dVN4Kzin6iymqlk


// enc key - pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
// Api key - 5V2DtjeraPD2VMIEjA8K85HYM598r1uDcop

// Partners common key