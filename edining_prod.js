#!/usr/bin/env node
/**
 * generatePaymentLink.js
 *
 * Node.js port of the original PHP test-link generator.
 * Original required: composer require fzaninotto/faker
 * This version requires: npm install @faker-js/faker
 *
 * Usage:
 *   npm install @faker-js/faker
 *   node generatePaymentLink.js
 *
 * Each run regenerates fresh fake customer/business data (like reloading the
 * PHP page) and writes the resulting HTML (with the two clickable test links)
 * to ./output.html, which you can open directly in a browser. The two link
 * URLs are also printed to the console.
 */

'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

// ---------------------------------------------------------------------------
// Small helpers standing in for PHP builtins used in the original script
// ---------------------------------------------------------------------------

// Faker PHP's numerify(): replaces '#' with a random digit 0-9.
function numerify(pattern) {
  return pattern.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
}

// Faker PHP's dateTimeThisMonth(): a random datetime between the start of
// the current month and now.
function dateTimeThisMonth() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const t = start.getTime() + Math.random() * (now.getTime() - start.getTime());
  return new Date(t);
}

// PHP's date('Y-m-d H:i:s', ...) equivalent.
function formatDateTime(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// Minimal PHP serialize() port — only needs to handle the scalar/assoc-array
// shape of $payload (strings, numbers, null). Used only by payment_encrypt2()
// below, kept for fidelity with the original code path.
function phpSerialize(value) {
  if (value === null || value === undefined) return 'N;';
  if (typeof value === 'boolean') return `b:${value ? 1 : 0};`;
  if (typeof value === 'number') {
    return Number.isInteger(value) ? `i:${value};` : `d:${value};`;
  }
  if (typeof value === 'string') {
    return `s:${Buffer.byteLength(value, 'utf8')}:"${value}";`;
  }
  if (Array.isArray(value)) {
    const parts = value.map((v, i) => phpSerialize(i) + phpSerialize(v));
    return `a:${value.length}:{${parts.join('')}}`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    const parts = entries.map(([k, v]) => phpSerialize(k) + phpSerialize(v));
    return `a:${entries.length}:{${parts.join('')}}`;
  }
  throw new Error(`phpSerialize: unsupported type ${typeof value}`);
}

// PHP's openssl_encrypt()/AES key handling: if the key is shorter than the
// cipher needs it is silently NUL-padded; if longer, silently truncated.
function normalizeKey(secret, byteLength) {
  const buf = Buffer.from(secret, 'latin1');
  if (buf.length === byteLength) return buf;
  if (buf.length > byteLength) return buf.subarray(0, byteLength);
  return Buffer.concat([buf, Buffer.alloc(byteLength - buf.length)]);
}

// ---------------------------------------------------------------------------
// Direct port of EncryptNew() — this IS the function actually used to build
// both links in the original script, so it's ported exactly, quirks and all.
// ---------------------------------------------------------------------------


// Encryption key reference (unchanged):
// V1FlCFiRR3silQbDWdotklr9Eg23L1  pre prod edining
// 4z5cdtCnPUm0nLxFECOg84Oo0T4aOJ  pre prod fastfood
// OL8tSk888oBxTj2Pa6Hbk2H3pIDU3l  prod key for fastfood
// nAi1GujLvxh23hqkUw4NMmud51OhT1 - quikchow
// 3MHXLUlQ1FkwR1MKqpKnNkRJH6Z373 - gkpay
// ia76TjkIQ5NNErDocYI895iG0Dqwli - ask4dish
// 3GwU9myRBMO2avZq9ysxhNS3tTtSvo - ORBITITECH
// cDugfbBrvFW4X2Dvpxa5hJoot82d8j - appcompanion
// Is1FlCFiRR3simumDWdotklr9Eg2Sk - FH
// Lj4iM8B5Crd622R0MF6ES4xG0u9MCiLp - easyeats
// b69c82b7d3579aea272a5671ff5d9f38 - datman reseller and public key: pk_KRIMpbsMedR_w4Q6Vw4Mgvq_


function EncryptNew(textToEncrypt, secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', encryptionMethod = 'aes-256-cbc') {
  const iv = Buffer.from(secret.slice(0, 16), 'latin1'); // substr($secret, 0, 16)
  const key = normalizeKey(secret, 32); // AES-256-CBC needs a 32-byte key

  const cipher = crypto.createCipheriv(encryptionMethod, key, iv);

  // PHP's openssl_encrypt($text, $method, $secret, 0, $iv) with the default
  // $options=0 flag returns an ALREADY base64-encoded string (that's what
  // "0" means — raw output is NOT requested). We replicate that here by
  // asking the cipher to emit base64 directly.
  let encryptedMessage = cipher.update(textToEncrypt, 'utf8', 'base64');
  encryptedMessage += cipher.final('base64');

  // The original code then calls base64_encode() AGAIN on that already-
  // base64 string. This looks like a bug but is preserved exactly, because
  // whatever receives this URL on the datmanpay/gateway side expects this
  // exact double-encoded format.
  return Buffer.from(encryptedMessage, 'utf8').toString('base64');
}

// ---------------------------------------------------------------------------
// Port of payment_encrypt2() — NOTE ON FIDELITY:
//
// The original PHP used mcrypt's MCRYPT_RIJNDAEL_256 in CBC mode. Two things
// make this impossible to reproduce byte-for-byte in Node (or in any modern
// PHP, honestly):
//   1) "Rijndael-256" refers to a 256-bit BLOCK size, which is a different
//      cipher from AES (AES standardized only the 128-bit block variant of
//      Rijndael). No mainstream crypto library — including Node's built-in
//      `crypto` module — implements the 256-bit-block variant, because it
//      was never standardized as AES.
//   2) The `mcrypt` PHP extension itself was removed from PHP core as of
//      PHP 7.2 (2018), so this exact function likely already doesn't run
//      unmodified on any current PHP install either.
//
// Crucially, $encryptedData (this function's return value) is never used
// anywhere else in the original script — only $encryptNewData (from
// EncryptNew, above) feeds the two links that actually get clicked. So this
// port keeps the function callable (no crash), matches the input/output
// shape (serialize -> encrypt -> base64/urlencode), but swaps in AES-256-CBC
// as a documented stand-in cipher rather than pretending to match Rijndael-
// 256 ciphertext exactly. If you actually need real Rijndael-256 output,
// say so and it can be wired up via the `rijndael-js` npm package instead.
// ---------------------------------------------------------------------------
function payment_encrypt2(value, key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk') {
  const serialized = phpSerialize(value);

  // mcrypt_encrypt(..., md5($key), ..., MCRYPT_MODE_CBC, md5(md5($key)))
  // used md5($key) as the key material and md5(md5($key)) as the IV source.
  const keyMd5 = crypto.createHash('md5').update(key).digest(); // 16 bytes
  const ivMd5 = crypto.createHash('md5').update(keyMd5).digest(); // 16 bytes
  const aesKey = Buffer.concat([keyMd5, keyMd5]); // pad 16 -> 32 bytes for aes-256 stand-in
  const iv = ivMd5.subarray(0, 16);

  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);

  return encodeURIComponent(encrypted.toString('base64'));
}

