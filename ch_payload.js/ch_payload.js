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
  "host": "alphabets.com",
  "merchant_id": "63155140", //63169829, 663191808, 663191808, 63155140
  "order_id": "5457858678",
  "customer_id": "1343461",
  "provider": "FH",
  "email": "sundaresan@datman.je",
  "phoneNumber": "8677867878",
  "name": "XYZ Takeaway",
  "Amount": "15.00",
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
    "gateway": "googlepay",
    "instrumentToken": {
        "signature": "MEYCIQCGy5C3csDboNHYjYdnFQlyUMQ0vqhMQ6QEHsC/nahcfwIhANSe52fc2uAW8yrULH2NtP66i1feAzDfaONEug6YcRd9",
        "protocolVersion": "ECv1",
        "signedMessage": "{\"encryptedMessage\":\"FrptvchAs98qlVOznGVP+MdjyTt+Q0ckHydgYE5uv/lJaNb7VfGOFu5obQxFCzBry8zEmauvI1wmxgkbya29jptRz0aAIblEY56Dsop09L1lXxjYvQ68SQiuDqtZEUH8ExulgYLGq7z7TkUh95QTSpEapupn/LkzyiL1DOhCJSjGM5DaHp5k4zpRvme98GDjpmYks3WLJGH4LjGR2o13P0a+pVpmOhMeQ7j1cy2M4PYgknG6BBO4lkV8+7Jqvma06O1TqnTXsD94u2ZVwignMnGXd2f/KRzlYD8yM4TVPu2nkw+OSS5uBax9TfGe5A+EMuybI6uspqwllSF604ZfwHYw4DsB++E3XkSKe4odnaYhcjLj7+dixw0g8F3U6JEuBaG3aEPRfXqYndQ+/bo/2MEga23X8WW3X3cL2W1Vk7SpwpXABytK6QuV6WMPaijSLljqmOl1Ax8YI9zX/7qU2eKWvZZk+y1oY7TY3e46\",\"ephemeralPublicKey\":\"BPEsSAw4SeC+7Uo86GKfTumR5PP62cBfd1WqzAjdSsKam1GU1MfXuirtEwhvhAML2328fRZQ86SlyIyI86hGYi8\\u003d\",\"tag\":\"GlRuEpo0voy25GynzyZorYqDG53UUL5FPuWd3FEEmYI\\u003d\"}"
    }
  },
  split_fee: [
    {
        partner_merchant_id: "63169827",

        // type_id: One of the below number
        // 1 - Food/ Goods
        // 2 - Sales Tax/ Service Fee
        // 3 - Delivery Fee
        // 4 - Delivery Tip
        // 5 - Restaurant Tip
        type_id: 1,

        // value & value_type: 
        // It can be valid amount if value_type = 'AMOUNT'
        // Number between 0 - 100, if value_type = 'PERCENTAGE'
        value: 4.88,
        value_type: "AMOUNT"
    },
    {
      partner_merchant_id: "63155140",

      // type_id: One of the below number
      // 1 - Food/ Goods
      // 2 - Sales Tax/ Service Fee
      // 3 - Delivery Fee
      // 4 - Delivery Tip
      // 5 - Restaurant Tip
      type_id: 2,

      // value & value_type: 
      // It can be valid amount if value_type = 'AMOUNT'
      // Number between 0 - 100, if value_type = 'PERCENTAGE'
      value: 2.0,
      value_type: "PERCENTAGE"
  }
]
}

console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);