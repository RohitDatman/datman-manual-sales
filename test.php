<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
$merchant_id = 1235000 ;
//1235020; //63155140; ch_-hf: 1235030  CH:Au /1234568 , 1234580   CH:US :663176349
//$merchant_id = 63189382;
$provider = "FH"; 
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "cbb361f7-b6be-44f4-8190-7f9b7332e606@email.webhook.site"; //$faker->email;
$webhookUrl = "https://webhook.site/1d7e9c2a-2e63-41f2-82cb-87ae6f695baa"; //$faker->url;
$RedirectUrl = "https://".$host."/success";
$CancelUrl = "https://".$host."/cancel";
$CashPaymentUrl = "https://".$host."/paybycash";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              =>  $faker->numberBetween(500000000,599999999),
    "customer_id"           =>  "23788286",
    // $faker->numberBetween(500000000,599999999),//866600,//12241,//$faker->numberBetween(10000000,19999999),
    "provider"              => $provider,
    "email"                 => $email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => 14,
    //  $faker->randomFloat(2,10,49),
    "AvsHouseNumber"        => "10",//$faker->buildingNumber,
    "AvsPostcode"           => "NN17 8YG",//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => "https://www.google.com/", 
    "CancelUrl"             => "https://www.youtube.com/",
    //$CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => '36 downtown', //new field
    "address2"              => 'Stoke-On-Trent', //new field
    "CashPaymentUrl"        => $CashPaymentUrl,
    // "DbTotal" => false, //mxtoken_8f94fc8e10842571bfac21c2f0b8c394
    // "TokenAvs" => '', //optional (Applicable for Optomany only) 
    // "token" => 'mxtoken_3mBR260Ag8pLo2pngOuol2ynOf_M-tCg', //optional (Applicable for Optomany/EG)
    // "last4Digits" => "0821",
  );
    // $SplitFee = [ 
    //   [
    //        "partner_merchant_id" => 1235034, 
    //       "type_id" => 3,
    //        "value" => 2.00,
    //        "value_type" => "amount"
    //   ],
    //   [
    //     "partner_merchant_id" => 1234600, 
    //    "type_id" => 1,
    //     "value" => 1.00,
    //     "value_type" => "amount"
    //   ]
       
    //   ];
    //    $payload['SplitFee'] = $SplitFee;



var_dump($payload);
$encryptedData = payment_encrypt2($payload);
// $datmanHost = "https://legac-legac-1ps3fo1v04vxs-368072287.eu-west-1.elb.amazonaws.com";
//$datmanHost = "https://legacy-t2srelease-2.datmanpay.com";
  // $datmanHost = "https://stage-6.datmanpay.com"; 
  // $datmanHost = "https://stage-3.datmanpay.com";
  $datmanHost  ='https://stage-3.datmanpay.com';
// dr.datmanpay.com
// $datmanHost="https://dr.datmanpay.com";
//   $datmanHost = "https://stage-test.datmanpay.com";
//$datmanHost = "https://legacy-pre-prod.datmanpay.com";

//$datmanHost = "https://dev-gateway-legacy.testing-248-omnipay.com"; 

//$switchHost = "https://y01c7t4ne8.execute-api.eu-central-1.amazonaws.com/cp_e2e/api/v1";
 $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
//$switchHost = 'https://t3d862fccf.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1';
//$switchHost = 'https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1';
  

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
echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Avaialble in production</i>";

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

function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC"){
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

function DecryptNew($str, $secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h', $encryptionMethod = "AES-256-CBC"){

  $iv                     = substr($secret, 0, 16);
  $base64EncryptedMessage = base64_decode($str);
  $decryptedMessage       = openssl_decrypt($base64EncryptedMessage, $encryptionMethod, $secret, 0, $iv);
  return json_decode($decryptedMessage,true); // converting data into associative array and returning it

}
echo "<br>";
