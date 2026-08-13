<?php
//https://github.com/fzaninotto/Faker
require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
$faker = Faker\Factory::create();
// forming business related values
// $merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// $merchant_id = 63155480; // adyen - OMNICART
$merchant_id = 663212350; // 63169827
//  $merchant_id = 663213439;
// $merchant_id = 663208350;
// $merchant_id = 663213572; // adyen BP
// $merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663212494 - edining
// 663209873 - Edining Adyen
// 663212350 - FASTFOOD
// 663212983 - SmeBizness
// 663212985 - Ask4Dish
// 663212454 , 663208350- Quickchow
//  663214243 - GKSOFT
// 663214519 - appcompanion
// 663214585 - EASYEATS
/// 663215161 - Foodninja
// 1234667 - gksoft
// 663215805 - order2online
// - 663217451 - YPSOLUTIONS
// 663215188 - ask4dish
$business_name = $faker->company;
//$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
$email = "roh@datman.je"; //$faker->email;
$webhook_url = "https://webhook.site/59344984-af91-4992-aac9-035ebfd1b2dc"; //$faker->url;
// $webhook_url = "https://www.google.com";
$redirect_url = "https://google.com";
$cancel_url = "https://".$host."/cancel";

$payload = array(
    "host"                  => $host,
    "merchant_id"           => $merchant_id,
    "order_id"              => $faker->numberBetween(500000000, 599999999),
    // "order_id"              => '355b-6e0d-48c3-b9e9-439752b9b22',
    // "customer_id"           => 3614647, // adyen.  ED506826186- sandbox domain EE508481471
    // 537443785 - appcompanion
    // 593468736 - foodninja
    // 508169730 - order2online
    // 518078222 - YPSOLUTIONS
    // 3614647 - FF
    "customer_id"           =>  $faker->numberBetween(500000000,599999999),
    // "provider"              => $provider, 
    "email" => 'automation_test@test.com',
    "phone_number"           => $faker->numerify("07##########"),
    "name"                  => $business_name,
    // "amount"                => $faker->randomFloat(2,10,50),
    "amount"                => 27.00,
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
    "txn_type"            => "Pre-Auth",
    // "source"             => "mobile-app",
    "back_url"               => $cancel_url,
    "DbTotal"               => false,


    // "statement_descriptor" => " ttttyunwdcoiwdckowihcnjnwbciowcwceohwjecbownbcwce 😭😂 ~!@#$%^&*()?{}()*:;?/\|>                               ",
    // "statement_descriptor_address" => " ✊🏿 Dymanic #@%@%@&@^@&@()() ~!@#$%^&*()?{}()*:;?/\| Discriptor",

    // "source"                => "mobile-app",
    // "token_avs" => "",
    // "token" => "mxtoken_5e12fffa2e08d8ca7022aedb0f05a2e457a5e27937e7b6361dd01fa7d4aedcf2", // adyen OMNICART
    // "token" => "mxtoken_772fcb53bd163ad1587ca850e55629a91462a6e4107796bd4abe852b43f98cb1", // adyen EDININGEXPRESS
    // "last4_digits" => "0004", // spreedly 
    // "token" => "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen EDININGEXPRESS
    // "last4_digits" => "0004", // spreedly
    // "last4_digits" => "4242", // checkout/supper
    // "last4_digits" => "0000", // adyen/dna
    // "last4_digits" => "1111",
    // "last4_digits" => "0821",
);



// 663215806 - order2online split
// 663217452 - YPSOLUTIONS split 1, 663217453 - YPSOLUTIONS split 2

$split_fee = [
    [
      "partner_merchant_id" => 663218413,  // sandbox BP - US 663212986 - ask4dish //- 663214244- GKSOFT //  appcompanion - 663214520  // 663214586 - EASYEATS // FOODNINJA - 663215162
      "type_id" => 1,
      "value" => 5.00,
      "value_type" => "amount"
    ],
    [
      // "partner_merchant_id" => 663176007,
      "partner_merchant_id" => 663218408,  // sandbox BP - US
      "type_id" => 2,
      "value" => 1.50,
      "value_type" => "amount"
    ]
];

$payload['split_fee'] = $split_fee;

echo "<pre>";
print_r($payload);
echo "</pre>";

$encryptedData = payment_encrypt2($payload);

$datmanHost = "https://ws7-payments.datmanpay.com";
// $datmanHost = "https://sandbox-payments-edining.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-fastfood.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-smebizness.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-quickchow.datmanpay.com";
// $datmanHost = "https://sandbox-payments-gksoft.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-appcompanion.datmanpay.com";
// $datmanHost = "https://sandbox-payments-easyeats.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-foodninja.datmanpay.com";  
// $datmanHost = "https://sandbox-payments-order2online.datmanpay.com";
// $datmanHost = "https://sandbox-payments-ask4dish.datmanpay.com"; 
// $datmanHost = "https://sandbox-payments-yps.datmanpay.com";
// $datmanHost = "https://ws3.datmanpay.com";
// https://ws9-payments-edining.datmanpay.com

// $switchHost = 'https://ws3-payments.datmanpay.com/switch/api/v1';
// $switchHost = 'https://ws6-payments.datmanpay.com/switch/api/v1';
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

// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj - FH
//xejPvqKFb50ZMBIN6dVN4Kzin6iymqlk - edining key
// noci1oPw7pKavuPWyqoHiB0RDxE62Y6A - quickchow
//lszOjEGjqUyMjggJUMvzYfELIUnTLWxFlqn
//tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf - Partners Stage key
// HdCl9F84zD8X595j2W3cgJOOs746jXjU - SmeBizness
// 9lY7eSvaKcsoZwc2qz47GIf9a9Cm1XtO - Ask4Dish 
// PdCl9F84zD8X5p172W3cgJOOs746jXQm - GKSOFT
// fL1PlF7CS6s6jkXMj31FqIfAmzcKFiqc - appcompanion
// rCeO5yWRS7vh79to7hGeT6n9v8d2NPqk - EASYEATS
// yjulpQucf5qqIx7Ep1tKN76C5Nji3WqR - FOODNINJA
// dVTEP9mTLerN6nKi5o54QYBGXu58b7NG - fastfood
// zr92bu8dCCX4tf3HiquKC0d05L6ThBMi - order2online
// ddLbUhvWBqmUfl9U20mPVf3085ur5Gn4 - YPSOLUTIONS
function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')    // e990fb4a156fd51d4f3fc04353b01fb1
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