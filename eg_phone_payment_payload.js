const crypto = require('crypto');
let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF' //eg encryption key dev/qa
// const BASE_URL = "https://release.gateway.datmanpay.com/earth";
// const BASE_URL = "https://nd-2392-method-not-allowed.dw62m7utw2a83.amplifyapp.com/earth";
const BASE_URL = "http://localhost:4002/dev/api/v1/sale/create"

let encryptRequest = (data) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data,'utf8','base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
}


let payload_eg = {
  "host" : "example.com",
  "order_id" : "122194",
  "provider" : "T2S",
  "customer_id" : "336367",
  "merchant_id" : "63169829",
  "total" : 11.00,
  "first_name" : "sandeep",
  "last_name" : "kumar",
  "house_number" : "347",
  "flat" : "Flat 6",//optional 
  "address_line1" : "Primrose Rise",
  "address_line2" : "Lavender Road",
  "address" : "lksjd flask, sdlkfjasld",
  "postcode" : "NN17 8YG",
  "email" : "sandeep@gmail.com",
  // "cc_token" : "egtoken_20091607ZX59ZK37WN29TTQ", //optional
  // "last_four_digits": "0821",//optional
  "redirect_url": "https://example.com/redirect",//optional
  "cancel_url": "https://example.com/cancel?a=b",//optional
  "webhook_url" : "https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net",//optional
  "reference" : "falskdjfasdlaksjdlasd", //optional

  "provider": "FH",
  "cash_payment_url": "https://example.com/cash",
  "db_total": false,
  "gateway_switched":false,
  "mode": "phone_payment"
}




var payload_eg_string = JSON.stringify(payload_eg);
// let base64 = Buffer.from(payload_eg_string, 'utf8').toString('base64');

let enc = encryptRequest(payload_eg_string)
console.log('myENC', enc)



// let finalEGdirectPayload = {
//   data:base64,
//   sessionID: "987987",

// }

// console.log('final payload', base64)