// ---------------------------------------------------------------------------
// Business payload
// ---------------------------------------------------------------------------

// ----- Merchant ID reference (unchanged from original, none of these are
// wired up automatically — swap $merchant_id manually as needed) -----------
// 663226638
const merchant_id = '663227491';
// * 63181447  - Cardstream
// * 663207711 - cardstream Ireland
// * 663195603 - cardstream-ch us New UI
// * 663195604 - cardstream-ch au
// * 663195606 - checkout-hf
// * 663209575 - adyen di uk
// * 663206519 - O2M prod Adyen,
// * 663197155 - CS CH UK
// * 111111 - Paysafe
// * 663190047 - CS CH US old UI
// * 663195603 - Spreedly checkout mid
// * 663223832 - edining
// * 663226647 - prod new mid for edining
// * 663227491 - prod fastfood mid Adyen UK
// * 663223832 - quickchow
// 663231532
// 663227724 - Orbititech
// 663231532 - GK soft
// 663230353 - ask4dish [do not use for prod]
// 663231912 - appcompanion
// 663233732 - orbititech
// 663236814 - easyeats
// 663223242 - easyeats


function buildPayload() {
  // NOTE: `provider` was never assigned in the original PHP either (the
  // `$provider = "QC";` line is commented out), so PHP would use an
  // undefined variable there, which resolves to null. Kept as `null` here to
  // match how json_encode($payload) would have rendered it.
  const provider = null;

  const business_name = faker.company.name();
  const host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.com';
  const webhookUrl = 'https://webhook.site/f901fe99-ab1f-42ba-a8aa-7d551db64421'; // faker.internet.url();
  const RedirectUrl = 'https://www.google.com/';
  const CancelUrl = `https://${host}/cancel?simple=1&bSuccess&id=330831810&transaction=66643`;

  const payload = {
    host,
    merchant_id,
    order_id: faker.number.int({ min: 500000, max: 599999 }),
    // customer_id: "804910973", // UK Adyen
    // customer_id: "80491090",  // US Adyen
    // customer_id: "19034037",  // edining cid
    // customer_id: "11898560",  // fastfood CID
    // customer_id: "19426895",  // orbittech CID
    // customer_id: "10594235",  // ask4dish CID QC17673831
    // customer_id: "17673831",  // quikchow CID
    // customer_id: "12008584",  // easyeats CID
    customer_id: faker.number.int({ min: 10000000, max: 19999999 }),
    provider,
    email: 'rohit@datman.je',
    phone_number: numerify('07##########'),
    name: business_name,
    amount: '5.38', // faker.finance.amount(10, 50, 2),
    avs_house_number: '7', // faker.location.buildingNumber(),
    avs_postcode: 'NN178YG', // faker.location.zipCode(),
    MerchantReference: numerify('MerchantReference##########'),
    redirect_url: RedirectUrl,
    cancel_url: CancelUrl,
    webhook_url: webhookUrl,
    back_url: CancelUrl,
    customer_joining_date: formatDateTime(dateTimeThisMonth()),
    first_name: faker.person.firstName(), // new field
    last_name: faker.person.lastName(), // new field
    flat: String(faker.number.int({ min: 0, max: 99 })), // new field
    address1: faker.location.city(), // new field
    address2: faker.location.street(), // new field
    // txnType: "WALLET_RECHARGE_AGAINST_ORDER",
    // overrideChecks: { forceThreeDSecure: "true", challengeIndicator: "true" },
    TokenAvs: 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', // optional (Optomany only)
    // token: 'mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473', // edining token
    // last4Digits: "6935",

    // statement_descriptor: "EASY",
    // statement_descriptor_address: "EATS",

    // token: 'mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473', // fastfood token
    // last4Digits: "6935",
    // source: "mobile-app",
    // mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c - cs token
    // mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea - adyen token
    // mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473 - cs-ch token

    // metadata: { description: "testing description" },
  };

  return payload;
}

