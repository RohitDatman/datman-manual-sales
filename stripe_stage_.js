const crypto = require('crypto');

// let secret = "r7aAzmPkU!=jJUr@Q%$dXznMLRfFuJFR";
//let secret = 'ytyf3Ex2dV=3@#eQL7UgcWvNk^w*+L5h' pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
 let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"

// const BASE_URL = "https://0zc3x7py3e.execute-api.eu-west-1.amazonaws.com/stage/api/v1/saturn/stripe-pay?data="
// const BASE_URL = "https://stage-stripe.datmancrm.com/v1/stripe-pay?data=";
// const BASE_URL = "https://stage-stripe.datmancrm.com/v1/stripe-pay?data="
const BASE_URL = "https://kko03emqkd.execute-api.eu-west-2.amazonaws.com/ws1/stripe-pay?data="
// const BASE_URL = "https://uobc18i6v3.execute-api.eu-west-2.amazonaws.com/ws5/stripe-pay?data="
// const BASE_URL = "http://localhost:4004/dev/api/v1/saturn/stripe-pay?data=";


var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);

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

let payload = {
    "host": "example.com", //anything
    "order_id": randomOrderID,
    "provider": "FH", 
    "customer_id": "67214754", //anything
  // "merchant_id": "663207981",  // CP
    "merchant_id": "63155140",  // WS 663192400, 63155140 - AU
    "firstname": "test",
    "lastname": "Takeaway",
    "merchant_name": "Biryani kabab",
    "Amount": "30.00",    
    "AvsHouseNumber": "Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex",   
    "AvsPostcode": "HA27 8HJ",
    "flat": "12",
    "address1": "Stoke on",
    "address2": "trent",
    "email": "qatesting@testing.com",
    "RedirectUrl": "https://example.com/yosha",
    "WebhookUrl": "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net", 
    "CancelUrl": "https://example.com/cancel",
    "DbTotal": false,
    "Reference": "945alk2938laksdjflaksf", 
    "SuccessUrl": "https://example.com" 
}


console.log(BASE_URL + encryptRequest(JSON.stringify(payload)))
console.log(randomOrderID);
