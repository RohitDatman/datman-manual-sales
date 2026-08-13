<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();
// forming business related values
// $merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// $merchant_id = 1235030; // checkout.com
// $merchant_id = 63191145; // cardstream-ch usa - 0 commission FH (GC)
$merchant_id = 663209575; // Adyen UK
// $merchant_id = 663226538; // Adyen US 
// $merchant_id = 63181447; //cs
// $merchant_id = "663195606"; // checkout
// $merchant_id =  "63181447";

$provider = "FH";
$business_name = $faker->company; 
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "rohit@datman.je"; //$faker->email;
$webhookUrl = "https://www.google.com";
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    "customer_id"           => $faker->numberBetween(10000000,19999999),


    "customer_id"           =>  

    // "80491072", //Adyen us
    // "80491037", // CS

    "80491039", // Adyen UK



    "provider"              => $provider, 
    "email"                 => $email,
    // "phoneNumber"           => $faker->numerify("07##########"),
    // "name"                  => $business_name,
    "Amount"                => "0.50",//$faker->randomFloat(2,10,50),
    // "Amount"                => 20.00,
    // "AvsHouseNumber"        => $faker->buildingNumber,
    // "AvsHouseNumber"        => '347',
    // "AvsPostcode"           => $faker->postcode,
    // "AvsPostcode"           => 'NN17 8YG',
    // "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    // "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName,
    "lastname"              => $faker->lastName,
    // "flat"                  => (string) $faker->randomNumber(2),
    // "address1"              => $faker->city,
    // "address2"              => $faker->streetName,
    // "txnType"               => "WALLET_RECHARGE_AGAINST_ORDER",
    // "source"                => "mobile-app",
    "backurl"               => "https://sit-web30-uk.fhcdn.dev/order-now",
    // "TokenAvs" => "",

    // "token" => "mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473" ,
    "last4Digits" => '6935'
);

$SplitFee = [
    [
      "partner_merchant_id" => 63169829,
      "type_id" => 1,
      "value" => 2.00,
      "value_type" => "amount"
    ]
    // [
    //   "partner_merchant_id" => 63154766,
    //   "type_id" => 4,
    //   "value" => 1.00,
    //   "value_type" => "amount"
    // ]
];

//  $payload['SplitFee'] = $SplitFee;

// Changes for Gift Card
$payload['txnType'] = "GIFT_CARD";
$payload['gcReference'] = "fa78624a-76ae-4999-ab93-45e066f444aa";
//30u-3821312132-48c3-b9e9-547878787723we4
$payload['order_id'] = $payload['gcReference'];

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

 $datmanHost = "https://datmanpay.com";
// $datmanHost = "https://b.datmanpay.com";// pre prod
// $datmanHost = "https://stage-fh-1.datmanpay.com";  // --> SIT for storing data in stage gateway DB

// $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
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
function payment_encrypt2($string, $key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk')
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

function EncryptNew($textToEncrypt, $secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

?>
