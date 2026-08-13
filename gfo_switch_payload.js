const crypto = require('crypto');
// let secret = 'tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf'; //staging 
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; // cpe2e

let encryptRequest = (data) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};

let decryptRequest = (encryptedData) => {
    encryptedData = Buffer.from(encryptedData, 'base64').toString('ascii');
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
    return (decryptData = decryptor.update(encryptedData, 'base64', 'utf8') + decryptor.final('utf8'));
};

var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ',randomOrderID)
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))
console.log('Amount: ',amountNum)

let gfo_payload = {
  "host": "alphabets.com",
  "merchant_id": "1235030",
  "order_id": "67589769",  //random number
  "customer_id": "65787887",
  "provider": "FH",
  "email": "qatesting@test.com",
  "phoneNumber":"8677867878",
  "name": "XYZ Takeaway",
  "Amount": "21.00",
  "AvsHouseNumber": "12",
  "AvsPostcode": "AA11AA",
  "MerchantReference": "LAKDSF29348LAKSDJF",
  "RedirectUrl": "https://www.google.com",
  "CancelUrl": "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  "WebhookUrl": "https://www.google.com",
  "customer_joining_date": "75757667",
  "firstname": "first name",
  "lastname": "last name",
  "flat": "flat",
  "address1": "address 1",
  "address2": "address 22",
  "gatewayParameters": {
    "gateway": "GFO",
    "instrumentToken":   
   
    
{
  "signature": "MEUCIFdxmvL/LeA5X2X+LePIYEF2bnLmIqMGfCwrn7EioIWhAiEA1qcT9bz+Bz0dhhRRU1F8kyLlcjsfpaigGx3cq4D4IbY=",
  "protocolVersion": "ECv1",
  "signedMessage": "{\"encryptedMessage\":\"s/IqH2QIhi1v4YuEKHkuYKtf2QVDVg1O/XuXiZnxcku/pmvBNf/ZL9/V3JxN6T+ns1HsC+IxTl1hmPYjWMbN8XYtbIZ9VOijWuL8GUyw45+h+UO74n6NMun8FpJ+mVIkRx7hDMEMXVzZG2M88rwiLsOrTjGSnndCcwV29xHKr3Yz4pi0gJYEv2FNpdlkjg+2bbKm4rOoNrVfl1xoDCrLEqqYE/2vaifR5GJH+Ya49g1d6CorZ72j2nhdceGdr4DjF02BHWb7Kk2K0cMFDbnaBq7l+cyMQgLDZWVoDso33ZJMM4S9wHHfGPI+6Z460J7GBYMEAm+moC16GXfYmBCE/tBQ6AV7j1LEGtfbCLnSQhto+k/zsGPQAkTN0tOV942TQTu2K+UVwipzHwn6XzAepRN2qvf+VzzFD18i/12jzyyvqLpEyr6M8rLsHqGAC3L3I3jo+aY10iKvahTPkH2GI44K6UzrzZMoLt+4AmZ3","ephemeralPublicKey":"BBZFuGXLXWUFbB3G9GIuhyOX6B9QKRb+RNQdzmYbyRuEo/Y98wKQ37zdy+6qB8x4XSptWkD1s7tqGgEWBN9cx5Q\\u003d","tag":"scBjmVYUySfSKO2pqLCd4qkI5is1Gg1ektTEEXAZBeQ\\u003d"}
}

    //instrumentToken value should be generated from the google_adyen_token PHP script
    
    
    
  }
// }

console.log(`${encryptRequest(JSON.stringify(gfo_payload))}`);