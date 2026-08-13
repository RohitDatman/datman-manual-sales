const crypto = require('crypto');
let secret = 'dfp8LUXCkqhtKB5AwxFXXNLewf3xzUMj';

let BASE_URL='https://nd-3624-google-pay-and-apple-pay-checkout.dw62m7utw2a83.amplifyapp.com/earth/?data='




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
console.log('OrderID: ', randomOrderID)
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))
console.log('Amount: ', amountNum)

let token_pay_payload = {
  "order_id": "8777678",
  "Amount": 0.10,
  "host": "adi.sy2.com",
  "merchant_id": 63153688,
  "firstname": "Selva",
  "lastname": "Maharajan",
  "flat": "",
  "address1": "Victoria Park Road",
  "address2": "Stoke-on-Trent",
  "email": "selvamariappan.m@touch2success.com",
  "phoneNumber": "07868774307",
  "customer_joining_date": "2020-09-23 22:04:43",
  "customer_id": "72391934",
  "provider": "FH",
  "name": "Adi Test UK",
  "AvsHouseNumber": "12",
  "AvsPostcode": "ST6 6DX",
  "MerchantReference": "",
  "CancelUrl": "https://order.foodhub.co.uk/payment.php?simple=1&do=cancel&id=729738704",
  "WebhookUrl": "https://api-preprod.t2sonline.com/hook/confirm?id=729738704&amount=1.21",
  "RedirectUrl": "https://order.foodhub.co.uk/payment.php?simple=1&bSuccess&id=729738704",
  "gatewayParameters": {
    "gateway": "googlepay",
    "instrumentToken": {
        "signature": "MEYCIQCGy5C3csDboNHYjYdnFQlyUMQ0vqhMQ6QEHsC/nahcfwIhANSe52fc2uAW8yrULH2NtP66i1feAzDfaONEug6YcRd9",
        "protocolVersion": "ECv1",
        "signedMessage": "{\"encryptedMessage\":\"FrptvchAs98qlVOznGVP+MdjyTt+Q0ckHydgYE5uv/lJaNb7VfGOFu5obQxFCzBry8zEmauvI1wmxgkbya29jptRz0aAIblEY56Dsop09L1lXxjYvQ68SQiuDqtZEUH8ExulgYLGq7z7TkUh95QTSpEapupn/LkzyiL1DOhCJSjGM5DaHp5k4zpRvme98GDjpmYks3WLJGH4LjGR2o13P0a+pVpmOhMeQ7j1cy2M4PYgknG6BBO4lkV8+7Jqvma06O1TqnTXsD94u2ZVwignMnGXd2f/KRzlYD8yM4TVPu2nkw+OSS5uBax9TfGe5A+EMuybI6uspqwllSF604ZfwHYw4DsB++E3XkSKe4odnaYhcjLj7+dixw0g8F3U6JEuBaG3aEPRfXqYndQ+/bo/2MEga23X8WW3X3cL2W1Vk7SpwpXABytK6QuV6WMPaijSLljqmOl1Ax8YI9zX/7qU2eKWvZZk+y1oY7TY3e46\",\"ephemeralPublicKey\":\"BPEsSAw4SeC+7Uo86GKfTumR5PP62cBfd1WqzAjdSsKam1GU1MfXuirtEwhvhAML2328fRZQ86SlyIyI86hGYi8\\u003d\",\"tag\":\"GlRuEpo0voy25GynzyZorYqDG53UUL5FPuWd3FEEmYI\\u003d\"}"
    }
  }
}

console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);