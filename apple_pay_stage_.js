const crypto = require('crypto');
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; //staging
// let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; // cpe2e
//let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr';
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
  "order_id": "56787868",
  "Amount": 5,
  "host": "alphabets.com",
  "merchant_id": 1235000,
  "firstname": "anil",
  "lastname": "Testing",
  "flat": "",
  "address1": "Victoria Park Road",
  "address2": "Stoke",
  "email": "qatesting@testing.com",
  "phoneNumber": "07868774307",
  "customer_joining_date": "2020-09-23 22:04:43",
  "customer_id": "72391934",
  "provider": "FH",
  "name": "qa",
  "AvsHouseNumber": "12",
  "AvsPostcode": "ST6 6DX",
  "MerchantReference": "",
  "CancelUrl": "https://www.google.com",
  "WebhookUrl": "https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net",
  "RedirectUrl": "https://www.example.com/",
  "gatewayParameters": {
      "instrumentToken": {
          "version": "EC_v1",
          "data": "iDEg0o2XcwT2A41TOBTJiLHZ0RS8BrvODDAJwbOfnyd8D2q2/iC2d9VoVWJBPZyxP+p4CcnlVRhQcTMGfxj0oBKQXtsRTfcQMCR/5J9FX/JBnj6rnuxyPnUrzCLHWPB5IyKrE+30ppObdkqV366We198OqEjmGCplqbOY+O6lgIbvFUPUGW0knk2D2dE7e6jwV2nmSvKpQRfHlCO2Rrui8x9zHMU5HtCEO5wJ08rl9UGFQ16RxauPPZmiME02+nlIyGR9DyGT21s78q3dS7pQopth0HPCvzdOH4aVX6GjclxHfaanmHvoN0fGBRJkWUPWPazEPXYQQSk7J8qWtzPfpT6HKx+dXQCuzv03mQQMN/nNBe6Y1kkg4vxfxDlvYhN7Ure8Cc4Z6FabgjP",
          "signature": "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",
          "header": {
              "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvNHBAIc9CjA3x+daQScBR6q/64WBUic7BuYkL9iYOpi55YJGJg9d+JZ/JHTpCvh2wCzPX73+LgJTZB7zjIbOfA==",
              "publicKeyHash": "7elEfreONGuCJZPoCX/0Ne/xb4g0bKyemQvEB3DfxbY=",
              "transactionId": "164caa9b99ba4de54aa0f0ef39b63489c7272b8c3fa61320fbb007d7c992ff85"
          }
      },
      "gateway": "applepay"
  },



SplitFee: [
    {
      partner_merchant_id: "1234600",
      type_id: 3,
      value: 0.50,
      value_type: "amount"
    }
  ]
}

console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);