// split_fee reference block — built but never attached to payload in the
// original (the `$payload['split_fee'] = $split_fee;` line is commented
// out), kept here for parity/reference only.
const split_fee = [
  {
    partner_merchant_id: 663223636,
    type_id: 1,
    value: 0.2,
    value_type: 'amount',
  },
  // { partner_merchant_id: 663209575, type_id: 2, value: 0.09, value_type: 'amount' },
  // { partner_merchant_id: 663209575, type_id: 2, value: 0.01, value_type: 'amount' },
  // { partner_merchant_id: 663209575, type_id: 3, value: 0.03, value_type: 'amount' },
  // { partner_merchant_id: 663209575, type_id: 4, value: 0.05, value_type: 'amount' },
  // { partner_merchant_id: 663209575, type_id: 5, value: 0.06, value_type: 'amount' },
];
// payload.split_fee = split_fee; // left disabled, matching the original

// ---------------------------------------------------------------------------
// Host selection (unchanged reference list — only one line is "active")
// ---------------------------------------------------------------------------
// const datmanHost = "https://ws4.datmanpay.com";
// const datmanHost = "https://payments-edining.datmanpay.com"; // edining prod
// const datmanHost = 'https://payments-fastfood.datmanpay.com'; // fastfood prod
// const datmanHost = "https://payments-quikchow.datmanpay.com"; // quickchow prod
// const datmanHost = "https://payments-gk-pay.datmanpay.com"; // gkpay prod
// const datmanHost = "https://payments-ask4dish.datmanpay.com";
// const datmanHost = "https://payments-orbititech.datmanpay.com";
// const datmanHost = "https://payments-appcompanion.datmanpay.com";
const datmanHost = "https://datmanpay.com";



// const datmanHost = "https://payments-edining-b.datmanpay.com"; // pre-prod edining
// const datmanHost = "https://payments-fastfood-b.datmanpay.com"; // pre-prod fastfood
// const datmanHost = "https://payments-appcompanion-b.datmanpay.com";
// const datmanHost = "https://payments-easyeats.datmanpay.com"; // quikchow pre prod
// const datmanHost = "https://b.datmanpay.com"; // preprod

const switchHost = 'https://payments.datmanpay.com/switch/api/v1';

// Encryption key reference (unchanged):
// V1FlCFiRR3silQbDWdotklr9Eg23L1  pre prod edining
// 4z5cdtCnPUm0nLxFECOg84Oo0T4aOJ  pre prod fastfood
// OL8tSk888oBxTj2Pa6Hbk2H3pIDU3l  prod key for fastfood
// nAi1GujLvxh23hqkUw4NMmud51OhT1 - quikchow
// 3MHXLUlQ1FkwR1MKqpKnNkRJH6Z373 - gkpay
// ia76TjkIQ5NNErDocYI895iG0Dqwli - ask4dish
// 3GwU9myRBMO2avZq9ysxhNS3tTtSvo - ORBITITECH
// cDugfbBrvFW4X2Dvpxa5hJoot82d8j - appcompanion
// Is1FlCFiRR3simumDWdotklr9Eg2Sk - FH
// Lj4iM8B5Crd622R0MF6ES4xG0u9MCiLp - easyeats

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const payload = buildPayload();

  // Kept for parity with the original (result unused downstream — see the
  // fidelity note on payment_encrypt2 above).
  const encryptedData = payment_encrypt2(payload);
  const encryptNewData = EncryptNew(JSON.stringify(payload));

  const newEncryptionLink = `${datmanHost}/opto/card.php?data=${encryptNewData}`;
  const phonePaymentLink = `${switchHost}/phone-payment/?data=${EncryptNew(JSON.stringify(payload))}`;

  const html = `<pre>${JSON.stringify(payload, null, 2)}</pre>
<a href="${newEncryptionLink}" target="_blank">New encryption</a> - <i style="color:red">Not in production yet</i>
<br>
`;

  const outPath = path.join(__dirname, 'output.html');
  fs.writeFileSync(outPath, html, 'utf8');

  console.log('Payload:');
  console.log(JSON.stringify(payload, null, 2));
  console.log('\nNew encryption link:');
  console.log(newEncryptionLink);
  console.log(`\nHTML written to: ${outPath}`);
}

main();