<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
//663226638
$merchant_id = "663231912";
// * 63181447  - Cardstream
// * 663207711 - cardstream Ireland
// * 663195603 - cardstream-ch us New UI
// * 663195604 - cardstream-ch au
// * 663195606 - checkout-hf
// * 663209575 - adyen di uk
// * 663206519 - O2M prod Adyen,
// * 663197155 - CS CH UK
// * 111111 - Paysafe
// * 663190047 - CS CH US old UI
// * 663195603 - Spreedly checkout mid
// * 663223832 - edining
// * 663226647 - prod new mid for edining
// * 663227491 - prod fastfood mid Adyen UK
// * 663223832 - quickchow
// 663231532
// 663227724 - Orbititech
// 663231532 - GK soft
// 663230353 - ask4dish [do not use for prod]
// 663231912 - appcompanion
// 663233732 - orbititech
// $provider = "QC";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = $faker->email;
$webhookUrl = "https://webhook.site/f901fe99-ab1f-42ba-a8aa-7d551db64421"; //$faker->url;
$RedirectUrl = "https://www.google.com/";
$CancelUrl = "https://" . $host . "/cancel?simple=1&bSuccess&id=330831810&transaction=66643";

$payload = array(
  "host" => $host,
  "merchant_id" => $merchant_id,  
  "order_id" => $faker->numberBetween(500000, 599999),
  // "customer_id" => "804910973",//$faker->numberBetween(10000000,19999999),//UK Adyen
  // "customer_id" => "80491090",//$faker->numberBetween(10000000,19999999),//US Adyen
  // "customer_id" => "19034037",  // edining cid
  // "customer_id" => "15495028", // fastfood CID
  // "customer_id" => "19426895", // orbittech CID 
  //  "customer_id" => "10594235", // ask4dish CID QC17673831
  //  "customer_id" => "17673831", // quikchow CID
  "customer_id"           => $faker->numberBetween(10000000,19999999),
  "provider" => $provider,
  "email" => "rohit@datman.je",
  "phone_number" => $faker->numerify("07##########"),
  "name" => $business_name,
  "amount" => "5.00",//$faker->randomFloat(2,10,50),
  "avs_house_number" => "7",//$faker->buildingNumber,
  "avs_postcode" => "NN178YG",//$faker->postcode,
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "redirect_url" => $RedirectUrl,
  "cancel_url" => $CancelUrl,
  "webhook_url" => $webhookUrl,
  "back_url" => $CancelUrl,
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "first_name" => $faker->firstName, //new field
  "last_name" => $faker->lastName, //new field
  "flat" => (string) $faker->randomNumber(2), //new field
  "address1" => $faker->city, //new field
  "address2" => $faker->streetName, //new field,
  // "txnType"           => "WALLET_RECHARGE_AGAINST_ORDER",
//   "overrideChecks"=> [
//  "forceThreeDSecure" => "true",
// "challengeIndicator" => "true"
// ],
  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  // "token" => 'mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473', //edining token
  // "last4Digits" => "6935", 



    //   "statement_descriptor" => "Rohit ttttyunwdcoiwdckowihcnjnwbciowcwceohwjecbownbcwce 😭😂 ~!@#$%^&*()?{}()*:;?/\|>                               ",
    // "statement_descriptor_address" => " ✊🏿 Dymanic #@%@%@&@^@&@()() ~!@#$%^&*()?{}()*:;?/\| Discriptor",



// "token" => 'mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473', //fastfood token
//   "last4Digits" => "6935", 
  // "source"    => "mobile-app" 
  // mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c - cs token
  // mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea - adyen token
  // mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473 cs-ch token

//   "metadata" => [
//  description => "testing description"
//   ]

);


$split_fee = [
  [
    "partner_merchant_id" => 663223636,
    "type_id" => 1,
    "value" => 0.20,
    "value_type" => "amount"
  ]
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 2,
  //   "value" => 0.09,
  //   "value_type" => "amount"
  // ]
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 2,
  //   "value" => 0.01,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 3,
  //   "value" => 0.03,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 4,
  //   "value" => 0.05,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 663209575,
  //   "type_id" => 5,
  //   "value" => 0.06,
  //   "value_type" => "amount"
  // ],
];
// $payload['split_fee'] = $split_fee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);
$encryptNewData = EncryptNew(json_encode($payload));

// $datmanHost = "https://ws4.datmanpay.com";

// $datmanHost = "https://payments-edining.datmanpay.com";// edining prod
// $datmanHost = "https://payments-fastfood.datmanpay.com";//  fastfood prod
// $datmanHost = "https://payments-quikchow.datmanpay.com";//  quickchow prod
// $datmanHost = "https://payments-gk-pay.datmanpay.com";//  gkpay prod
// $datmanHost = "https://payments-ask4dish.datmanpay.com";//  gkpay prod
// $datmanHost = "https://payments-orbititech.datmanpay.com"; //
$datmanHost = "https://payments-appcompanion.datmanpay.com"; //
// $datmanHost = "https://datmanpay.com";


// $datmanHost = "https://payments-edining-b.datmanpay.com"; // pre-prod edining
//  $datmanHost = "https://payments-fastfood-b.datmanpay.com"; // pre-prod fastfood
// $datmanHost = "https://payments-appcompanion-b.datmanpay.com";// prod
// $datmanHost = "https://payments-quikchow.datmanpay.com"; //  quikchow pre prod

// $datmanHost = "https://b.datmanpay.com";// preprod

$switchHost = 'https://payments.datmanpay.com/switch/api/v1';
$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

//Is1FlCFiRR3simumDWdotklr9Eg2Sk
//V1FlCFiRR3silQbDWdotklr9Eg23L1
echo "<a href='$datmanHost/opto/card.php?data=$encryptNewData' target='_blank'>New encryption</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=" . EncryptNew(json_encode($payload)) . "' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";


// V1FlCFiRR3silQbDWdotklr9Eg23L1  pre prod edining
// 4z5cdtCnPUm0nLxFECOg84Oo0T4aOJ  pre prod fastfood
// OL8tSk888oBxTj2Pa6Hbk2H3pIDU3l prod key for fastfood
// nAi1GujLvxh23hqkUw4NMmud51OhT1 - quikchow
// 3MHXLUlQ1FkwR1MKqpKnNkRJH6Z373 - gkpay
// ia76TjkIQ5NNErDocYI895iG0Dqwli - ask4dish
// 3GwU9myRBMO2avZq9ysxhNS3tTtSvo - ORBITITECH
// cDugfbBrvFW4X2Dvpxa5hJoot82d8j - appcomapnion
// Is1FlCFiRR3simumDWdotklr9Eg2Sk - FH

function payment_encrypt2($string, $key = 'cDugfbBrvFW4X2Dvpxa5hJoot82d8j')
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

function EncryptNew($textToEncrypt, $secret = 'cDugfbBrvFW4X2Dvpxa5hJoot82d8j', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}