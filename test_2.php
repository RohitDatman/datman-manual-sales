<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values
$merchant_id = "1235000";//"663184566"; //add the merchants available in CP 1234580
$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = $faker->email;
$webhookUrl = "https://47730a9139434dfa8b63d7b4e6bf2b1d.m.pipedream.net/?simple=1&bSuccess&id=330831810&transaction=66643"; //$faker->url;
$RedirectUrl =  "https://www.google.com"; //https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe"; //"https://www.google.com";
$CancelUrl = $faker->url;//"https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe";//"https://".$host."/cancel?simple=1&bSuccess&id=330831810&transaction=66643";
//"https://gotos.in/you+have+to+write+a+really+really+long+url+to+get+to+650+characters.+like+seriously+you+have+no+idea+how+long+it+has+to+be+650+characters+is+absolutely+freaking+enormous.+You+can+fit+sooooooooooooooooooooooooooooooooo+much+data+into+650+characters.+My+hands+are+getting+tired+typing+this+many+characters.+I+didnt+even+realise+how+long+it+was+going+to+take+to+type+them+all.+So+many+characters.+I'm+bored+now+so+I'll+just+copy+and+paste.+I'm+bored+now+so+I'll+just+copy+and+paste+gtF+.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.+It+has+to+be+freaking+enormously+freaking+enormous";
//"https://".$host."/cancel?simple=1&bSuccess&id=330831810&transaction=66643";
//https://47730a9139434dfa8b63d7b4e6bf2b1d.m.pipedream.net/

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    "customer_id"           => "70433946",$faker->numberBetween(10000000,19999999),////"15900773",
    "provider"              => "FH",//$provider, 
    "email"                 => "qatesting@datman.je",//$email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    "Amount"                => "20.00",$faker->randomFloat(2,10,50),
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => "NN178YG",//$faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    "WebhookUrl"            => $webhookUrl,
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => "",$faker->firstName, //new field
    "lastname"              => "",$faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    "backurl"               => "https://sit-web30-uk.fhcdn",

"TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"NN178YG";}}', //optional (Applicable for Optomany only)
// "token" => 'mxtoken_78824ff886442dc5ce53d8ff86fe530f', //optional (Applicable for Optomany/EG)
// "last4Digits" => "0821"


);



$SplitFee = [ 
   [
    "partner_merchant_id" => 663191524, //663191524,//63169829, 
    "type_id" => 1,
    "value" => 4.00,
    "value_type" => "amount"
  ],
  [
    "partner_merchant_id" => 663191524,
    "type_id" => 2,
    "value" => 4.00,
    "value_type" => "percentage"
  ],
  // [
  //   "partner_merchant_id" => 663191524,//63169829, 
  //   "type_id" => 4,
  //   "value" => 2.00,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 663191524,
  //   "type_id" => 3,
  //   "value" => 3,
  //   "value_type" => "percentage"
  // ],
  // [
  //   "partner_merchant_id" => 663191524,//63169829, 
  //   "type_id" => 6,
  //   "value" => 2.00,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 663191524,
  //   "type_id" => 5,
  //   "value" => 2 ,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 63169829,//663176007, //63169829
  //   "type_id" => 3,
  //   "value" => 3.00,
  //   "value_type" => "amount"
  // ]
  // [
  //   "partner_merchant_id" => 63169829,//663176007, //63169829
  //   "type_id" => 4,
  //   "value" => 3.00,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 63169829,//663176007, //63169829
  //   "type_id" => 5,
  //   "value" => 3.00,
  //   "value_type" => "amount"
  // ],
  // [
  //   "partner_merchant_id" => 63169829,//663176007, //63169829
  //   "type_id" => 6,
  //   "value" => 3.00,
  //   "value_type" => "amount"
  // ]
  
  
  // [
  //   "partner_merchant_id" => 63153472,//663176007, //63169829
  //   "type_id" => 1,
  //   "value" => 4.00,
  //   "value_type" => "amount"
  // ]

];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

//$datmanHost = "https://stage-5.datmanpay.com";

//$datmanHost = "https://stage-1.datmanpay.com";

//$datmanHost = "https://stage-6.datmanpay.com";

//$datmanHost = "https://stage-2.datmanpay.com"; 

//$datmanHost  = "https://legacy-test.datmanpay.com";

// $datmanHost = "https://stage-2.datmanpay.com";

$datmanHost = "https://ws5.datmanpay.com";

// $datmanHost = "https://ws6.datmanpay.com";

//$datmanHost = "https://stage-fh-payments.datmanpay.com/";

// $datmanHost = "https://stage.datmanpay.com";

//$switchHost = 'https://payments.datmanpay.com/switch/api/v1';

$UranusGBPEndpoint = "";
$UranusEUREndpoint = "";
$UranusPhonePayment = "";
$UranusPhonePaymentWin = "";
$PlutoEndpoint = "";

echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
echo "<br>";
echo "<br>";
echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') //ws-2 P6VRBHonS12Wsumz6Kpl4J1IuYXS59nO- WS2
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

//function EncryptNew($textToEncrypt, $secret = 'P6VRBHonS12Wsumz6Kpl4J1IuYXS59nO', $encryptionMethod = "AES-256-CBC")

//function EncryptNew($textToEncrypt, $secret = 'gfhV2aYtUpbonPM0gXPFUJ4PF98Q2ig', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}