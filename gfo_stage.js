const crypto = require("crypto");
let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"; //staging
// let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; // cpe2e

let encryptRequest = (data) => {
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(
    encryptionMethod,
    Buffer.from(secret),
    iv
  );
  let encrypted =
    encryptor.update(data, "utf8", "base64") + encryptor.final("base64");
  return Buffer(encrypted).toString("base64");
};

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, "base64").toString("ascii");
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (decryptData =
    decryptor.update(encryptedData, "base64", "utf8") +
    decryptor.final("utf8"));
};

var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log("OrderID: ", randomOrderID);
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2));
console.log("Amount: ", amountNum);

let gfo_payload = {
  host: "alphabets.com",
  merchant_id: "63169829", //63169829, 663191808, 663191808, 1234567
  order_id: '567896589076',
  customer_id: "928148689",
  provider: "FH",
  email: "qatesting@tesing.com",
  phoneNumber: "8677867878",
  name: "XYZ Takeaway",
  Amount: "15.78",
  AvsHouseNumber: "12",
  AvsPostcode: "AA11AA",
  MerchantReference: "LAKDSF29348LAKSDJF",
  RedirectUrl: "https://www.google.com",
  CancelUrl: "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  WebhookUrl: "https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net",
  customer_joining_date: "75757667",
  firstname: "qa",
  lastname: "tseting",
  flat: "flat",
  address1: "address 1",
  address2: "address 22",
  gatewayParameters: {
    gateway: "GFO",
    instrumentToken: {
      "signature": "MEQCIAeSbsDafWUGRUjS+gM4ytXHfTqIQ4MNeu1mkU9pqZWbAiByga6gqPnDGW2euVq3jVTrUSe4pqQvmURQSUPKdVpF+Q==",
      "protocolVersion": "ECv1",
      "signedMessage": "{\"encryptedMessage\":\"6PCdlF4ZPS3YYXEwm6j7RvthGrx6enL8TEgQIHY8hsZmK1GmO5tl9egO/Cqi7wRBTXTpPWquYWA3kTKlK46ofGthl0JV6fkaZubpN2O9nGswWbLxkHAF5dqMvmJyX1lqfWIiHfUIY7ZluxUktefzpBgG2oezbWaTtLvVQn/kQv+c1BuE4icgOaBKo+bmTxBFMr6MDiVLCjHTeW9/1G8Z7MIqmnSgfwbd33qf5CTeG02GNCitBU3GEb+Hr6Y43WPTNgdjJEC5RtldEnpfAKh2ZCrnvBlaDopvHArHEyKUALntq8rirvwqYPjxtRUB43iaHHo/Ay/7qFKMTo9gTZZc/ktkKt7jLxc7ddjwAsxk1s3eOjtOET1T/DD9Z13TQzM07HiM9rxKlnNZ6aqfNnmy/Uca4nNqfQYCI+RNPmZyFYP8d2RLQr1JJk/GBcYW3F/6849Ri/SKu36fiCDvP87y44cvLGrsL8Qn6qU/uzq7\",\"ephemeralPublicKey\":\"BGVgyHlKExBJmbfnFBCzf3NCgl0WIkjE7kRPewQIk0VW1+NtkF3i1iMLXHNHbwrHH/rM2YNxmJe7ymlxFUjrPI0\\u003d\",\"tag\":\"l3elvbbnQakBRCZN+8u1WX7IMqoS+NGp4S8UBzhfDXA\\u003d\"}"
    
    },
  },


SplitFee: [
  {
      partner_merchant_id: "1235000",

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
      value: 1.01,
      value_type: "amount"
  },
  {
    partner_merchant_id: "1234600",
    type_id: 3,
    value: 3.04,
    value_type: "amount"
}
]
};
console.log(`${encryptRequest(JSON.stringify(gfo_payload))}`);
