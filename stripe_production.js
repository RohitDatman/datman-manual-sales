const crypto = require("crypto");

let secret = "ytyf3Ex2dV=3@#eQL7UgcWvNk^w*+L5h";

// https://stripe-b.datmancrm.com/v1/stripe-pay?data=
// "https://stripe.datmancrm.com/v1/stripe-pay?data="
const BASE_URL = "https://stripe.datmancrm.com/v1/stripe-pay?data=";

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
console.log("------", randomOrderID);
var amountNum = Math.floor(10 + Math.random() * 20);
var amount = amountNum + 0.01;
console.log("------", amount);
let payload = {
  host: "example.com", //anything
  order_id: randomOrderID,
  provider: "FH", //T2S, FH
  customer_id: "80491037", //anything
  merchant_id: "63155140", //valid merchant id belongs to Datman
  firstname: "字体😊✅👌😒🦺😘😂❤️☺️😊😭😩💕😔😏😁😎🎶🚀test",
  lastname: "字体😊✅👌😒🦺😘😂❤️☺️😊😭😩💕😔😏😁😎🎶🚀test",
  merchant_name: "Biryani kabab",
  Amount: 1.00,
  AvsHouseNumber: "Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex",
  AvsPostcode: "HA27 8HJ",
  flat: "12",
  address1: "Stok on",
  address2: "trend",
  email: "sundaresan@datman.je",
  RedirectUrl: "https://google.com",
  WebhookUrl: "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook?name=datman%20testing&text=hello%3Ddatman%3B%203345",
  CancelUrl: "https://example.com/failure",
  DbTotal: false, //optional` (Applicable for EG only)
  Reference: "945alk2938laksdjflaksf",
  SuccessUrl: "https://example.com",
};

console.log(BASE_URL + encryptRequest(JSON.stringify(payload)));
