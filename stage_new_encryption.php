<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
//  $merchant_id= 1234572; //663208390
// $merchant_id=663184566; //CS-OBN2
// $merchant_id= 663191524; //CS-OBN
// $merchant_id=663192242; //CS-CH
  // $merchant_id= 1234700; //CS-CH-US
// $merchant_id=663192401; //CS_CH-AUS
//  $merchant_id=1235000; //CS irealand - 1235010
// $merchant_id=1234580; //checkout
//  $merchant_id= 1235000 ; //spreedly
// $merchant_id=63182138; //paystack
//  $merchant_id=1235000 ;//adyen-hf
//  $merchant_id=63154671 ;//stripe
//  $merchant_id=663207586 ;//- stripe-supper
// $merchant_id=63155140 ;//- stripe
// $merchant_id=663192887;
// $merchant_id=663207590;
// $merchant_id=63182138 ;//paystack
  $merchant_id= 663208470;  //adyen - uk

  // $merchant_id= 663208350;//adyen- usa

  // $merchant_id= 663208906; // adyen aus
// adyen - aus = 663208906
// adyen - USA = 663208350

// $merchant_id=1235010; // non-cs merchnat from ireland
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://webhook.site/6168c3b1-2e00-4a36-8a9e-1683513f268a"; //$faker->url;
$RedirectUrl = "https://".$host."/success";
// $CancelUrl = "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe";
//"https://".$host."/cancel";
$CancelUrl = "https://".$host."/cancel";

$payload = array(
  "host"                  => $host,
  "merchant_id"           => $merchant_id,
  // "order_id"=>"591368638",
  "order_id"              => $faker->numberBetween(500000000, 599999999),
// "customer_id"           => $faker->numberBetween(10000000, 19999999), // 70470668 -- 13213783
"customer_id"           => 12230388, //adyen uk
// "customer_id"           => 10958273, //adyen aus
// "customer_id"           => 10958273, //adyen usa

  "provider"              => $provider,
  "email"                 => "rohit@datman.je",
  "phoneNumber"           => $faker->numerify("07##########"),
  "name"                  => $business_name,
  // "Amount"                =>  $faker->randomFloat(2, 10, 50),
  "AvsHouseNumber"        => "1770575",$faker->buildingNumber,
  "Amount"                => "20.00",
  "AvsHouseNumber"        => 'Flat',
  // "AvsPostcode"           => $faker->postcode,
  "AvsPostcode"           => 'NN17 8YG',
  "MerchantReference"     => $faker->numerify("MerchantReference##########"),
  "RedirectUrl"           => $RedirectUrl,
  "CancelUrl"             => $CancelUrl,
  "WebhookUrl"            => $webhookUrl,
  "txnType"               => "WALLET_RECHARGE_AGAINST_ORDER",
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname"             => "rohit",$faker->firstName, //new field
  "lastname"              => "testing",$faker->lastName, //new field
  "flat"                  => (string) $faker->randomNumber(2), //new field
  "address1"              => $faker->city, //new field
  "address1"              => '6', //new field
  "address2"              => "Flat 6 Primrose Rise 347 Lavender Road Northampton",$faker->streetName, //new field
  // "backurl"               => 'https:\/\/sit-web30-uk.fhcdn.dev\/order-now',
  // "source"                => 'mobile-app', //hide GooglePay/ApplePay
  "backurl" => "https://www.google.com/",
 "CashPaymentUrl" => "https://www.google.com/", $CashPaymentUrl,

  // // // "TokenAvs" => "",
  // "token" => "mxtoken_5e12fffa2e08d8ca7022aedb0f05a2e457a5e27937e7b6361dd01fa7d4aedcf2", // cardstream
  // "last4Digits" => "0821",


  //UK  : mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395
  // AUS : 18711609 -- mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395
// usa : 12135346

//  cardstream  - "mxtoken_8021872ec2627a24ab1d8cc953579e4c06b6ac7dacca215923d755fd11fe81b3"
//   // "DbTotal"=> "true"

// cs : mxtoken_08ba2e2b1c9aaafb00f7615fe4f50ef55430c043b1046fa2cdd0af2025c21c7a - 12640104 - wallet-id
// checkout : mxtoken_8f59b5b9f06a579364c9c9cbf09354c0fde83d31f7b8f78bcba01196c887c2ba -  17025356

);

$SplitFee = [ 
    [
      "partner_merchant_id" => 663208546, 
      "type_id" => 3,
      "value" => 0.50,
      "value_type" => "amount"
    ]
    // [
    //   "partner_merchant_id" => 1235000, 
    //   "type_id" => 4,
    //   "value" => 0.50,
    //   "value_type" => "amount"
    // ],
    // [
    //   "partner_merchant_id" => 1234580, 
    //   "type_id" => 1,
    //   "value" => 2.00,
    //   "value_type" => "amount"
    // ],
    // [
    //   "partner_merchant_id" => 1234580, 
    //   "type_id" => 2,
    //   "value" => 2.00,
    //   "value_type" => "amount"
    // ],
    // [
    //   "partner_merchant_id" => 1234580, 
    //   "type_id" => 5,
    //   "value" => 2.00,
    //   "value_type" => "amount"
    // ],

];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

// $encryptedData = payment_encrypt2($payload);

$encryptedoldData = payment_encrypt2($payload);

$encryptedData = EncryptNew(json_encode($payload));

  // $datmanHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6";
$datmanHost = "https://ws8-payments.datmanpay.com";
//  $datmanHost = "https://stage-fh-1.datmanpay.com";
  //  "https://u0z12zzudh.execute-api.eu-west-2.amazonaws.com/ws9";
  // "https://sxmpqv8qr7.execute-api.eu-west-2.amazonaws.com/ws7";
  //"https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// $datmanHost = "http://legecy-release.datmanpay.com";
// $datmanHost = " https://sxmpqv8qr7.execute-api.eu-west-2.amazonaws.com/ws7";
//  $datmanHost = "https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5";
// "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
  // $datmanHost = "https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5";
//  $datmanHost = "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// $datmanHost = "http://localhost:3000";
// $datmanHost = "http://legacy-qa-4.datmanpay.com";
// $datmanHost = "http://legacy-qa-3.datmanpay.com";
// $datmanHost = "https://legacy-qa-3.datmanpay.com";
// $datmanHost='http://localhost:4010/dev';
// $phpHost='http://localhost';
// $phpHost = "https://ws1.datmanpay.com";
// $phpHost = "https://stage.datmanpay.com";


//  $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
  $switchHost = 'https://ws8-payments.datmanpay.com/pluto/switch/api/v1';
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

echo "<a href='$phpHost/opto/card.php?data=$encryptedoldData' target='_blank'>old PHP </a> ";

echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>PHP MIGRATION </a> ";

echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
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
?>
