const crypto = require("crypto");
const { faker } = require("@faker-js/faker");

const merchant_id = 1234667;

const business_name = faker.company.name();
const host = business_name.replace(/[^A-Za-z0-9]+/g, "").toLowerCase() + ".com";

const email = "rohit@datman.je";
const webhook_url =
  "https://webhook.site/f1fcc5f0-61b8-42e9-bdf6-1e43f336f1ae";
const redirect_url = "https://google.com";
const cancel_url = `https://${host}/cancel`;

const payload = {
  host: host,
  merchant_id: merchant_id,
  order_id: faker.number.int({ min: 500000000, max: 599999999 }),
  customer_id: faker.number.int({ min: 500000000, max: 599999999 }),
  email: email,
  phone_number: "07" + faker.string.numeric(10),
  name: business_name,
  amount: 27.0,
  avs_house_number: "347",
  avs_postcode: "92837",
  merchant_reference: "MerchantReference" + faker.string.numeric(10),
  redirect_url: redirect_url,
  cancel_url: cancel_url,
  cash_payment_url: redirect_url,
  webhook_url: webhook_url,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  flat: faker.number.int({ min: 10, max: 99 }).toString(),
  address1: faker.location.city(),
  address2: faker.location.street(),
  back_url: cancel_url,
  DbTotal: false,
};

const split_fee = [
  {
    partner_merchant_id: 663215162,
    type_id: 1,
    value: 5.0,
    value_type: "amount",
  },
];

payload.split_fee = split_fee;

console.log("Payload:\n", payload);

const datmanHost = "https://ws3.datmanpay.com";
const switchHost = "https://ws3-payments.datmanpay.com/switch/api/v1";

const encryptedOld = payment_encrypt2(payload);
const encryptedNew = EncryptNew(JSON.stringify(payload));

console.log("\nPluto URL:");
console.log(`${datmanHost}/opto/card.php?data=${encodeURIComponent(encryptedNew)}`);

function payment_encrypt2(data, key = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj") {
  const serialized = JSON.stringify(data);

  const hashedKey = crypto.createHash("md5").update(key).digest();
  const iv = crypto
    .createHash("md5")
    .update(
      crypto.createHash("md5").update(key).digest("hex")
    )
    .digest();

  const cipher = crypto.createCipheriv("aes-256-cbc", padKey(hashedKey), iv);

  let encrypted = cipher.update(serialized, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encodeURIComponent(encrypted);
}

function EncryptNew(
  textToEncrypt,
  secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"
) {
  const iv = secret.substring(0, 16);

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    Buffer.from(iv)
  );

  let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
  encrypted += cipher.final("base64");

  return Buffer.from(encrypted).toString("base64");
}

function padKey(key) {
  const buffer = Buffer.alloc(32);
  key.copy(buffer);
  return buffer;
}