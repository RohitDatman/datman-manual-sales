<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

//forming business related values

$merchant_id = 
// "663195603"; //Cardstream-UK
// cs ch aus
// "663195604";

// "663209957";

// "663194535"; // cs new mid [only 1 test sale]

// "663159021";

// "63181447";

// cs ch usa non o2m mid

// "663159021";

// cs ch us o2m mid

// "63191145";

// cs prod mid

// "63181447";

// CS old UI mid
// "663223828";

//cs cashflow mid
// 663194535;

// adyen di uk new ui

// "663209575";

// Adyen US store enabled prod MID
// "663227683";

// Adyen us new mid
// "663226538";
// 663197155;
// Adyen us moto-mid
// "663227683";

// Adyen nz adyen merge=0 new mid
// "663225555";

// Adyen nz adyen merge=1 new mid
// "663223242";

// checkout UK prod

// "663195606";

// CS ch uk
// "663197155";

// cs-ch usa
// "63191145";

// Checkout new mid for prod testing
// "663195606";

// adyen usa merchant id

// "663206519";

// Spreedly
// "663195603";
// "663228092";
// 663212837; // Spreedly checkout.com

// 663230927;

// "663210143";
// "663209505";

// "663218609";



// checkout hf mid

// "663195606";

// "663195603";

// Stripe
// "63155140";

// "663195603";

// "663195604";

// "663209575";

// pay safe mid
// "111111";

// Paystack
// "663161429";


// "63181447";

// "663195603";

// adyen pay fac mid

// "663209575";

// adyen usa mid

// "663206519";

// "663214163";

// "663195603";


// "663233906";

// "663240734";

// * 663194940 - Adyen UK
// * 663207711 - cardstream Ireland
// * 663195603 - cardstream-ch us
// * 663195604 - cardstream-ch au
// * 663195606 - checkout-hf


$provider = "FH";
$business_name = $faker->company;
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)) . ".com";
$email = $faker->email;
$webhookUrl = "https://api-webhook.touch2success.com/hook/confirm?id=1195089959&amount=1.00"; //$faker->url;
// $webhookUrl = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook?name=datman%20testing&text=hello%3Ddatman%3B%203345";
$RedirectUrl = "https://www.google.com";
$CancelUrl = "https://" . $host . "/cancel";

$payload = array(
  // "source"=> "mobile-app",
  "host" => $host,
  "merchant_id" => $merchant_id,
  "order_id" => 
  // "hgbhhgn",
  $faker->numberBetween(500000, 5999999),
  "customer_id" => 
  // "80491045",
//  adyen uk shopper id
  // "80491048",
  // "804910923",
  // "804910912", // adyen uk new 
  // "80491040",
  // "80491039", // new working Cid


  // adyen shopper id
  // "80491050",

  // "80491037",  // checkout,cs-ch prod ci

  // "17007603", // cs shopper id

  //adyen usa shopper id
  // "80491072" ,

  //Adyen NZ cid
  // "15871889", 

 
  // "80491043",
  $faker->numberBetween(10000000,19999999),
  // "customer_id"           => $faker->numberBetween(10000000,19999999),
  "provider" => $provider,
  "email" => "banu@datman.je",
  "phoneNumber" => $faker->numerify("07##########"),
  "name" => $business_name,
  "Amount" => "7.12",//$faker->randomFloat(2,10,50),
  "AvsHouseNumber" => "Flat 6",//$faker->buildingNumber,
  "AvsPostcode" => "NN178YG",//$faker->postcode,
  "MerchantReference" => $faker->numerify("MerchantReference##########"),
  "RedirectUrl" => $RedirectUrl,
  "CancelUrl" => $CancelUrl,
  "WebhookUrl" => $webhookUrl,
  "backurl" => "https://www.google.com/",
  "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
  "firstname" => "Rohit", //new field
  "lastname" => "M", //new field
  "flat" => (string) $faker->randomNumber(2), //new field
  "address1" => $faker->city, //new field
  "address2" => $faker->streetName, //new field,
//   "captureDelayHours" => "1",
//  "authorisation_type" => "PreAuth",
  // "txnType" => "WALLET_RECHARGE_AGAINST_ORDER",
  // "txnType" => "CREATE_MIT_TOKEN",
  // "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  // "CashPaymentUrl"        => $CashPaymentUrl,
  
  

  // cs prod token for 80491037

  // "token" =>"mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",
  // "last4Digits" => '5005'

  // 5262 card
  //   "token" => "mxtoken_7c61dc13c7ddec87f278fb822659a3c4df691a5a5064cc3ad7b41a6591622223",
  // "last4Digits" => '5262'

  // adyen master token
  // "token" => 'mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea',
  // "last4Digits" => '5005'
  
  // 'mxtoken_OGr4durMmjyIN7ypKr4r5zkj_tI1sinU',
  // 5005 card 

  //  "token" => "mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",  //cs prod token for 80491037

  // // // // // // // //  cs ch master token 
  // // // // // // // 'mxtoken_142c523573d2ff8e57d7bf8c2802b37e', //optional (Applicable for Optomany/EG)
  
  //Checkout master token
  // "token" => "mxtoken_4fdb28f8302b77f98355b0ab1ee70e1729a58f744041c4e73e3991f4fd9ee2e2" ,
  // "last4Digits" => '6935'

  // "token" => "mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473",
  // "last4Digits" => '6935',
  
  
  // // cs master token 
  // "token"  => "mxtoken_e59888042daebaef34b15aklfaflq5a9464154ae91feb239aa4a82938436c3la", 
  // "last4Digits" => '6935',
   
  //  "token"  => "mxtoken_P7Xie3RqDmaEH7_b-AM0qghiw2J0kKYz",   // Spreedly token 
  // "last4Digits" => '6935'

    // "statement_descriptor" => "Nitish Dynamic",
    // "statement_descriptor_address" => "Discriptor",

//       "metadata" => [
//  description => "testing description"
//   ]


);

$SplitFee = [
  [
    "partner_merchant_id" => 63181447,
    "type_id" => 8,
    "value" => 0.51,
    "value_type" => "amount"
  ]
  // [
  //   "partner_merchant_id" => 663209575,     //,663206519
  //   "type_id" => 3,
  //   "value" => 0.05,
  //   "value_type" => "amount"
  // ],
];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);
$encryptNewData = EncryptNew(json_encode($payload));

$datmanHost = "https://datmanpay.com";// prod

// $datmanHost = "https://b.datmanpay.com";// pre prod

// $datmanHost = "https://dr-payments.datmanpay.com";

// $datmanHost = "https://dr.datmanpay.com";// dr encrionment prod

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

function payment_encrypt2($string, $key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk')
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

function EncryptNew($textToEncrypt, $secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}


