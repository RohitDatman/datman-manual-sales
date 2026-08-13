const crypto = require('crypto');
let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF' //eg encryption key dev/qa
//let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr'; //earth enc key
//let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'
//const BASE_URL = "https://release.gateway.datmanpay.com/earth";
//const BASE_URL = "https://t2srelease.gateway.datmanpay.com/earth"
//const BASE_URL = "http://localhost:3000/earth";
const BASE_URL = 'https://nd-1223-payment-capture-billing-address-hotfix.dw62m7utw2a83.amplifyapp.com/earth'
//const BASE_URL = 'https://sls-470-card-details-visibility-fix.dw62m7utw2a83.amplifyapp.com/earth'
//const BASE_URL = 'http://localhost:4102/dev/api/v1/phone-payment';
let encryptRequest = (data) => {
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
  let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer(encrypted).toString('base64');
}

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, 'base64').toString('ascii')
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptData = decryptor.update(encryptedData, 'base64', 'utf8') + decryptor.final('utf8');
}
let random_order_id = Math.floor(100000 + Math.random() * 900000);
let amount = 11.21; //const amount = Number(payload.receipt.amount.replace(/,/g, ''));
console.log('ORDER Id:', random_order_id);
console.log('amount is', amount);
const merchant_id = 63169829;
//const merchant_id = 63153489; //63153489
let payload_eg = {
  "host": "example.com",
  "order_id": random_order_id,
  "provider": "T2S",
  "customer_id": "666666", //"71691150", //"3363671",
  "merchant_id": merchant_id,//"63169829",
  "total": amount,
  "first_name": "Tikaram",
  "last_name": "Mardi",
  "house_number": "347",
  "flat": "Flat 6",//optional
  "address_line1": "Primrose Rise",
  "address_line2": "Lavender Road",
  "address": "lksjd flask, sdlkfjasld",
  "postcode": "NN178YG",
  "email": "tikaram@datman.je",
  // "cc_token": "egtoken_20122407DK25ZH41PZ93BJJ", //optional
//   "cc_token": "egtoken_21090715RT24MC21DD33JZH", //optional
//   "last_four_digits": "0821",//optional
  "redirect_url": "https://example.com/redirect",//optional
  "cancel_url": "https://example.com/cancel?a=b",//optional
  "webhook_url": "https://webhook.site/1cc3cf02-6855-4fc6-9636-bd29df9be1e5",//optional
  "reference": "falskdjfasdlaksjdlasd", //optional
}

//egtoken_20122407DK25ZH41PZ93BJJ


var token = [
//   {
//     token: `${payload_eg.cc_token}`.replace('egtoken_', ''),
//     last_four_digits: payload_eg.last_four_digits,
//     master_token: "",
//     billing_address_req: true
//   }
];

var base64Data = JSON.stringify({
  currency_sign: "£",
  token,
  total: payload_eg.total,
  cancel_url: payload_eg.cancel_url,
  redirect_url: payload_eg.redirect_url,
});

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string
let base64String = bufferObj.toString('base64');

var cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload_eg))
console.log(cardstream_encrypted_payload)
console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`)

//console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}`)
console.log('===========> REFUND <============')
let refund_payload = {
  "order_id": random_order_id, //random_order_id,
  "merchant_id": 63153489,
  "amount": 0.50,
  "reason": 'testing',
  "host": 'host.com'
}

console.log(encryptRequest(JSON.stringify(refund_payload)));
//atob("NjYzMTg0NTA4")
//btoa("63169829")
/*
 if(!Number.isInteger(payload.transaction_id)){
      throw { message: "transaction_id should be an integer" };
    }
*/
