#!/usr/bin/env node
//https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
const crypto = require('crypto');
const { execFile } = require('child_process');
const { faker } = require('@faker-js/faker'); // npm install @faker-js/faker  (JS Faker is already a ready-to-use instance, no Factory::create() needed)

// NOTE ON THIS CONVERSION: as with the last few scripts, every commented
// alternative below is valid, uncomment-and-run JS. `merchant_id`, `host`,
// `webhook_url`, `datmanHost`, `switchHost`, and `provider` are each
// declared once with a bare `let` above their own comment blocks, and the
// active value is always assigned FIRST, with every alternative positioned
// AFTER it — so uncommenting any single alternative always takes effect
// (a plain reassignment that runs after, and therefore overrides, the
// active line) instead of being silently overwritten by it. Object-literal
// alternatives (inside `payload` and `split_fee`) rely on JS's normal
// last-key-wins duplicate-key behavior, same as PHP arrays, so those are
// likewise positioned after their active key. Terminal-only output — no
// HTML file, no browser open — per your last preference.

// forming business related values
let merchant_id; // declared once here; every commented alternative below is positioned AFTER the active line, so uncommenting any single one correctly overrides it
merchant_id = 663212350; // 63169827
// merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// merchant_id = 63155480; // adyen - OMNICART
//  merchant_id = 663213439;
// merchant_id = 663208350;
// merchant_id = 663213572; // adyen BP
// merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663212494 - edining
// 663209873 - Edining Adyen
// 663212350 - FASTFOOD
// 663212983 - SmeBizness
// 663212985 - Ask4Dish
// 663212454 , 663208350- Quickchow
//  663214243 - GKSOFT
// 663214519 - appcompanion
// 663214585 - EASYEATS
/// 663215161 - Foodninja
// 1234667 - gksoft
// 663215805 - order2online
// - 663217451 - YPSOLUTIONS
// 663215188 - ask4dish
// 1234667
// 663226505 - orbititech
// 663215402 - orbit[not for sale]
// 663218428 - bookyup

const business_name = faker.company.name();

let host; // declared once so the alternate below is a safe plain reassignment that correctly overrides the active line
host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
// host = "https://" + business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";

const email = "rohit@datman.je"; //faker.internet.email();

let webhook_url; // declared once so the alternate below is a safe plain reassignment
webhook_url = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook?value1=12345&order_type=sale&splitID=923674&order_id=098765"; //faker.internet.url();
// webhook_url = "https://www.google.com";

const redirect_url = "https://google.com";
const cancel_url = "https://" + host + "/cancel";

let provider = null; // referenced only in a commented-out payload line below; never assigned in the PHP source either (the $provider variable it referenced was never declared there — PHP resolves an undefined variable to null, so this matches that: json_encode keeps "provider":null rather than JS silently dropping an undefined key)

