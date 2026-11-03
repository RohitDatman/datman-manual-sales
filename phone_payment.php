<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();

// forming business related values
// $merchant_id = 1235000;  //663208394; // cardstream 1235000 1234569 663167055 63162502 (1234569-cardstream-ch) 63153688 -ir
// $merchant_id = 1234943; // cs-ch
// $merchant_id = 1235001;
// $merchant_id = 1234571; //checkout-hf
// $merchant_id =  663160246 ;//1234574;  // cardstream-ch
// $merchant_id = 663184408; // optomany
// $merchant_id = 1234782; // CHECKOUT-HF//1235030(test)//1235031(stage)//workspace(1234567)
// $merchant_id =  663208111; //663208111;//663209575;// 663208389;//663208111; // 663208470 //63155428 ; // adyen (stage 63155457) (test 63169829) (ws 63169829)// 
// BA32CLM22322735KJJJ96849K
// $merchant_id = 63155552; // paystack
// $merchant_id = 1234572; //1234572; // spreedly // 63190423 // 1234572
// $merchant_id = 663207586; // saturn // 63155140 // 663192467
// $merchant_id = 663191524; // cardstream-obn
// $merchant_id = 663208169; // o2m
// $merchant_id = 663208906;// adyen aus
// $merchant_id = 663208394; // adyen usa
// $merchant_id = 512692180; // adyen usa 2
// $merchant_id = 63155480; // omnicart
// $merchant_id= 663209723;  //adyen - uk 
$merchant_id= 663209693;  //adyen - us moto 02m
// $merchant_id = 1234568; // cs-ch new ui
// $merchant_id = "663208386";//adyen-hf UK
// $merchant_id = '1235000';//uk cs 
// $merchant_id =  663160246; //cs-ch 
// $merchant_id =  663209459; //checkout us
// $merchant_id =  63169827;

// Mypay adyen mids
// UK
// $merchant_id = 663207730; // adyen uk
// $merchant_id = 663209693; // adyen USA moto stage
// $merchant_id = 663209694; 
// $merchant_id = 663209670; //Adyen US o2m 
// $merchant_id = 663210833;

// 663207634
// 663207730
// 663208347
// 663208407

$provider = "T2S";
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
// $email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
$email = 'rohit@datman.je';
$webhookUrl = "https://webhook.site/2423572a-857c-4bba-a18d-bff91755f24b"; //$faker->url;
// $RedirectUrl = "https://example.com";
$RedirectUrl = 'https://www.google.com/search?q=google&sxsrf=ALiCzsaYWMc353NEGDjt8kCYJDsNP047Lg%3A1663671077494&ei=JZspY43dHeuNseMPqsGIgAs&ved=0ahUKEwjNg-PcmaP6AhXrRmwGHaogArAQ4dUDCA4&uact=5&oq=goofle&gs_lcp=Cgdnd3Mtd2l6E';
$CancelUrl = "https://example.com/cancel";
// $CancelUrl = "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe%22";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000,599999999),
    // "customer_id"           => 0,
    // "order_id"              => '655877652',
    "customer_id"           => $faker->numberBetween(10000000,19999999),
    // "customer_id" =>"15831780",
    // "customer_id"           => 92385553, //CARDSTREAM
    // "customer_id"           => 17706598, //CHECKOUT-HF
    // "customer_id"           => 5154293, //Spreedly
    // "customer_id"           => 19428492, //Adyen
    // "customer_id" => 15278766,
    // "customer_id"           => 14977800, //Adyen pre-prod
    // "customer_id"           => 37377334, // cardstream-ch
    //  "customer_id"           => 18978322, // adyen USA
    // "customer_id"           => 1234944, // adyen UK stage
    "provider"              => $provider, 
    "email"                 => $email,
    "phoneNumber"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    // "Amount"          => $faker->randomFloat(2,10,50),
    "Amount"                => "20.00",
    "AvsHouseNumber"        => $faker->buildingNumber,
    "AvsPostcode"           => $faker->postcode,
    "MerchantReference"     => $faker->numerify("MerchantReference##########"),
    "RedirectUrl"           => $RedirectUrl,
    "CancelUrl"             => $CancelUrl,
    // "CancelUrl"             => "https://gotos.in/you+have+to+write+a+really+really+long+url+to+get+to+650+characters.+like+seriously+you+have+no+idea+how+long+it+has+to+be+650+characters+is+absolutely+freaking+enormous.+You+can+fit+sooooooooooooooooooooooooooooooooo+much+data+into+650+characters.+My+hands+are+getting+tired+typing+this+many+characters.+I+didnt+even+realise+how+long+it+was+going+to+take+to+type+them+all.+So+many+characters.+I'm+bored+now+so+I'll+just+copy+and+paste.+I'm+bored+now+so+I'll+just+copy+and+paste+gtF+.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.+It+has+to+be+freaking+enormously+freaking+enormous",
    // "WebhookUrl"            => $webhookUrl,
    "WebhookUrl"            => "https://webhook.site/a0023001-928d-4c56-9c84-f34aec10e945",
    "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
    "firstname"             => $faker->firstName, //new field
    "lastname"              => $faker->lastName, //new field
    "flat"                  => (string) $faker->randomNumber(2), //new field
    "address1"              => $faker->city, //new field
    "address2"              => $faker->streetName, //new field
    "CashPaymentUrl"        => "https://www.google.com/",
    // "backurl"              => "https://www.google.com/",
    // "originalSaleAmount"    => '1.00',
    // "TokenAvs" => "",
    // "token" => "mxtoken_05768ed428f98953e33f4ec0cbc0f026cb936aef44e563dd1665d286ec9e24af", // cardstream 
    // "token" => "mxtoken_97a7a378195c4beea8a0ab271c4075b7169970427d43ecd51b331b9792189968", // checkout 
    // "token" => "mxtoken_78824ff886442dc5ce53d8ff86fe530f",
    // "token" => "mxtoken_SaNqoz3gh6vKuA0KGsGH4tXCuPhqlwLM", 
    // "token" => "mxtoken_Zg_A1J8x9Nxv5B_gAfl5nL3kYIM9tyAm", // adyen customer id = 370623291
    // "token" => 'mxtoken_83bd6ff6e13378b55a38ea07b12b77f0fe19825364edecc307d4689259dc23a2', // adyen rtau
    // "token" => "mxtoken_133fd58eb693f5656b88bfb69d74428bdfe99a6fa4dc67560ce3e44c0c3ab21b",
    // "token" => "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395", // adyenUSA 18978322
    // "token" => "mxtoken_b949d8555fdd3c098cdb14a9bc151ed313507f01fdbb99bcfeb5fe7c72e0dda7",
    // "last4Digits" => "0005",
    // "last4Digits" => "0821",//checkout
    // "last4Digits" => "6567",//spreedly
    // "authorisation_type" => "PreAuth",
    "LegacyUrl" => "https://www.google.com/",
    // "backurl" => "https://www.google.com/"
    // "txnType" => "WALLET_RECHARGE_AGAINST_ORDER",
    // "txnType" => "MERCHANT_INITIATED_TRANSACTION",
    // "txnType" => "CREATE_MIT_TOKEN",
