const crypto = require('crypto');
var secret_key = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"
// const BASE_URL = "http://localhost:4102/dev/api/v1/phone-payment?data="

//const BASE_URL = "https://8c9hggc32k.execute-api.eu-west-1.amazonaws.com/nh1/api/v1/phone-payment/?data=";
//const BASE_URL = "https://5r1x30nlcl.execute-api.eu-west-1.amazonaws.com/test/api/v1/phone-payment/?data=";
const BASE_URL='https://p57j1mc4b4.execute-api.eu-west-2.amazonaws.com/ws1/api/v1/phone-payment/?data='

// const BASE_URL='https://q401eb08zj.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/phone-payment/?data='
// const BASE_URL = "https://q401eb08zj.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/phone-payment/?data=";
//const BASE_URL = "https://prw0mcf34h.execute-api.eu-west-1.amazonaws.com/stage/api/v1/phone-payment?data=";
// const BASE_URL = "https://xigzn8bjt3.execute-api.eu-west-1.amazonaws.com/dev/api/v1/phone-payment?data="

const encryptPayload = (data, secret) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};

var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log("OrderID: ", randomOrderID);
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2));
console.log("Amount: ", amountNum);


var payload = {
    "host": "example.com", //anything
    "order_id": randomOrderID, //valid order id belongs to T2S
    "provider": "FH", //T2S, FH
    "customer_id": "65789681", //anything
    "merchant_id": "663191524", //valid merchant id belongs to Datman
    "firstname": "qa",
    "lastname": "testing",
    // "merchant_name": "Biryani kabab",
    "Amount": "2.05",    
    "AvsHouseNumber": "^",   
    "MerchantReference": "SLCKUOIU39847DLKSJHF",
    "CashPaymentUrl": "https://www.google.com",
    "AvsPostcode": "NN17 8YG",
    "flat": "12",
    "address1": "Stok on",
    "address2": "trend",
    "email": "qatesting@testing.com",
    //   "TokenAvs": 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:2:"5";s:11:"AvsPostcode";s:6:"HA6 7HJ";}}', //optional (Applicable for Optomany only)
    //   "token": "egtoken_21050507CF36XL16PW69ZVR", //optional (Applicable for Optomany/EG)
    //   "last4Digits": "0821", //optional (Applicable for Optomany/EG)
    "RedirectUrl": "https://example.com/redirect", //optional (Applicable for EG only)
    "WebhookUrl": "https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net", //optional (Applicable for EG only)
    "CancelUrl": "https://example.com/cancel", //optional (Applicable for EG only)
    // "DbTotal": false, //optional` (Applicable for EG only)
    // "Reference": "945alk2938laksdjflaksf", //optional (Applicable for EG only)
    // "SuccessUrl": "https://example.com" //for stripe
}

console.log(BASE_URL + encryptPayload(JSON.stringify(payload), secret_key))