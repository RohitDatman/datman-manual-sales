#!/usr/bin/env node
//https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
const crypto = require('crypto');
const { execFile } = require('child_process');
const { faker } = require('@faker-js/faker'); // npm install @faker-js/faker  (JS Faker is already a ready-to-use instance, no Factory::create() needed)

// NOTE ON THIS CONVERSION — please read before uncommenting things:
//
// 1) The original PHP wrote `$merchant_id = <lots of comments> "value";` as
//    ONE statement spread across ~150 lines — every commented candidate was
//    just a bare `"id"; //note` fragment with no variable name, relying on
//    PHP skipping comments until it hit the first real value. That trick
//    has no line-by-line "uncomment this one line" equivalent, so below each
//    candidate has been rewritten as its own `merchant_id = "id"; //note`
//    statement. `merchant_id` is declared once with a bare `let` above all
//    of them so uncommenting any single line — before or after the active
//    one — just works (no "already declared" or temporal-dead-zone error).
// 2) The original PHP's "customer_id" field had NO active value at all —
//    every single candidate under it was commented out, including the
//    final `$faker->numberBetween(...)` fallback. That's actually a PHP
//    parse error as pasted (an array literal can't go straight from one
//    `=>` to another with nothing in between). I've activated that final
//    faker fallback so the script actually runs; every other candidate is
//    preserved as a safe, uncommentable alternative below the active line.
// 3) Both output links ("New encryption" and "Cardstream phone payment")
//    were active in this source (unlike the last script), so both are
//    generated below.

//forming business related values
let merchant_id; // declared once here so every commented alternative below (before or after the active line) is a safe plain reassignment
// merchant_id = "663195603"; //Cardstream-UK
// cs ch aus
// merchant_id = "663195604";

// merchant_id = "663209957";

// merchant_id = "663194535"; // cs new mid [only 1 test sale]

// merchant_id = "663159021";

// merchant_id = "63181447";

// cs ch usa non o2m mid

// merchant_id = "663159021";

// cs ch us o2m mid

// merchant_id = "63191145";

// cs prod mid

  merchant_id = "63181447";
// merchant_id = "663234350";

//cs cashflow mid
// merchant_id = 663194535;

// adyen di uk new ui

// merchant_id = "663209575";

// Adyen US store enabled prod MID
// merchant_id = "663227683";

// Adyen us new mid
// merchant_id = "663226538";
// merchant_id = 663197155;
// Adyen us moto-mid
// merchant_id = "663227683";

// Adyen nz adyen merge=0 new mid
// merchant_id = "663225555";

// Adyen nz adyen merge=1 new mid
// merchant_id = "663223242";

// checkout UK prod

// merchant_id = "663195606";

// CS ch uk
// merchant_id = "663197155";

// cs-ch usa
// merchant_id = "63191145";

// Checkout new mid for prod testing
// merchant_id = "663195606";

// adyen usa merchant id

// merchant_id = "663206519";

// Spreedly
// merchant_id = "663195603";
// merchant_id = "663228092";
// merchant_id = 663212837; // Spreedly checkout.com

// merchant_id = 663230927;

// merchant_id = "663210143";
// merchant_id = "663209505";

// merchant_id = "663218609";



// checkout hf mid

// merchant_id = "663195606";

// merchant_id = "663195603";

// Stripe
// merchant_id = "63155140";

// merchant_id = "663195603";

// merchant_id = "663195604";

// merchant_id = "663209575";

// pay safe mid
// merchant_id = "111111";

// Paystack
// merchant_id = "663161429";


// merchant_id = "63181447";

// merchant_id = "663195603";

// adyen pay fac mid

// merchant_id = "663209575";

// adyen usa mid

// merchant_id = "663206519";

// merchant_id = "663214163";

// merchant_id = "663195603";


// merchant_id = "663195604";

// merchant_id = "663224074";

// * 663194940 - Adyen UK
// * 663207711 - cardstream Ireland
// * 663195603 - cardstream-ch us
// * 663195604 - cardstream-ch au
// * 663195606 - checkout-hf


const provider = "FH";
const business_name = faker.company.name();
const host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
const email = faker.internet.email(); // declared but unused elsewhere — matches the PHP source, which never referenced $email again either
let webhookUrl = "https://api-webhook.touch2success.com/hook/confirm?id=1195089959&amount=1.00"; //faker.internet.url();
// webhookUrl = "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook?name=datman%20testing&text=hello%3Ddatman%3B%203345";
const RedirectUrl = "https://www.google.com";
const CancelUrl = "https://" + host + "/cancel";
let CashPaymentUrl; // referenced only in a commented-out payload line below; never assigned in the PHP source either — declared so uncommenting that line doesn't throw

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

