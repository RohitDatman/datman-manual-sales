const crypto = require('crypto');

// let secret = "r7aAzmPkU!=jJUr@Q%$dXznMLRfFuJFR";
//let secret = 'ytyf3Ex2dV=3@#eQL7UgcWvNk^w*+L5h'
 let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"

//const BASE_URL = "https://lojyi3bpw3.execute-api.eu-west-1.amazonaws.com/dev/stripe-pay?data="
const BASE_URL = "https://ws3-stripe.datmancrm.com/v1/stripe-pay?data="



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
    "order_id": Math.floor(100000000 + Math.random() * 900000000), //valid order id belongs to T2S  320011336
    "provider": "FH", //T2S, FH
    "customer_id": "962888", //anything
    "merchant_id": "663207587", //valid merchant id belongs to Datman
    "firstname": "Adi",
    "lastname": "Takeaway",
    "merchant_name": "Biryani kabab",
    "Amount": "14.00",    
    "AvsHouseNumber": "Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex",   
    "AvsPostcode": "HA27 8HJ",
    "flat": "12",
    "address1": "Stok on",
    "address2": "trend",
    "email": "ishika@mypay.co.uk",
    "token": "", //optional (Applicable for Optomany/EG)
    "last4Digits": "", //optional (Applicable for Optomany/EG)
    "RedirectUrl": "https://example.com/yosha", //optional (Applicable for EG only)
    "WebhookUrl": "https://webhook.site/63487f84-b103-47da-9fd0-e1d17de7202f", //optional (Applicable for EG only)
    "CancelUrl": "https://example.com/cancel", //optional (Applicable for EG only)
    "DbTotal": false, //optional` (Applicable for EG only)
    "Reference": "945alk2938laksdjflaksf", //optional (Applicable for EG only)
    "SuccessUrl": "https://example.com" //for stripe
}

console.log("Order id: ", payload.order_id)
console.log(BASE_URL + encryptRequest(JSON.stringify(payload)))