// ---------------------------------------------------------------------------
// Small helpers standing in for PHP builtins used below
// ---------------------------------------------------------------------------
function numerify(pattern) {
  return pattern.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
}
function dateTimeThisMonth() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const t = start.getTime() + Math.random() * (now.getTime() - start.getTime());
  return new Date(t);
}
function formatDateTime(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
// Minimal PHP serialize() port — only needs to handle scalar/assoc-array
// shapes (strings, numbers, booleans, null) for payment_encrypt2() below.
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

const payload = {
    "host": host,
    "merchant_id": merchant_id,
    "order_id": faker.number.int({ min: 500000000, max: 599999999 }),
    // "order_id": "355b-6e0d-48c3-b9e9-439752b9b22",
    "customer_id": faker.number.int({ min: 500000000, max: 599999999 }),
    // "customer_id": 512867514, // adyen.  ED506826186- sandbox domain EE508481471
    // 537443785 - appcompanion
    // 593468736 - foodninja
    // 508169730 - order2online
    // 518078222 - YPSOLUTIONS
    // 3614647 - FF
    // "provider": provider,
    // 512867514 easyeats
    "email": email,
    "phone_number": numerify("07##########"),
    "name": business_name,
    "amount": 27.00,
    // "amount": faker.finance.amount({ min: 10, max: 50, dec: 2 }),
    "avs_house_number": '347',
    // "avs_house_number": faker.location.buildingNumber(),
    "avs_postcode": '92837',
    // "avs_postcode": faker.location.zipCode(),
    // "avs_postcode": 'NN17 8YG',
    "merchant_reference": numerify("MerchantReference##########"),
    "redirect_url": redirect_url,
    "cancel_url": cancel_url,
    "cash_payment_url": redirect_url,
    "webhook_url": webhook_url,
    // "customer_joining_date": formatDateTime(dateTimeThisMonth()),
    "first_name": faker.person.firstName(),
    "last_name": faker.person.lastName(),
    "flat": String(faker.number.int({ max: 99 })),
    "address1": faker.location.city(),
    "address2": faker.location.street(),
    // "txn_type": "Pre-Auth",
    // "source": "mobile-app",
    "back_url": cancel_url,
    "DbTotal": false,


    // "statement_descriptor": " ttttyunwdcoiwdckowihcnjnwbciowcwceohwjecbownbcwce 😭😂 ~!@#$%^&*()?{}()*:;?/\\|>                               ",
    // "statement_descriptor_address": " ✊🏿 Dymanic #@%@%@&@^@&@()() ~!@#$%^&*()?{}()*:;?/\\| Discriptor",

    // "source": "mobile-app",
    // "token_avs": "",
    // "token": "mxtoken_5e12fffa2e08d8ca7022aedb0f05a2e457a5e27937e7b6361dd01fa7d4aedcf2", // adyen OMNICART
    // "token": "mxtoken_772fcb53bd163ad1587ca850e55629a91462a6e4107796bd4abe852b43f98cb1", // adyen EDININGEXPRESS
    // "last4_digits": "0004", // spreedly
    // "token": "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen EDININGEXPRESS
    // "last4_digits": "0004", // spreedly
    // "last4_digits": "4242", // checkout/supper
    // "last4_digits": "0000", // adyen/dna
    // "last4_digits": "1111",
    // "last4_digits": "0821",
};



// 663215806 - order2online split
// 663217452 - YPSOLUTIONS split 1, 663217453 - YPSOLUTIONS split 2

const split_fee = [
    {
      "partner_merchant_id": 663218413,  // sandbox BP - US 663212986 - ask4dish //- 663214244- GKSOFT //  appcompanion - 663214520  // 663214586 - EASYEATS // FOODNINJA - 663215162
      "type_id": 1,
      "value": 5.00,
      "value_type": "amount"
    },
    {
      "partner_merchant_id": 663218408,  // sandbox BP - US
      // "partner_merchant_id": 663176007,
      "type_id": 2,
      "value": 1.50,
      "value_type": "amount"
    },
];

payload.split_fee = split_fee;

console.log(JSON.stringify(payload, null, 2));

const encryptedData = payment_encrypt2(payload); // computed but unused, as in the original — only EncryptNew(...) feeds the actual link below

let datmanHost; // declared once here so every commented alternative below is a safe plain reassignment
datmanHost = "https://ws7-payments.datmanpay.com";
// datmanHost = "https://sandbox-payments-edining.datmanpay.com";
// datmanHost = "https://sandbox-payments-fastfood.datmanpay.com";
// datmanHost = "https://sandbox-payments-smebizness.datmanpay.com";
// datmanHost = "https://sandbox-payments-quickchow.datmanpay.com";
// datmanHost = "https://sandbox-payments-gksoft.datmanpay.com";
// datmanHost = "https://sandbox-payments-appcompanion.datmanpay.com";
// datmanHost = "https://sandbox-payments-easyeats.datmanpay.com";
// datmanHost = "https://sandbox-payments-foodninja.datmanpay.com";
// datmanHost = "https://sandbox-payments-order2online.datmanpay.com";
// datmanHost = "https://sandbox-payments-ask4dish.datmanpay.com";
// datmanHost = "https://sandbox-payments-yps.datmanpay.com";
// datmanHost = "https://sandbox-payments-orbititech.datmanpay.com"; 
// datmanHost = "https://sandbox-payments.datmanpay.com";
// https://ws9-payments-edining.datmanpay.com

let switchHost; // declared for parity — $switchHost was never actively assigned in the PHP source either, only referenced in these two commented-out lines
// switchHost = 'https://ws3-payments.datmanpay.com/switch/api/v1';
// switchHost = 'https://ws6-payments.datmanpay.com/switch/api/v1';
const UranusGBPEndpoint = "";
const UranusEUREndpoint = "";
const UranusPhonePayment = "";
const UranusPhonePaymentWin = "";
const PlutoEndpoint = "";

// console.log(`<a href='${datmanHost}/barclays/phonePayment.php?data=${encryptedData}' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Available in production</i>`);
// console.log("<br>");
// console.log("<br>");
// console.log("<br>");
// console.log("<br>");
// console.log(`<a href='${datmanHost}/barclays/onlinePaymentV2.php?data=${encryptedData}' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Available in production</i>`);
// console.log("<br>");
// console.log("<br>");
// console.log(`<a href='${datmanHost}/barclays-irl/onlinePaymentV4.php?data=${encryptedData}' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Available in production</i>`);
// console.log("<br>");
// console.log("<br>");

const plutoLink = `${datmanHost}/opto/card.php?data=${EncryptNew(JSON.stringify(payload))}`;
console.log("\nOrder id: ", payload.order_id);
console.log(plutoLink);

// ---------------------------------------------------------------------------
// Convenience: VS Code's integrated terminal doesn't reliably make very long
// URLs clickable once they wrap across multiple lines (a known, unresolved
// VS Code limitation). Copy the link to the clipboard so you can just paste
// it into a browser instead of clicking. Best-effort and silently no-ops if
// the underlying OS command isn't available.
// ---------------------------------------------------------------------------
function copyToClipboard(text) {
  const platform = process.platform;
  let cmd, args;
  if (platform === 'darwin') { cmd = 'pbcopy'; args = []; }
  else if (platform === 'win32') { cmd = 'clip'; args = []; }
  else { cmd = 'xclip'; args = ['-selection', 'clipboard']; } // linux; falls back silently if xclip isn't installed
  try {
    const child = execFile(cmd, args, (err) => {
      if (!err) console.log('(link copied to clipboard — just paste it into your browser)');
    });
    child.stdin.on('error', () => {}); // swallow EPIPE if the process never started
    child.stdin.write(text);
    child.stdin.end();
  } catch (e) {
    // no clipboard tool available; ignore
  }
}
copyToClipboard(plutoLink);

// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj - FH
//xejPvqKFb50ZMBIN6dVN4Kzin6iymqlk - edining key
// noci1oPw7pKavuPWyqoHiB0RDxE62Y6A - quickchow
//lszOjEGjqUyMjggJUMvzYfELIUnTLWxFlqn
//tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf - Partners Stage key
// HdCl9F84zD8X595j2W3cgJOOs746jXjU - SmeBizness
// 9lY7eSvaKcsoZwc2qz47GIf9a9Cm1XtO - Ask4Dish
// PdCl9F84zD8X5p172W3cgJOOs746jXQm - GKSOFT
// fL1PlF7CS6s6jkXMj31FqIfAmzcKFiqc - appcompanion
// rCeO5yWRS7vh79to7hGeT6n9v8d2NPqk - EASYEATS
// yjulpQucf5qqIx7Ep1tKN76C5Nji3WqR - FOODNINJA
// dVTEP9mTLerN6nKi5o54QYBGXu58b7NG - fastfood
// zr92bu8dCCX4tf3HiquKC0d05L6ThBMi - order2online
// ddLbUhvWBqmUfl9U20mPVf3085ur5Gn4 - YPSOLUTIONS
// BDu1Kdex2fEJeUoVrl4o2HJUrQGjZ89T - orbit
// LV2DtjlqpPD2VMIEjA8K85HYM501r1uDcop - bookyup

//
// FIDELITY NOTE (payment_encrypt2): the original used mcrypt's
// MCRYPT_RIJNDAEL_256 in CBC mode — a 256-bit-BLOCK cipher, a different
// algorithm from AES (AES only standardized Rijndael's 128-bit block
// variant), so no mainstream crypto library — including Node's built-in
// `crypto` — implements it. mcrypt itself was also removed from PHP core as
// of 7.2. $encryptedData (this function's result) is never used anywhere
// else in the script — only EncryptNew(...) (below) feeds the actual
// link — so this port keeps the function callable (no crash) using
// AES-256-CBC as a documented stand-in cipher, rather than pretending to
// reproduce true Rijndael-256 ciphertext.
function payment_encrypt2(string, key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')    // e990fb4a156fd51d4f3fc04353b01fb1
// function payment_encrypt2(string, key = 'P6VRBHonS12Wsumz6Kpl4J1IuYXS59nO') // alternate default key from the PHP source — swap the value above if you need it, this line is informational only
{
  const serialized = phpSerialize(string);
  const keyMd5 = crypto.createHash('md5').update(key).digest(); // 16 bytes
  const ivMd5 = crypto.createHash('md5').update(keyMd5).digest(); // 16 bytes
  const aesKey = Buffer.concat([keyMd5, keyMd5]); // pad 16 -> 32 bytes for aes-256 stand-in
  const iv = ivMd5.subarray(0, 16);
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  const encrypted = Buffer.concat([cipher.update(serialized, 'utf8'), cipher.final()]);
  return encodeURIComponent(encrypted.toString('base64'));
}

function EncryptNew(textToEncrypt, secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', encryptionMethod = "aes-256-cbc")
{
  const iv = Buffer.from(secret.slice(0, 16), 'latin1');
  const key = normalizeKey(secret, 32);
  const cipher = crypto.createCipheriv(encryptionMethod, key, iv);
  // openssl_encrypt(..., 0, $iv) returns an already-base64 string (options=0
  // does not request raw output), then the original base64_encode()s that
  // string AGAIN. Both steps are preserved exactly below.
  let encryptedMessage = cipher.update(textToEncrypt, 'utf8', 'base64');
  encryptedMessage += cipher.final('base64');
  const base64EncryptedMessage = Buffer.from(encryptedMessage, 'utf8').toString('base64');
  return base64EncryptedMessage;
}


// 3ds token - 599486996 - mxtoken_6505c035b30226df3e1b18a0af7808aee8e5ff7c958ee160defe43f0daf8e3e3
// non 3ds token - 565841547 - mxtoken_e1ea0a4b52774ff8789c32893ae594284916ed4b548330b0d90f1b5fac2350c0