#!/usr/bin/env node
//https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
const crypto = require('crypto');
const { execFile } = require('child_process');
const { faker } = require('@faker-js/faker'); // npm install @faker-js/faker  (JS Faker is already a ready-to-use instance, no Factory::create() needed)

// NOTE ON THIS CONVERSION: as with the last few scripts, every commented
// alternative below is valid, uncomment-and-run JS. `merchant_id`,
// `datmanHost`, `switchHost`, and `payment_encrypt2Key` are each declared
// once with a bare `let`, with the active value assigned FIRST and every
// alternative positioned AFTER it — so uncommenting any single alternative
// always takes effect (it's a plain reassignment that runs after, and
// therefore overrides, the active line) instead of being silently
// overwritten by it. Object-literal alternatives (inside `payload` and
// `SplitFee`) rely on JS's normal last-key-wins duplicate-key behavior,
// same as PHP arrays, so those are likewise positioned after their active
// key. Terminal-only output — no HTML file, no browser open — per your
// standing preference.

//forming business related values
let merchant_id; // declared once here; every commented alternative below is positioned AFTER the active line, so uncommenting any single one correctly overrides it
merchant_id = "663232982";
//  merchant_id = "663197155"; // cs
// merchant_id = 663195606;
//  merchant_id = 663227683; //adyen  us store id enabled
//  merchant_id = 663209575; // Adyen UK
// merchant_id = 663194535; // Cashflow
// merchant_id = 63191145; // CS-CH us
// checkout-hf - 663195606
// cardstream - 663197155
// adyen-hf - 663190774
// cs-ch usa
// "63191145";
// 663232982 Spreedly [do not make sale]

const provider = "FH";
const business_name = faker.company.name();
const host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
const email = faker.internet.email();
const webhookUrl = "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net";
const RedirectUrl = "https://" + host + "/success";
const CancelUrl = "https://" + host + "/cancel";
const CashPaymentUrl = "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiio7TVir30AhWQwzgGHTCADqYQ_AUoAnoECAEQBA&biw=1226&bih=689&dpr=2";

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
    "order_id": faker.number.int({ min: 500000, max: 599999 }),
    "customer_id": faker.number.int({ min: 10000000, max: 19999999 }),
    // "customer_id": 80491037,
    "provider": provider,
    "email": "rohit@datman.je", //faker.internet.email()
    "phoneNumber": numerify("07##########"),
    "name": business_name,
    "Amount": "1.00", //faker.finance.amount({ min: 10, max: 49, dec: 2 })
    "AvsHouseNumber": faker.location.buildingNumber(),
    "AvsPostcode": "ST57TF", //faker.location.zipCode()
    "MerchantReference": numerify("MerchantReference##########"),
    "RedirectUrl": RedirectUrl,
    "CancelUrl": CancelUrl,
    "backurl": "https://www.google.com/",
    "WebhookUrl": webhookUrl,
    "customer_joining_date": formatDateTime(dateTimeThisMonth()),
    "firstname": "Rohit", //faker.person.firstName()
    "lastname": "testing", //faker.person.lastName()
    "flat": "10", //faker.number.int({ max: 99 })
    "address1": faker.location.city(),
    "address2": faker.location.street(),
    // "address1": "Flat 6",
    // "address2": "AA11AA",
    "CashPaymentUrl": CashPaymentUrl,
    "txnType": "CREATE_MIT_TOKEN",

    // "TokenAvs": 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}',
    // "token": "", //optional (Applicable for Optomany/EG)
    // "last4Digits": "2718",
    // "metadata": { "description": "testing description" }, // collapsed to one line (PHP source had this as an unquoted-key, multi-line array literal) so this single line is safely uncommentable on its own
};

const SplitFee = [
  {
    "partner_merchant_id": 63181447,
    "type_id": 6,
    "value": 0.50,
    "value_type": "amount"
  }
];
// payload.SplitFee = SplitFee;

console.log(JSON.stringify(payload, null, 2));

let payment_encrypt2Key; // declared once here so the PROD alternative below is a safe plain reassignment that correctly overrides the active line
payment_encrypt2Key = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h'; 
// pre-prod EAHoxLsA9GD8yUR1H3N7H8Dcw8IreEwg
// payment_encrypt2Key = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h'; // PROD
const encryptedData = payment_encrypt2(payload); // computed but unused, as in the original — only EncryptNew(...) below feeds the actual link

//https:/payments-b.datmanpay.com/switch/api/v1
let datmanHost; // declared for parity with the PHP source's $datmanHost, which is never actually used downstream (only $switchHost feeds the active link), same as in the original
datmanHost = "http://datmanpay.com";
let switchHost; // declared once here so every commented alternative below is a safe plain reassignment
switchHost = "https:/payments.datmanpay.com/switch/api/v1"; // NOTE: single slash after "https:" — preserved exactly as in the PHP source, likely a typo but left as-is
// switchHost = "https:/payments.datmanpay.com/switch/api/v1";
//https:/payments-b.datmanpay.com/switch/api/v1
// EAHoxLsA9GD8yUR1H3N7H8Dcw8IreEwg - Pre prod token
// wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h - prod token

const UranusGBPEndpoint = "";
const UranusEUREndpoint = "";
const UranusPhonePayment = "";
const UranusPhonePaymentWin = "";
const PlutoEndpoint = "";

const phonePaymentLink = `${switchHost}/phone-payment/?data=${EncryptNew(JSON.stringify(payload))}`;
console.log("\nCardstream phone payment link (Not in production yet):");
console.log(phonePaymentLink);

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
copyToClipboard(phonePaymentLink);

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
function payment_encrypt2(string, key = payment_encrypt2Key)
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

function EncryptNew(textToEncrypt, secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h', encryptionMethod = "aes-256-cbc")
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