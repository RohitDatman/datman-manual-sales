<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
// $merchant_id=663184566; //CS-OBN2
// $merchant_id= 663191524; //CS-OBN
// $merchant_id=663192242; //CS-CH
$merchant_id= 
// 663192363;
 

// 112233445;

// 1234580;

// 1234669;

// 63155480;


// adyen usa mid
// 663208350;

// adyen aus mid
// 663208906;


// adyen uk mid
// 663208389;


// adyen usa o2m mid
// 663208386;

// 63155480;

// 1234572;


1235000;

// 663208389;

// 663207634;


// 1235000;

// 63155245;



// 1235030; //CS-CH-US
// $merchant_id = 63155116; //CS_CH-AUS
// $merchant_id=1235000; //CS
// $merchant_id  = "663191524";//OBN
// $merchant_id= 1234669; //cs-ch usa
// $merchant_id = 1234568;// cs-ch o2m usa;
// $merchant_id= 1234572 ; //spreedly
// $merchant_id= 663208090 ; // spreedly o2m
// $merchant_id=63182138; //paystack
// $merchant_id=63169829 ;//adyen-hf
// $merchant_id=63154671 ;//stripe
// $merchant_id=663207586 ;//- stripe-supper
// $merchant_id=63155140 ;//- stripe
// $merchant_id=663192887;
// $merchant_id=663207590;
// $merchant_id=63182138 ;//paystack

// $merchant_id=1235010; // non-cs merchant from ireland
$provider = "FH";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$webhookUrl = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook"; //$faker->url;
$RedirectUrl = "https://" . $host . "/success";
$CancelUrl = "https://" . $host . "/cancel";

$payload = array(
  "host" => $host,
  "merchant_id" => $merchant_id,
  // "order_id"=>"14494880",
  "order_id" => $faker->numberBetween(500000000, 599999999),
  "customer_id" => 
  // '618921666',
  // '13976621',
  // '7972373',

  // adyen master token cid

"65767696",

// "",

  // 'OC1341785',
  // $faker->numberBetween(10000000, 19999999),
  // "customer_id" => "14494880",//cs-ch amex 
  // "customer_id" => "13551048",//spreedly
  // "customer_id" => " 10230295",
  "provider" => $provider,
  "email" => "qatesting@gmail.com",
  "phoneNumber" => $faker->numerify("07##########"),
  "name" => $business_name,
  "Amount"                => 
  // "40.00",
   $faker->randomFloat(2, 10, 50),
  "AvsHouseNumber" => $faker->buildingNumber,
  // "Amount" => "40.00",
  // "AvsPostcode"           => $faker->postcode,
  // "AvsPostcode" => 'NN17 8YG',
  "AvsPostcode" => $faker->postcode,// For USA ZIP code;
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "RedirectUrl" => "https://www.google.com/",
  "CancelUrl" =>  "https://www.example.com/",
  "WebhookUrl" => $webhookUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname" => $faker->firstName, //new field
  "lastname" => $faker->lastName, //new field
  "flat" => (string) $faker->randomNumber(2), //new field
  "address1" => $faker->city, //new field
  "address2" => $faker->streetName, //new field
  "backurl" => 'https://www.example.com/backurl',
  // "source"                => 'mobile-app', //hide GooglePay/ApplePay

  // "TokenAvs" => "",

  // adyen token
  // "token" => "mxtoken_4b2614f40f646ce4f894b852b104916878d0cc423bb043e00bc31b9f0509e4d1", //spreedly token for customer id 13551048;
  // // "last4Digits" => "5100", // spreedly last4 digits
  // "token" => "mxtoken_jMIiTJz_WQ_LAQRLS5BeujTHsa8P94jl", //cs-ch token for customer id 14494880;
  // "last4Digits" => "0821", // amex last4 digits

  // adyen master token

// "token" => "mxtoken_8141935d174a736d963fb6c10564871488cf951de8598c4febdbb9580873847e", //cs uk 
// "last4Digits" => "1111",
  // // "DbTotal"=> "true"

  // "txnType"=>"WALLET_RECHARGE_AGAINST_ORDER"
  
);


// risk: {
//   "device_session_id": "dsidtcwec2uftlqebh4c2rrci5ah2a",
//   "k_device_session_id": "fT2esbft2iRTpJw9UblWlC0ZUH-IPYn9",
// };


$SplitFee = [
  [
    "partner_merchant_id" => 663208111,
    "type_id" => 3,
    "value" => 3.00,
    "value_type" => "amount"
  ],
  [
    "partner_merchant_id" => 663192253, 
    "type_id" => 2,
    "value" => 5.00,
    "value_type" => "amount"
  ]
];
$payload['SplitFee'] = $SplitFee;




echo "<pre>";
print_r($payload);
echo "</pre>";

// $encryptedData = payment_encrypt2($payload);

$encryptedoldData = payment_encrypt2($payload);

$encryptedData = EncryptNew(json_encode($payload));

// $datmanHost = "http://legacy-qa-5.datmanpay.com";
// $datmanHost = "http://legecy-release.datmanpay.com";
// $datmanHost = "https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5";
// $datmanHost = "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// $datmanHost = "https://sxmpqv8qr7.execute-api.eu-west-2.amazonaws.com/ws7";
$datmanHost =  "https://ws1-payments.datmanpay.com";

// $datmanHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6";


// $datmanHost = "http://localhost:3000";
// $datmanHost = "http://legacy-qa-4.datmanpay.com";
// $datmanHost = "http://legacy-qa-3.datmanpay.com";
// $datmanHost = "https://legacy-qa-3.datmanpay.com";
// $datmanHost='http://localhost:4010/dev';
// $phpHost='http://localhost';
$phpHost = "https://ws1-payments.datmanpay.com";
// $phpHost = "https://stage-fh-1.datmanpay.com";


$switchHost = 'https://payments.datmanpay.com/switch/api/v1';
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

echo "<a href='$phpHost/opto/card.php?data=$encryptedoldData' target='_blank'>old_encryption</a> ";

echo "<br>";
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>new_encryption</a> ";

echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=" . EncryptNew(json_encode($payload)) . "' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
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

function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
{
  $iv = substr($secret, 0, 16);
  $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
  $base64EncryptedMessage = base64_encode($encryptedMessage);
  return $base64EncryptedMessage;
}








?>