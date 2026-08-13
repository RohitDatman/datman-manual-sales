<?php

/** Last updated on 31-Aug-2021 */

$payload = array(
  "host" => "qa3.t2scdn.com",
  "order_id" 	=> 294493542,
  "provider" 	=> 'T2S',
  "customer_id" => 27202,
  "email"         => "muzammil@datman.je",
  "CancelUrl"     => 'https://example.com/cancel',
  "WebhookUrl"    => 'https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net',
  "RedirectUrl"   => 'https://example.com/redirect',
  "DbTotal" => true
);

$encrypted_gbp = payment_encrypt2($payload);
//$encrypted_eur = EncryptNew(json_encode($payload));
$endpoint = 'https://legecy-sandbox.datmanpay.com';
var_dump($payload);

echo "<a href='$endpoint/barclays/phonePayment.php?id=$payload[order_id]' target='_blank'>Release build - Barclays - Phone payment - GBP</a>";
echo "<br>";
echo "<br>";
echo "<a href='$endpoint/barclays/localPhonepPaymentsWin.php?id=$payload[order_id]&order_id=$payload[order_id]&remote_id=$payload[order_id]&version=10' target='_blank'>Release build - Barclays - Phone payment Win- GBP</a>";
echo "<br>";
echo "<br>";
echo "<a href='$endpoint/barclays/onlinePaymentV4.php?data=$encrypted_gbp' target='_blank'>Release build - Barclays - GBP</a>";
echo "<br>";
echo "<br>";
echo "<a href='$endpoint/barclays-irl/onlinePaymentV4.php?data=$encrypted_gbp' target='_blank'>Release build - Barclays - EUR</a>";
echo "<br>";
echo "<br>";
//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
function payment_encrypt2($string, $key = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH')
{
  return urlencode((base64_encode(@mcrypt_encrypt(
      MCRYPT_RIJNDAEL_256,
      md5($key),
      serialize($string),
      MCRYPT_MODE_CBC,
      md5(md5($key))
  ))));
}

function EncryptNew($textToEncrypt, $secret = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH', $encryptionMethod = "AES-256-CBC")
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

