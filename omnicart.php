<?php
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();
// forming business related values
$merchant_id = 63155480;
// 63155480; // adyen - OMNICART
$provider = "FH";
// $provider = "OC";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = $faker->email;
$webhook_url = "https://webhook.site/bb1c76d4-ad02-4a46-88bd-7b9173c35ba1";
// $webhook_url = "https://www.google.com";
$redirect_url = "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe";
$cancel_url = "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    // "order_id"              => '3i5-8y876787-cghijiyt-u-ety2790',
    "customer_id"           => 
    // '1341785',
    $faker->numberBetween(10000000,19999999),
    // "customer_id"           => 8711631456, // adyen
    "provider"              => $provider, 
    "email"                 => $email,
    "phone_number"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    // "amount"                => $faker->randomFloat(2,10,50),
    "amount"                => 20.00,
    // "avs_house_number"        => $faker->buildingNumber,
    "avs_house_number"        => '347',
    // "avs_postcode"           => $faker->postcode,
    // "avs_postcode"           => 'NN17 8YG',
    "avs_postcode"           => '92837',
    "merchant_reference"     => $faker->numerify("MerchantReference##########"),
    "redirect_url"           => $redirect_url,
    "cancel_url"             => $cancel_url,
    "cash_payment_url"        => $redirect_url,
    "webhook_url"            => $webhook_url,
    // "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "first_name"             => $faker->firstName,
    "last_name"              => $faker->lastName,
    "flat"                  => (string) $faker->randomNumber(2),
    "address1"              => $faker->city,
    "address2"              => $faker->streetName,
    // "txn_type"            => "WALLET_RECHARGE_AGAINST_ORDER",
    // "source"             => "mobile-app",
    "back_url"               => "https://sit-web30-uk.fhcdn.dev/order-now",
    "DbTotal"               => false,
    "token_avs" => "",
    // "token" => "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen
    // "last4_digits" => "4444", // spreedly
    // "last4_digits" => "4242", // checkout/supper
    // "last4_digits" => "0335", // adyen/dna
    // "last4_digits" => "1111",
    // "last4_digits" => "0004",
);

$split_fee = [
    [
      "partner_merchant_id" => 663208111,  // sandbox BP - US
      "type_id" => 2,
      "value" => 5.00,
      "value_type" => "amount"
    ],
    [
      "partner_merchant_id" => 663208389,  // sandbox BP - US
      "type_id" => 7,
      "value" => 4.00,
      "value_type" => "amount"
    ]
];

$payload['split_fee'] = $split_fee;

// Changes for Gift Card
// $payload['txn_type'] = "GIFT_CARD";
// $payload['gc_reference'] = "3555f1ab-6e0d-48c3-b9e9-439849b9a03";
// $payload['order_id'] = $payload['gc_reference'];

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

$datmanHost = "https://ws2-payments.datmanpay.com";

// $switchHost = 'https://ws2-payments.datmanpay.com/switch/api/v1';
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


//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'SKk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
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

function EncryptNew($textToEncrypt, $secret = 'SKk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
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
  320039674 website3.bigfoodie1.co.uk 63355140  15.00
  294493536 qaweb1.t2scdn.com 63355140  5.76
  294493537 qaweb1.t2scdn.com 63355140  3.60
  294493570 qaweb1.t2scdn.com 63355140  8.28

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
?>
