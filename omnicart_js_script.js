const crypto = require("node:crypto");

const BASE_URL = "https://ws2-payments.datmanpay.com/opto/card.php?data=";

let payload = {
  host: "sandbox.example.com",
  merchant_id: 63155480,
  order_id: "26778778678",
  customer_id: "CUST987645",
  email: "john.doe@example.com",
  phone_number: "+447911123456",
  name: "Adam's Kitchen",
  amount: "10.75",
  avs_house_number: "221B",
  avs_postcode: "NW16XE",
  merchant_reference: "REF123456",
  redirect_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
  webhook_url: "https://example.com/webhook",
  back_url: "https://example.com/back",
  first_name: "John",
  last_name: "Doe",
  flat: "12A",
  address1: "London",
  address2: "Baker Street",
  split_fee: [
    {
      partner_merchant_id: "63155480",
      type_id: "2",
      value: "1.50",
      value_type: "amount",
    },
    {
      partner_merchant_id: "63155480",
      type_id: "5",
      value: "1.00",
      value_type: "amount",
    },
  ],
};

let secret = "SKk0qDEIQxh6PjgSSheg0nYgE00ezwkj"; // Must be 32 bytes

function encryptPayload(data, secret) {
  const encryptionMethod = "aes-256-cbc";
  const key = Buffer.from(secret, "utf8");
  if (key.length !== 32) {
    throw new Error("Secret must be 32 bytes for AES-256 encryption");
  }

  const iv = key.slice(0, 16); // Use first 16 bytes as IV
  const cipher = crypto.createCipheriv(encryptionMethod, key, iv);
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  return Buffer.from(encrypted).toString("base64");
}

const encryptedPayload = encryptPayload(JSON.stringify(payload), secret);
const fullUrl = BASE_URL + encodeURIComponent(encryptedPayload);

console.log("Full URL:", fullUrl);
