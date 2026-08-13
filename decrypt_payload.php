<?php
$key = '';
$encrypted_string = "";


function Decrypt($str){
  global $key;
  return unserialize(rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($str), MCRYPT_MODE_CBC, md5(md5($key))), "\0"));
}

$str = urldecode($encrypted_string);
var_dump(Decrypt($str));
