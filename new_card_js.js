const { faker } = require('@faker-js/faker');
const crypto = require('crypto');

// import CryptoJS from 'crypto-js';

// ------------------- Business Values -------------------

const merchant_id = 1235000; // checkout
const provider = "FH";

const business_name = faker.company.name();
const host = business_name.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase() + ".com";

const email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site";
const webhookUrl = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook";

const RedirectUrl = "https://google.com";
const CancelUrl = `https://${host}/cancel`;

// ------------------- Payload -------------------

const payload = {
  host,
  merchant_id,
  order_id: faker.number.int({ min: 500000000, max: 599999999 }),
  customer_id: "11548667",
  provider,
  email: "rohit@datman.je",
  phoneNumber: faker.phone.number('07##########'),
  name: business_name,
  AvsHouseNumber: "3",
  Amount: "25.32",
  AvsPostcode: "NN17 8YG",
  MerchantReference: faker.string.numeric(10),
  RedirectUrl,
  CancelUrl,
  WebhookUrl: webhookUrl,
  customer_joining_date: faker.date.recent().toISOString().slice(0, 19).replace('T', ' '),
  firstname: "Rohit",
  lastname: "M",
  flat: "3",
  address1: faker.location.city(),
  address2: faker.location.street(),
  backurl: "https://www.google.com/search?q=hello",
//   token: "mxtoken_k7sJpYts2LAdnhB0covGxRYuBm_yNZEe",
  last4Digits: "0821",
};

const SplitFee = [
  {
    partner_merchant_id: 663208111,
    type_id: 8,
    value: 1,
    value_type: "amount"
  }
];

payload.SplitFee = SplitFee;

// ------------------- Encryptions -------------------

const SECRET = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj";

function payment_encrypt2(data) {
  const key = crypto
    .createHash('md5')
    .update(SECRET)
    .digest('hex')
    .repeat(2)
    .substring(0, 32);

  const iv = crypto
    .createHash('md5')
    .update(crypto.createHash('md5').update(SECRET).digest('hex'))
    .digest()
    .subarray(0, 16);

  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encodeURIComponent(encrypted);
}


function EncryptNew(text) {
  const key = Buffer.from(SECRET);
  const iv = Buffer.from(SECRET.substring(0, 16));

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  return Buffer.from(encrypted).toString("base64");
}


// ------------------- Output -------------------

console.log("\nPayload:\n", payload);

const encryptedOldData = payment_encrypt2(payload);
const encryptedData = EncryptNew(JSON.stringify(payload));

const datmanHost = "https://ws6-payments.datmanpay.com";
const switchHost = "https://payments.datmanpay.com/switch/api/v1";

console.log("\nOld Encryption URL:");
console.log(`${datmanHost}/opto/card.php?data=${encryptedOldData}`);

console.log("\nNew Encryption URL:");
console.log(`${datmanHost}/opto/card.php?data=${encryptedData}`);

console.log("\nCardstream Phone Payment:");
console.log(`${switchHost}/phone-payment/?data=${EncryptNew(JSON.stringify(payload))}`);