//     "statement_descriptor" => "Rohit 😭😂 ~!@#$%^&*()?{}()*:;?/\|>                               ",
// "statement_descriptor_address" => " ✊🏿 Dymanic #@%@%@&@^@&@()() ~!@#$%^&*()?{}()*:;?/\| Discriptor",
//   "metadata" => [
//  description => "testing description"
//   ]
);

$SplitFee = [ 
    [
      "partner_merchant_id" => 663208470,
      "type_id"=> 3,
      "value"=> 1,
      "value_type"=> "amount"
    ],
//     [
//       "partner_merchant_id"=> 663208389,
//       "type_id"=> 7,
//       "value"=> 1,
//       "value_type"=> "amount"
//     ],
//   //   [
//   //     "partner_merchant_id"=> 663208112,
//   //     "type_id"=> 6,
//   //     "value"=> 1.20,
//   //     "value_type"=> "amount"
//   //  ]
];
$payload['SplitFee'] = $SplitFee;

echo "<pre>";
print_r($payload);
echo "</pre>";

// $encryptedData = payment_encrypt2($payload);
// $migrationHost="https://stage-fh-1.datmanpay.com";
// $datmanHost = "http://legecy-release.datmanpay.com";
// $datmanHost = "https://stage-fh-1.datmanpay.com";
$datmanHost = "https://ws8-payments.datmanpay";
// $phpHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6"; //SIT
// $phpHost = "https://ws10-payments.datmanpay.com";
// $phpHost="https://stage-fh-1.datmanpay.com";
// $datmanHost = "https://stage2.datmanpay.com";
// $datmanHost = "https://legacy-qa-1.datmanpay.com";
// $datmanHost = "https://stage-6.datmanpay.com";
// $datmanHost = "https://legacy-test.datmanpay.com";
$switchHost = 'https://ws8-payments.datmanpay.com/switch/api/v1';
// $switchHost = "https://stage-fh-payments.datmanpay.com/switch/api/v1";
// $switchHost = 'https://stage-fh-1.datmanpay.com/switch/api/v1';
// $switchHost = "https://stage-payments.datmanpay.com/switch/api/v1";
// $switchHost = "https://xzm162tl69.execute-api.eu-west-1.amazonaws.com/t2srelease/api/v1";
// $switchHost = 'https://ty0j16tra0.execute-api.eu-west-2.amazonaws.com/ws8/api/v1';
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
// echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>PHP</a> - <i style='color:red'>Not in production yet</i>";

echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
// pre prod - Is1FlCFiRR3simumDWdotklr9Eg2Sk
// function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
// {
//   return urlencode((base64_encode(@mcrypt_encrypt(
//       MCRYPT_RIJNDAEL_256,
//       md5($key),
//       serialize($string),
//       MCRYPT_MODE_CBC,
//       md5(md5($key))
//   ))));
// }

// function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') {
//   $encryptionMethod = "AES-256-CBC";
//   $iv = substr(md5($key), 0, 16); // Generate IV from the key
//   $encryptedMessage = openssl_encrypt(serialize($string), $encryptionMethod, $key, 0, $iv);
//   return urlencode(base64_encode($encryptedMessage));
// }


// prod
// UdQAvINlVkbXD95FMrS4FY1AkLlWB4AD

// stage
// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj

function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
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
  320039674	website3.bigfoodie1.co.uk	63355140	15.00
  294493536	qaweb1.t2scdn.com	63355140	5.76
  294493537	qaweb1.t2scdn.com	63355140	3.60
  294493570	qaweb1.t2scdn.com	63355140	8.28

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