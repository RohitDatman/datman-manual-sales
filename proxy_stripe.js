const crypto = require('crypto');

// let secret = "r7aAzmPkU!=jJUr@Q%$dXznMLRfFuJFR";
//let secret = 'ytyf3Ex2dV=3@#eQL7UgcWvNk^w*+L5h'
 let secret =  "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"

//const BASE_URL = "https://lojyi3bpw3.execute-api.eu-west-1.amazonaws.com/dev/stripe-pay?data="
// const BASE_URL = "https://w8hqv96x41.execute-api.eu-west-1.amazonaws.com/sandbox/api/v1/saturn/stripe-pay?data="


const BASE_URL = 'https://ws6-stripe.datmancrm.com/v1/stripe-pay?data='

//local
const NEW_CARD_SALE= "http://localhost:4004/dev/api/v1/saturn/new-card-sale?data="



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

console.log('decryptRequest',decryptRequest);

var order_id = JSON.stringify(Math.floor(100000000 + Math.random() * 900000000));

let payload = {
    "host": "example.com", //anything
    "order_id": order_id, //valid order id belongs to T2S  320011336
    "provider": "FH",
    // "fj869()",
    // "FH", //T2S, FH
    "customer_id":  "28322212222", //anything
    "merchant_id":  "663207587", //valid merchant id belongs to Datman
    "first_name":  "qa",
    "last_name": "testing",
    "merchant_name": "my own business",
    "total": "18",    
    "AvsHouseNumber":  "Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex",   
    "AvsPostcode": "4",
    "flat": "",
    "address_line1": "1",
    "address_line2": "4",
    "address":"4",
    "email": "nayan+new28sep03@datman.je",
    "cc_token": "mxtoken_c8125bee6221addf336a8420ec70c0fd22", //optional (Applicable for Optomany/EG)
    "last_four_digits":  "j78*(",
    // "1234", //optional (Applicable for Optomany/EG)
    "redirect_url": "https://example.com/nayan", //optional (Applicable for EG only)
    "webhook_url": " ", //optional (Applicable for EG only)
    "cancel_url": "https://example.com/cancel", //optional (Applicable for EG only)
    "DbTotal": false,
    // false, //optional` (Applicable for EG only)
    "Reference": "945alk2938laksdjflaksf", //optional (Applicable for EG only)
    "SuccessUrl": "gjhjh866$@@!"
    // "https://example.com/succcess" //for stripe
}

console.log(encryptRequest(JSON.stringify(payload)));


// console.log(NEW_CARD_SALE + encryptRequest(JSON.stringify(payload)))