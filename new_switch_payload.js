const crypto = require('crypto');
var secret_key = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"
const BASE_URL = "https://6fd45pa8m2.execute-api.eu-west-1.amazonaws.com/stage/api/v1/switch/switch?data="

const encryptPayload = (data, secret) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};


var payload = {
    "host": "example.com", //anything
    "order_id": "294482156", //valid order id belongs to T2S
    "provider": "FH", //T2S, FH
    "customer_id": "31837", //anything
    "merchant_id": "63155140", //valid merchant id belongs to Datman
    "firstname": "Adi",
    "lastname": "Takeaway",
    "merchant_name": "Biryani kabab",
    "Amount": "13.00",    
    "AvsHouseNumber": "Unit 5 Pickwick Walk 120 Uxbridge Road Hatch End Middlesex",   
    "AvsPostcode": "HA6 7HJ",
    "flat": "12",
    "address1": "Stok on",
    "address2": "trend",
    "email": "ishika@mypay.co.uk",
    //   "TokenAvs": 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:2:"5";s:11:"AvsPostcode";s:6:"HA6 7HJ";}}', //optional (Applicable for Optomany only)
    //   "token": "egtoken_21050507CF36XL16PW69ZVR", //optional (Applicable for Optomany/EG)
    //   "last4Digits": "0821", //optional (Applicable for Optomany/EG)
    "RedirectUrl": "https://example.com/redirect", //optional (Applicable for EG only)
    "WebhookUrl": "https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net", //optional (Applicable for EG only)
    "CancelUrl": "https://example.com/cancel", //optional (Applicable for EG only)
    "DbTotal": false, //optional` (Applicable for EG only)
    "Reference": "945alk2938laksdjflaksf", //optional (Applicable for EG only)
    "SuccessUrl": "https://example.com" //for stripe
}

console.log(BASE_URL + encryptPayload(JSON.stringify(payload), secret_key))
