const crypto = require('crypto');

// let secret = "r7aAzmPkU!=jJUr@Q%$dXznMLRfFuJFR";
let secret = 'ytyf3Ex2dV=3@#eQL7UgcWvNk^w*+L5h'
// let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"

//const BASE_URL = "https://lojyi3bpw3.execute-api.eu-west-1.amazonaws.com/dev/stripe-pay?data="
const BASE_URL = " https://w8hqv96x41.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/saturn/stripe-pay?data="



let encryptRequest = (data) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data,'utf8','base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
}

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, 'base64').toString('ascii')
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptData = decryptor.update(encryptedData, 'base64', 'utf8') + decryptor.final('utf8');
}
var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('------',randomOrderID)
var amountNum = Math.floor(10 + Math.random() * 20);
var amount = amountNum+.01
console.log('------',amount)
let payload = {
"host" : "d-111.t2scdn.com",
"order_id" : randomOrderID,
"provider" : "T2S",
"customer_id" : "1234",
"merchant_id" : "63155140",
"merchant_name" : "Nitish Takeaway",
"total" : amount,
"first_name" : "Nitish",
"last_name" : "Qa",
"house_number" : "12",
"flat" : "3A", //Optional
"address_line1" : "address1",
"address_line2" : "address2",
"address": "hello this is address",
"postcode" : "st66dx",
"email" : "nitish@datman.je",
"token_avs" : "111", //optional
"token" : "121", //optional
"last_4_digits": "1234",//optional
"redirect_url": "",//optional
"cancel_url": "https://example.com/failure",//optional
"webhook_url": "https://webhok.com",//optional
"success_url": "https://test.com"
}


console.log(BASE_URL + encryptRequest(JSON.stringify(payload)))