const payload = {
  // "source": "mobile-app",
  "host": host,
  "merchant_id": merchant_id,
  "order_id":
  // "hgbhhgn", // see the order_id override note after the payload object below
  faker.number.int({ min: 500000, max: 5999999 }),
  "customer_id": faker.number.int({ min: 10000000, max: 19999999 }), // this was the last (also-commented) fallback in the PHP source — activated so the script actually runs; see note #2 at the top of this file

  // "customer_id": "80491045",
//  adyen uk shopper id
  // "customer_id": "80491048",
  // "customer_id": "804910923",
  // "customer_id": "804910912", // adyen uk new
  // "customer_id": "80491040",
  // "customer_id": "80491039", // new working Cid


  // adyen shopper id
  // "customer_id": "80491050",

  "customer_id": "80491037",  // checkout,cs-ch prod ci

  // "customer_id": "17007603", // cs shopper id

  //adyen usa shopper id
  // "customer_id": "80491072",

  //Adyen NZ cid
  // "customer_id": "15871889",


  // "customer_id": "80491043",
  "provider": provider,
  "email": "banu@datman.je",
  "phoneNumber": numerify("07##########"),
  "name": business_name,
  "Amount": "1.00",//faker.finance.amount({ min: 10, max: 50, dec: 2 }),
  "AvsHouseNumber": "Flat 6",//faker.location.buildingNumber(),
  "AvsPostcode": "NN178YG",//faker.location.zipCode(),
  "MerchantReference": numerify("MerchantReference##########"),
  "RedirectUrl": RedirectUrl,
  "CancelUrl": CancelUrl,
  "WebhookUrl": webhookUrl,
  "backurl": "https://www.google.com/",
  "customer_joining_date": formatDateTime(dateTimeThisMonth()),
  "firstname": "Rohit&#^#&#&*🤣", //new field
  "lastname": "M@U#🤣", //new field
  "flat": String(faker.number.int({ max: 99 })), //new field
  "address1": faker.location.city(), //new field
  "address2": faker.location.street(), //new field,
//   "captureDelayHours": "1",
//  "authorisation_type": "PreAuth",
//   "txnType": "WALLET_RECHARGE_AGAINST_ORDER",
  // "txnType": "CREATE_MIT_TOKEN",
  // "TokenAvs": 'a:1:{i:0;a:2:{s:14:"AvsHouseNumber";s:6:"London";s:11:"AvsPostcode";s:8:"ST66DX";}}', //optional (Applicable for Optomany only)
  // "CashPaymentUrl": CashPaymentUrl,



  // cs prod token for 80491037

  // "token": "mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",
  // "last4Digits": "5005"

  // 5262 card
  //   "token": "mxtoken_7c61dc13c7ddec87f278fb822659a3c4df691a5a5064cc3ad7b41a6591622223",
  // "last4Digits": "5262"

  // adyen master token
  // "token": "mxtoken_d55cd935e89667141ec877533b6718560becbe187e58a09025c971570ebe0cea",
  // "last4Digits": "5005"

  // "mxtoken_OGr4durMmjyIN7ypKr4r5zkj_tI1sinU",
  // 5005 card

  //  "token": "mxtoken_89fe688d9411202f549c3aa2240df682874a5f664624684eb5c7eb5edf61f27c",  //cs prod token for 80491037

  // // // // // // // //  cs ch master token
  // // // // // // // "mxtoken_142c523573d2ff8e57d7bf8c2802b37e", //optional (Applicable for Optomany/EG)

  //Checkout master token
  // "token": "mxtoken_4fdb28f8302b77f98355b0ab1ee70e1729a58f744041c4e73e3991f4fd9ee2e2",
  // "last4Digits": "6935"

  // "token": "mxtoken_0eb6c8a872a57cb0db56d97bfe53ce03112e49af7a8ebb9e04767078909a7473",
  // "last4Digits": "6935",


  // // cs master token
  // "token": "mxtoken_e59888042daebaef34b15aklfaflq5a9464154ae91feb239aa4a82938436c3la",
  // "last4Digits": "6935",

  //  "token": "mxtoken_P7Xie3RqDmaEH7_b-AM0qghiw2J0kKYz",   // Spreedly token
  // "last4Digits": "6935"

    // "statement_descriptor": "Nitish Dynamic",
    // "statement_descriptor_address": "Discriptor",

//       "metadata": {
//         "description": "testing description"
//       },
enhanced_scheme_data: {
    // customer_reference and order_date are not accepted from the caller - both are
    // derived/handled server-side (see data-model.md's 2026-09-09 note)
    total_tax_amount: 3.00,               // major units (£3.00), not pence
    freight_amount: 1.50,
    duty_amount: 0,
    destination_postal_code: "NN17 8YH", // match your AvsPostcode above if it's the same address
    destination_country_code: "GB",
    ship_from_postal_code: "M1 1AE",
    items: [
      {
        description: "Margherita Pizza",
        product_code: "FOOD-001",
        commodity_code: "5411",
        quantity: 2,
        unit_of_measure: "EA",
        unit_price: 12.21,     // major units
        total_amount: 24.00
      },
      {
        description: "Margherita Pizza",
        product_code: "FOOD-001",
        commodity_code: "5411",
        quantity: 2,
        unit_of_measure: "EA",
        unit_price: 12.21,     // major units
        discount_amount: 0,
        tax_amount: 0,
        total_amount: 24.00
      },
      {
        description: "Margherita Pizza",
        product_code: "FOOD-001",
        commodity_code: "5411",
        quantity: 2,
        unit_of_measure: "EA",
        unit_price: 12.21,     // major units
        discount_amount: 0,
        tax_amount: 0,
        total_amount: 24.00
      }
    ]
  }

};

