// <?php
// //https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
// $faker = Faker\Factory::create();

// //forming business related values
// $merchant_id = "63189380";
// $provider = "FH";
// $business_name = $faker->company;
// //$host = "https://".preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
// $host = preg_replace('/[^A-za-z0-9]+/', '', strtolower($business_name)).".com";
// $email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //$faker->email;
// $webhookUrl = "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net?simple=1&bSuccess&id=330831810&transaction=66643"; //$faker->url;
// $RedirectUrl = "https://www.google.com/search?q=goofle&sxsrf=ALiCzsaYWMc353NEGDjt8kCYJDsNP047Lg%3A1663671077494&ei=JZspY43dHeuNseMPqsGIgAs&ved=0ahUKEwjNg-PcmaP6AhXrRmwGHaogArAQ4dUDCA4&uact=5&oq=goofle&gs_lcp=Cgdnd3Mtd2l6EAMyBwgjELECECcyBwgjELECECcyBwgjELECECcyEQguELEDEIMBEMcBENEDEJECMgUIABCRAjIECAAQQzINCAAQsQMQgwEQsQMQQzIKCAAQsQMQgwEQCjINCAAQsQMQgwEQyQMQCjIFCAAQkgM6CggAEEcQ1gQQsAM6BwgAELADEEM6BwguELADEEM6DQgAEOQCENYEELADGAE6DAguEMgDELADEEMYAjoHCCMQ6gIQJzoNCC4QxwEQrwEQ6gIQJzoECCMQJzoLCAAQsQMQgwEQkQI6CwgAEIAEELEDEIMBOgUIABCABDoQCC4QsQMQgwEQxwEQ0QMQQzoECC4QQzoHCC4Q1AIQQzoKCAAQsQMQgwEQQzoFCC4QkQI6EAguELEDEIMBEMcBENEDEAo6DQgAELEDEIMBELEDEAo6BAgAEApKBAhBGABKBAhGGAFQhANY2wpg8AtoAnABeACAAZgBiAGrBZIBAzIuNJgBAKABAbABCsgBEsABAdoBBggBEAEYCdoBBggCEAEYCA&sclient=gws-wiz/success?simple=1&bSuccess&id=330831810&transaction=66643";
// // $CancelUrl = "https://".$host."/cancel?simple=1&bSuccess&id=330831810&transaction=66643";

// $payload = array(
//     // "host"                  => $host,
//     // "merchant_id"           => $merchant_id,
//     // "order_id"              => $faker->numberBetween(500000000,599999999),
//     // "customer_id"           => $faker->numberBetween(10000000,19999999),
//     // "provider"              => $provider, 
//     // "email"                 => $email,
//     // "phoneNumber"           => $faker->numerify("07##########"),
//     // "name"                  => $business_name,
//     // "Amount"                => $faker->randomFloat(2,10,50),
//     // "AvsHouseNumber"        => $faker->buildingNumber,
//     // "AvsPostcode"           => $faker->postcode,
//     // "MerchantReference"     => $faker->numerify("MerchantReference##########"),
//     // "RedirectUrl"           => $RedirectUrl,
//     // "CancelUrl"             => $CancelUrl,
//     // "WebhookUrl"            => $webhookUrl,
//     // "customer_joining_date" => $faker->dateTimeThisMonth->format('Y-m-d H:i:s'),
//     // "firstname"             => $faker->firstName, //new field
//     // "lastname"              => $faker->lastName, //new field
//     // "flat"                  => (string) $faker->randomNumber(2), //new field
//     // "address1"              => $faker->city, //new field
//     // "address2"              => $faker->streetName, //new field
//     // "TokenAvs"              => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
//     // "token"                 => 'mxtoken_513b145aff7091c1628264a7d8db4002', //optional (Applicable for Optomany/EG)
//     // "last4Digits"           => "0821"

// );

// $payload['SplitFee'] = [ 
//   (object)[
//     "partner_merchant_id" => 63155126,  //63183378
//     "type_id" => 2,
//     "value" => 1.00,
//     "value_type" => "amount"
//   ],
//   (object)[
//     "partner_merchant_id" => 63155126,  //63183378
//     "type_id" => 2,
//     "value" => 2,
//     "value_type" => "amount"
//   ],
//   (object)[
//     "partner_merchant_id" => 63155126,  //63183378
//     "type_id" => 2,
//     "value" => 3,
//     "value_type" => "amount"
//   ]
// ];
// $payload['SplitFee'] = $SplitFee;

// echo "<pre>";
// print_r($payload);
// echo "</pre>";

// $encryptedData = payment_encrypt2($payload);

// $datmanHost = "https://legacy-qa-4.datmanpay.com"; //http://legacy-migration.datmanpay.com cp-e2e php
// $switchHost = 'https://payments.datmanpay.com/switch/api/v1';
// $UranusGBPEndpoint = "";
// $UranusEUREndpoint = "";
// $UranusPhonePayment = "";
// $UranusPhonePaymentWin = "";
// $PlutoEndpoint = "";

// // echo "<a href='$datmanHost/barclays/phonePayment.php?data=$encryptedData' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Available in production</i>";
// // echo "<br>";
// // echo "<br>";
// // echo "<br>";
// // echo "<br>";
// // echo "<a href='$datmanHost/barclays/onlinePaymentV2.php?data=$encryptedData' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Available in production</i>";
// // echo "<br>";
// // echo "<br>";
// // echo "<a href='$datmanHost/barclays-irl/onlinePaymentV4.php?data=$encryptedData' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Available in production</i>";
// // echo "<br>";
// // echo "<br>";
// echo "<a href='$datmanHost/opto/card.php?data=$encryptedData' target='_blank'>Pluto</a> - <i style='color:red'>Not in production yet</i>";
// echo "<br>";
// echo "<br>";
// echo "<a href='$switchHost/phone-payment/?data=".EncryptNew(json_encode($payload))."' target='_blank'>Cardstream phone payment</a> - <i style='color:green'>Available in production</i>";

// //pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
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

// function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
// {
//    $iv               = substr($secret, 0, 16);
//    $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
//    $base64EncryptedMessage = base64_encode($encryptedMessage);
//    return $base64EncryptedMessage;
// }