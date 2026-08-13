<?php

/** Last updated on 29-12-2020 */

$payload = array(
  "host"    => "example.com", //anything
  "order_id"  => "294482156", //valid order id belongs to T2S
  "provider"  => "FH", //T2S, FH
  "customer_id" => "31837", //anything
  "merchant_id" => "63189382", //valid merchant id belongs to Datman
  "name" => "Adi takeaway",
  "Amount" => "10.00",    
  "AvsHouseNumber" => "12",   
  "AvsPostcode" => "ST6 1EU",
  "TokenAvs" => 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:2:"12";s:11:"AvsPostcode";s:6:"ST66DX";}}', //optional (Applicable for Optomany only)
  "token" => "zPd88hZaItJp/EmQwN4v1CNDeY+adU0/eugRgg5/b2EfMQ==", //optional (Applicable for Optomany/EG)
  "last4Digits" => "9909", //optional (Applicable for Optomany/EG)
  // "RedirectUrl" => "https://example.com/redirect", //optional (Applicable for EG only)
  // "WebhookUrl" => "https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net", //optional (Applicable for EG only)
  // "CancelUrl" => "https://example.com/cancel", //optional (Applicable for EG only)
  // "DbTotal" => true, //optional` (Applicable for EG only)
  // "Reference" => "945alk2938laksdjflaksf", //optional (Applicable for EG only)
 );
 
 $encrypted = payment_encrypt2($payload);
 $php7_encrypted = EncryptNew(json_encode($payload));
 var_dump($payload);


echo "<a href='https://legecy-release.datmanpay.com/opto/card.php?data=$encrypted' target='_blank'>Release(QA) build</a>";
echo "<br>";
echo "<a href='https://pci-changes.datmanpay.com/opto/card.php?data=$php7_encrypted' target='_blank'>PHP7 (PCI) staging build</a>";
echo "<br>";
 
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

function EncryptNew($textToEncrypt, $secret = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH', $encryptionMethod = "AES-256-CBC")
{
   $iv               = substr($secret, 0, 16);
   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
   $base64EncryptedMessage = base64_encode($encryptedMessage);
   return $base64EncryptedMessage;
}

/*
T2S ORDER IDS (staging)
  294482156 => amount => 14.30 , customers_id associated with this order_id: 900686807
  294482161 => amount => 100.00,                "                          : 900687187

DATMAN MERCHANT IDS (staging)
  EG => 63169829
  OPTOMANY => 63189382

Customer IDS (staging)
  nitish@datman.je    => 31837
  muzammil@datman.je  => 27202

SAVED CARD TOKENS
  Optomany token => zPd88hZaItJp/EmQwN4v1CNDeY+adU0/eugRgg5/b2EfMQ==
  EG token (3d - 122468) => egtoken_20121606XM02YX06FB35BCY
  EG token (Non 3d - 122466) => egtoken_20122407DK25ZH41PZ93BJJ

OPTOMANY TEST CARD   
  5224 9999 9999 9909
  12/21 , 000

EG TEST CARD 
  4929421234600821
  12/21 , 356

SQL QUERIES
   update card_payment set payment_status = 'FAILED' where order_id = 294482156;
   select * from card_payment where order_id = 294482156 order by id desc limit 10;
   select * from cardstream_settings where name = 'merchant_id';

PHP API Collection
https://www.getpostman.com/collections/ff2a0cfd17071b5d746d

Cardstream MMS
  https://mms.cardstream.com/admin
*/  


// echo "<a href='http://gateway.dml.com/opto/card.php?data=$encrypted' target='_blank'>Local</a>";
// echo "<br>";
// echo "<a href='https://legecy-development.datmanpay.com/opto/card.php?data=$encrypted' target='_blank'>Dev build</a>";
// echo "<br>";
// echo "<a href='https://legecy-t2srelease.datmanpay.com/opto/card.php?data=$encrypted' target='_blank'>T2S Release(QA) build</a>";
// echo "<br>";
// echo "<a href='https://legecy-sandbox.datmanpay.com/opto/card.php?data=$encrypted' target='_blank'>Sandbox build</a>";
// echo "<br>";
// echo "<a href='https://datmanpay.com/opto/card.php?data=$encrypted' target='_blank'>Production build</a>";