// order_id scratch override — in the original PHP, `// "hgbhhgn",` sat as an
// unkeyed array element mixed into the "order_id" line. That would NOT have
// overridden order_id if uncommented (it just adds a spurious extra
// numeric-indexed array element) — moved here as a real override instead:
// payload.order_id = "hgbhhgn";

const SplitFee = [
  {
    "partner_merchant_id": 63181447,
    "type_id": 8,
    "value": 0.51,
    "value_type": "amount"
  },
  {
    "partner_merchant_id": 663209575,     //,663206519
    "type_id": 3,
    "value": 0.05,
    "value_type": "amount"
  },
];
payload.SplitFee = SplitFee;

console.log(JSON.stringify(payload, null, 2));

const encryptedData = payment_encrypt2(payload);
const encryptNewData = EncryptNew(JSON.stringify(payload));

let datmanHost; // declared once here so every commented alternative below is a safe plain reassignment
// datmanHost = "https://b.datmanpay.com";// pre prod

datmanHost = "https://datmanpay.com";

// datmanHost = "https://dr-payments.datmanpay.com";

// datmanHost = "https://dr.datmanpay.com";// dr encrionment prod

const switchHost = 'https://payments.datmanpay.com/switch/api/v1';
const UranusGBPEndpoint = "";
const UranusEUREndpoint = "";
const UranusPhonePayment = "";
const UranusPhonePaymentWin = "";
const PlutoEndpoint = "";

const newEncryptionLink = `${datmanHost}/opto/card.php?data=${encryptNewData}`;
const phonePaymentLink = `${switchHost}/phone-payment/?data=${EncryptNew(JSON.stringify(payload))}`;

console.log("\nNew encryption link:");
console.log(newEncryptionLink);

// ---------------------------------------------------------------------------
// Convenience: VS Code's integrated terminal doesn't reliably make very long
// URLs clickable once they wrap across multiple lines (a known, unresolved
// VS Code limitation). Copy the "New encryption" link to the clipboard so
// you can just paste it into a browser instead of clicking. Best-effort and
// silently no-ops if the underlying OS command isn't available.
// ---------------------------------------------------------------------------
function copyToClipboard(text) {
  const platform = process.platform;
  let cmd, args;
  if (platform === 'darwin') { cmd = 'pbcopy'; args = []; }
  else if (platform === 'win32') { cmd = 'clip'; args = []; }
  else { cmd = 'xclip'; args = ['-selection', 'clipboard']; } // linux; falls back silently if xclip isn't installed
  try {
    const child = execFile(cmd, args, (err) => {
      if (!err) console.log('(New encryption link copied to clipboard — just paste it into your browser)');
    });
    child.stdin.on('error', () => {}); // swallow EPIPE if the process never started
    child.stdin.write(text);
    child.stdin.end();
  } catch (e) {
    // no clipboard tool available; ignore
  }
}

copyToClipboard(newEncryptionLink);

// ---------------------------------------------------------------------------
// FIDELITY NOTE (payment_encrypt2): the original used mcrypt's
// MCRYPT_RIJNDAEL_256 in CBC mode. That's a 256-bit-BLOCK cipher, a
// different algorithm from AES (AES only standardized Rijndael's 128-bit
// block variant), so no mainstream crypto library — including Node's
// built-in `crypto` — implements it. mcrypt itself was also removed from
// PHP core as of 7.2. $encryptedData (this function's result) is never used
// anywhere else in the script — only $encryptNewData (from EncryptNew,
// below) feeds the actual links — so this port keeps the function callable
// (no crash) using AES-256-CBC as a documented stand-in cipher, rather than
// pretending to reproduce true Rijndael-256 ciphertext.
// ---------------------------------------------------------------------------
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

function payment_encrypt2(string, key = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk')
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

// PHP's openssl_encrypt()/AES key handling: if the key is shorter than the
// cipher needs it is silently NUL-padded; if longer, silently truncated.
function normalizeKey(secret, byteLength) {
  const buf = Buffer.from(secret, 'latin1');
  if (buf.length === byteLength) return buf;
  if (buf.length > byteLength) return buf.subarray(0, byteLength);
  return Buffer.concat([buf, Buffer.alloc(byteLength - buf.length)]);
}

function EncryptNew(textToEncrypt, secret = 'Is1FlCFiRR3simumDWdotklr9Eg2Sk', encryptionMethod = "aes-256-cbc")
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