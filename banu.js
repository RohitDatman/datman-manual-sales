import { faker } from '@faker-js/faker';
import crypto from 'crypto';

// -----------------------------
// CONFIG
// -----------------------------
const merchant_id = 663215609;
const email = "sundaresan@datman.je";
const webhook_url = "https://webhook.site/f1fcc5f0-61b8-42e9-bdf6-1e43f336f1ae";
const redirect_url = "https://google.com";

// -----------------------------
// Faker Data
// -----------------------------
const business_name = faker.company.name();

const host = business_name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '') + ".com";

const cancel_url = `https://${host}/cancel`;

// -----------------------------
// Payload
// -----------------------------
const payload = {
  host,
  merchant_id,
  order_id: faker.number.int({ min: 500000000, max: 599999999 }),
  customer_id: faker.number.int({ min: 500000000, max: 599999999 }),
  email,
  phone_number: faker.string.numeric(12, { allowLeadingZeros: true }),
  name: business_name,
  amount: 15.00,
  avs_house_number: '347',
  avs_postcode: '92837',
  merchant_reference: `MerchantReference${faker.string.numeric(10)}`,
  redirect_url,
  cancel_url,
  cash_payment_url: redirect_url,
  webhook_url,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  flat: String(faker.number.int({ min: 10, max: 99 })),
  address1: faker.location.city(),
  address2: faker.location.street(),
  back_url: cancel_url,
  DbTotal: false
};

// -----------------------------
// Split Fee
// -----------------------------
payload.split_fee = [
  {
    partner_merchant_id: 663215806,
    type_id: 1,
    value: 5.00,
    value_type: "amount"
  }
];

// -----------------------------
// OLD Encryption (mcrypt style)
// ⚠️ Deprecated (Node doesn't support mcrypt natively)
// -----------------------------
function payment_encrypt2(data, key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') {
  const serialized = JSON.stringify(data);

  const iv = crypto.createHash('md5').update(
    crypto.createHash('md5').update(key).digest('hex')
  ).digest();

  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    crypto.createHash('md5').update(key).digest(),
    iv
  );

  let encrypted = cipher.update(serialized, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encodeURIComponent(encrypted);
}

// -----------------------------
// NEW Encryption (same as PHP EncryptNew)
// -----------------------------
function encryptNew(text, secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') {
  const iv = Buffer.from(secret.substring(0, 16));
  const key = Buffer.from(secret.padEnd(32, '\0')).slice(0, 32);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return Buffer.from(encrypted).toString('base64');
}

// -----------------------------
// OUTPUT
// -----------------------------
console.log("Payload:\n", payload);

const encryptedData = encryptNew(JSON.stringify(payload));

const datmanHost = "https://ws7.datmanpay.com";

// Pluto link
const plutoUrl = `${datmanHost}/opto/card.php?data=${encryptedData}`;

console.log("\nPluto URL:\n", plutoUrl);