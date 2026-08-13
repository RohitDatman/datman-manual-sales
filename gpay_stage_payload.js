const crypto = require('crypto');
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; //staging
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
  "host": "alphabets.com",
  "merchant_id": "1235000", 
  "order_id": "54678572",
  "customer_id": "5675788112",
  "provider": "FH",
  "email": "qa_testing@testing.com",
  "phoneNumber": "8677867878",
  "name": "XYZ Takeaway",
  "Amount": "31.23",
  "AvsHouseNumber": "12",
  "AvsPostcode": "AA11AA",
  "MerchantReference": "LAKDSF29348LAKSDJF",
  "RedirectUrl": "https://www.google.com",
  "CancelUrl": "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  "WebhookUrl": "https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net",
  "customer_joining_date": "75757667",
  "firstname": "first name",
  "lastname": "last name",
  "flat": "flat",
  "address1": "address 1",
  "address2": "address 22",
  // "txnType"  : "WALLET_RECHARGE_AGAINST_ORDER",
  "gatewayParameters": {
    "gateway": "googlepay",
    "instrumentToken": 
    {
      "signature": "MEYCIQCGy5C3csDboNHYjYdnFQlyUMQ0vqhMQ6QEHsC/nahcfwIhANSe52fc2uAW8yrULH2NtP66i1feAzDfaONEug6YcRd9",
      "protocolVersion": "ECv1",
      "signedMessage": "{\"encryptedMessage\":\"FrptvchAs98qlVOznGVP+MdjyTt+Q0ckHydgYE5uv/lJaNb7VfGOFu5obQxFCzBry8zEmauvI1wmxgkbya29jptRz0aAIblEY56Dsop09L1lXxjYvQ68SQiuDqtZEUH8ExulgYLGq7z7TkUh95QTSpEapupn/LkzyiL1DOhCJSjGM5DaHp5k4zpRvme98GDjpmYks3WLJGH4LjGR2o13P0a+pVpmOhMeQ7j1cy2M4PYgknG6BBO4lkV8+7Jqvma06O1TqnTXsD94u2ZVwignMnGXd2f/KRzlYD8yM4TVPu2nkw+OSS5uBax9TfGe5A+EMuybI6uspqwllSF604ZfwHYw4DsB++E3XkSKe4odnaYhcjLj7+dixw0g8F3U6JEuBaG3aEPRfXqYndQ+/bo/2MEga23X8WW3X3cL2W1Vk7SpwpXABytK6QuV6WMPaijSLljqmOl1Ax8YI9zX/7qU2eKWvZZk+y1oY7TY3e46\",\"ephemeralPublicKey\":\"BPEsSAw4SeC+7Uo86GKfTumR5PP62cBfd1WqzAjdSsKam1GU1MfXuirtEwhvhAML2328fRZQ86SlyIyI86hGYi8\\u003d\",\"tag\":\"GlRuEpo0voy25GynzyZorYqDG53UUL5FPuWd3FEEmYI\\u003d\"}"
  }




  // {
  //   "signature": "MEUCIDh2XC2JkWin0Q2m1LscxyV7Npi4Zya1NHfxKIvIGpSyAiEAptOZxmMVqlU5woyAbxEsTJQtMliowfpXahOexOCwadM=",
  //   "protocolVersion": "ECv1",
  //   "signedMessage": "{\"encryptedMessage\":\"/pB8D/S09L9JypSoOS7qWZNtOqhA6YT8Bp3JWa0kzggY0Bq0n4Vh5wth4O9v2bcpdSvqtj3BCDuZZxE0Fv6hSRxpSBMeT2QTM3Oy3wxWkTji8RXdKQX5W7oriAgIxCtTY7z1UtqWx5DGx0Sijexr2udG+jRLdrzioCMSckWSFwPal+NR5q02Fj1AtgH7VQGxb77hc4EbInWuR9gsjqaMXgCuz0BOJiLSAeLHouNn0WBtKwO5hKYN6z4ramtqVQrrSvFqNLdICuqxGbXq7mhLKCaqz9wb6jRc3W4qn7OhZamWcL+HOr/AkSfikzKBGS70GPClI/SSHMVArXbHcrxijGOiVL8eX/nmq3IyW+ru3k9e/GAuRNnABtTjQ0scArxwYWduQRV/kn3U5RlMsOZTH80JcJZRTQQy0jY+ytc9JG/mEdobzlL1cUotGYXkOEXqHoLezJpucxiTrCPNpNL6z9+F5U8oIMNlpz+sMvk\\u003d\",\"ephemeralPublicKey\":\"BOdTEucQhpNqcJ3d+4g/BzXvQs2LqvquIlf1cBgobzszwytkzfAIVAGH7ySIYZDdqi1KMyHUURrQ6oNs8kD3mY8\\u003d\",\"tag\":\"SlHP+BKZ7i7XAyOHo3ZPl1xklFuRbzS8FU5/TWYn1JM\\u003d\"}"
  // },

  },
  // "txnType"  : "WALLET_RECHARGE_AGAINST_ORDER",
  SplitFee: [
    {
        partner_merchant_id: "1235000",
        type_id: 3,
        value: 0.50,
        value_type: "amount"
    },
    {
      partner_merchant_id: "1235000",
      type_id: 4,
      value: 1,
      value_type: "percentage"
  }
    
]
}

console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);