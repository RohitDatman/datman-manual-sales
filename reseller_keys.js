const crypto = require("node:crypto");

const BASE_URL = "https://sandbox-payments.datmanpay.com/opto/card.php?data=";
// const BASE_URL = "https://payments-quikchow.datmanpay.com/opto/card.php?data="

// 🔁 Generate random values
const randomOrderId = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit
const randomCustomerId = Math.floor(100000 + Math.random() * 900000); // CUST123456
const randomAmount = (Math.random() * (50 - 5) + 5).toFixed(2); // between 5.00 - 50.00

// $merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// $merchant_id = 63155480; // adyen - OMNICART
// $merchant_id = 663212350; 
// 663212494 // Quickchow
//  $merchant_id = 663213439;
// $merchant_id = 663212985;
// $merchant_id = 663213572; // adyen BP
// $merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663209873 - Edining Adyen
// 663212350 - FASTFOOD
// 663212983 - SmeBizness
// 663212985 - Ask4Dish
// 663212454 , 663208350- Quickchow
//  663214243 - GKSOFT
// 663214519 - appcompanion
// 663214585 - EASYEATS
/// 663215161 - Foodninja
// 663218428 - BOOKYUP.COM-LIMITED
// 663218421 - elegent
// 663235345 - datman-reseller prod

let payload = {
  host: "sandbox.example.com",
  merchant_id: 663218428,
  order_id: randomOrderId,
  // customer_id: randomCustomerId,
  customer_id: "734638389", // FF
    // customer_id: "251817", // QC AD383260
    // customer_id: "383260", // AD ED932926
// customer_id: "932926", // ED
  email: "john.doe@example.com",
  phone_number: "+447911123456",
  name: "Adam's Kitchen",
  amount: randomAmount,
  avs_house_number: "221B",
  avs_postcode: "NW16XE",
  merchant_reference: "REF123456",
  redirect_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
  webhook_url: "https://webhook.site/8701afdd-817f-4e23-af5f-6e77eb46ede0",
  back_url: "https://example.com/back",
  first_name: "John",
  last_name: "Doe",
  flat: "12A",
  address1: "London",
  address2: "Baker Street",
  token: "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d",
  last4_digits: "0004"
  
};
const split_fee = [
  {
    partner_merchant_id: 663218387,
    type_id: 1,
    value: 5.0,
    value_type: "amount",
  },
];

payload.split_fee = split_fee;

let secret = "c49c9da92868a080fe94019fd2a2c3e6"; // Must be 32 bytes

function encryptPayload(data, secret) {
  const encryptionMethod = "aes-256-cbc";
  const key = Buffer.from(secret, "utf8");

  if (key.length !== 32) {
    throw new Error("Secret must be 32 bytes for AES-256 encryption");
  }

  const iv = key.slice(0, 16);
  const cipher = crypto.createCipheriv(encryptionMethod, key, iv);

  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  return Buffer.from(encrypted).toString("base64");
}

const encryptedPayload = encryptPayload(JSON.stringify(payload), secret);

const fullUrl = BASE_URL + encodeURIComponent(encryptedPayload) + `&pub_key=pk_-YYr3ZRJaF-hekLvtcu1ARuj`;

console.log("Generated Values:");
console.log("order_id:", randomOrderId);
console.log("customer_id:", randomCustomerId);
console.log("amount:", randomAmount);

console.log("\nFull URL:", fullUrl);