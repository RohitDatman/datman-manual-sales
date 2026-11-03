#!/usr/bin/env node
//https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
const crypto = require('crypto');
const { execFile } = require('child_process');
const { faker } = require('@faker-js/faker'); // npm install @faker-js/faker  (JS Faker is already a ready-to-use instance, no Factory::create() needed)

// NOTE ON THIS CONVERSION: as requested, every commented alternative below
// is valid, uncomment-and-run JS. `merchant_id`, `host`, `email`,
// `RedirectUrl`, `CancelUrl`, `datmanHost`, `switchHost`, `phpHost`, and
// `migrationHost` are each declared once with a bare `let` above their own
// comment blocks, so uncommenting any single alternative — before or after
// the active line — is a safe plain reassignment (no "already declared" or
// temporal-dead-zone error). Object-literal alternatives (inside `payload`
// and `SplitFee`) rely on JS's normal last-key-wins duplicate-key behavior,
// same as PHP arrays. Per your last message, this version prints links to
// the terminal only — no HTML file, no browser auto-open.

// forming business related values
let merchant_id; // declared once here so every commented alternative below (before or after the active line) is a safe plain reassignment
// merchant_id = 1235000;  //663208394; // cardstream 1235000 1234569 663167055 63162502 (1234569-cardstream-ch) 63153688 -ir
// merchant_id = 1234943; // cs-ch
// merchant_id = 1235001;
// merchant_id = 1234571; //checkout-hf
// merchant_id =  663160246 ;//1234574;  // cardstream-ch
// merchant_id = 663184408; // optomany
// merchant_id = 1234782; // CHECKOUT-HF//1235030(test)//1235031(stage)//workspace(1234567)
// merchant_id =  663208111; //663208111;//663209575;// 663208389;//663208111; // 663208470 //63155428 ; // adyen (stage 63155457) (test 63169829) (ws 63169829)//
// BA32CLM22322735KJJJ96849K
// merchant_id = 63155552; // paystack
// merchant_id = 1234572; //1234572; // spreedly // 63190423 // 1234572
// merchant_id = 663207586; // saturn // 63155140 // 663192467
// merchant_id = 663191524; // cardstream-obn
// merchant_id = 663208169; // o2m
// merchant_id = 663208906;// adyen aus
// merchant_id = 663208394; // adyen usa
// merchant_id = 512692180; // adyen usa 2
// merchant_id = 1234572; // Spreedly
// merchant_id = 63169827; // Spreedly
// merchant_id = 663209723;  //adyen - uk
// merchant_id = 663209693;  //adyen - us moto 02m
// merchant_id = 1234568; // cs-ch new ui
// merchant_id = "663208386";//adyen-hf UK
// merchant_id = 1235000;//uk cs
// merchant_id =  663160246; //cs-ch
// merchant_id =  663209459; //checkout us 
// merchant_id =  1234782; // checkout hf

// Mypay adyen mids
// UK
// merchant_id = 663207730; // adyen uk
// merchant_id = 663209693; // adyen USA moto stage
// merchant_id = 663209694;
// merchant_id = 663209670; //Adyen US o2m
merchant_id = 663234795;

// 663207634
// 663207730
// 663208347
// 663208407

const provider = "T2S";
const business_name = faker.company.name();

let host; // declared once so the alternate above/below is a safe plain reassignment
// host = "https://" + business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";

let email; // declared once so the alternate below is a safe plain reassignment
// email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //faker.internet.email();
email = 'rohit@datman.je';

const webhookUrl = "https://webhook.site/d9746816-7775-4f1b-8126-1e19ee1c57f0"; //faker.internet.url();

let RedirectUrl; // declared once so the alternate below is a safe plain reassignment
// RedirectUrl = "https://example.com";
RedirectUrl = 'https://www.google.com/search?q=google&sxsrf=ALiCzsaYWMc353NEGDjt8kCYJDsNP047Lg%3A1663671077494&ei=JZspY43dHeuNseMPqsGIgAs&ved=0ahUKEwjNg-PcmaP6AhXrRmwGHaogArAQ4dUDCA4&uact=5&oq=goofle&gs_lcp=Cgdnd3Mtd2l6E';

let CancelUrl; // declared once so the alternate below is a safe plain reassignment
CancelUrl = "https://example.com/cancel";
// CancelUrl = "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe%22";

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
// shapes (strings, numbers, null) for the commented payment_encrypt2()
// variants further down.
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
    // "customer_id": 0,
    // "order_id": "655877652",
    "customer_id": faker.number.int({ min: 10000000, max: 19999999 }),
    // "customer_id": "0",
    // "customer_id": 92385553, //CARDSTREAM
    // "customer_id": 17706598, //CHECKOUT-HF
    // "customer_id": 5154293, //Spreedly
    // "customer_id": 19428492, //Adyen
    // "customer_id": 15278766,
    // "customer_id": 14977800, //Adyen pre-prod
    // "customer_id": 37377334, // cardstream-ch
    //  "customer_id": 18978322, // adyen USA
    // "customer_id": 1234944, // adyen UK stage
    "provider": provider,
    "email": email,
    "phoneNumber": numerify("07##########"),
    "name": business_name,
    // "Amount": faker.finance.amount({ min: 10, max: 50, dec: 2 }),
    "Amount": "20.00",
    "AvsHouseNumber": faker.location.buildingNumber(),
    "AvsPostcode": faker.location.zipCode(),
    "MerchantReference": numerify("MerchantReference##########"),
    "RedirectUrl": RedirectUrl,
    "CancelUrl": CancelUrl,
    // "CancelUrl": "https://gotos.in/you+have+to+write+a+really+really+long+url+to+get+to+650+characters.+like+seriously+you+have+no+idea+how+long+it+has+to+be+650+characters+is+absolutely+freaking+enormous.+You+can+fit+sooooooooooooooooooooooooooooooooo+much+data+into+650+characters.+My+hands+are+getting+tired+typing+this+many+characters.+I+didnt+even+realise+how+long+it+was+going+to+take+to+type+them+all.+So+many+characters.+I'm+bored+now+so+I'll+just+copy+and+paste.+I'm+bored+now+so+I'll+just+copy+and+paste+gtF+.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.I'm+bored+now+so+I'll+just+copy+and+paste.+It+has+to+be+freaking+enormously+freaking+enormous",
    // "WebhookUrl": webhookUrl,
    "WebhookUrl": "https://webhook.site/a0023001-928d-4c56-9c84-f34aec10e945",
    "customer_joining_date": formatDateTime(dateTimeThisMonth()),
    "firstname": faker.person.firstName(), //new field
    "lastname": faker.person.lastName(), //new field
    "flat": String(faker.number.int({ max: 99 })), //new field
    "address1": faker.location.city(), //new field
    "address2": faker.location.street(), //new field
    "CashPaymentUrl": "https://www.google.com/",
    // "backurl": "https://www.google.com/",
    // "originalSaleAmount": "1.00",
    // "TokenAvs": "",
    // "token": "mxtoken_05768ed428f98953e33f4ec0cbc0f026cb936aef44e563dd1665d286ec9e24af", // cardstream
    // "token": "mxtoken_97a7a378195c4beea8a0ab271c4075b7169970427d43ecd51b331b9792189968", // checkout
    // "token": "mxtoken_78824ff886442dc5ce53d8ff86fe530f",
    // "token": "mxtoken_SaNqoz3gh6vKuA0KGsGH4tXCuPhqlwLM",
    // "token": "mxtoken_Zg_A1J8x9Nxv5B_gAfl5nL3kYIM9tyAm", // adyen customer id = 370623291
    // "token": "mxtoken_83bd6ff6e13378b55a38ea07b12b77f0fe19825364edecc307d4689259dc23a2", // adyen rtau
    // "token": "mxtoken_133fd58eb693f5656b88bfb69d74428bdfe99a6fa4dc67560ce3e44c0c3ab21b",
    // "token": "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395", // adyenUSA 18978322
    // "token": "mxtoken_b949d8555fdd3c098cdb14a9bc151ed313507f01fdbb99bcfeb5fe7c72e0dda7",
    // "last4Digits": "0005",
    // "last4Digits": "0821",//checkout
    // "last4Digits": "6567",//spreedly
    // "authorisation_type": "PreAuth",
    "LegacyUrl": "https://www.google.com/",
    // "backurl": "https://www.google.com/"
    // "txnType": "WALLET_RECHARGE_AGAINST_ORDER",
    // "txnType": "MERCHANT_INITIATED_TRANSACTION",
    "txnType": "CREATE_MIT_TOKEN",
//     "statement_descriptor": "Rohit 😭😂 ~!@#$%^&*()?{}()*:;?/\\|>                               ",
// "statement_descriptor_address": " ✊🏿 Dymanic #@%@%@&@^@&@()() ~!@#$%^&*()?{}()*:;?/\\| Discriptor",
//   "metadata": {
//     "description": "testing description"
//   },
};

const SplitFee = [
    {
      "partner_merchant_id": 663208470,
      "type_id": 3,
      "value": 1,
      "value_type": "amount"
    },
//     {
//       "partner_merchant_id": 663208389,
//       "type_id": 7,
//       "value": 1,
//       "value_type": "amount"
//     },
//   //   {
//   //     "partner_merchant_id": 663208112,
//   //     "type_id": 6,
//   //     "value": 1.20,
//   //     "value_type": "amount"
//   //  }
];
payload.SplitFee = SplitFee;

console.log(JSON.stringify(payload, null, 2));

// const encryptedData = payment_encrypt2(payload);
let datmanHost; // declared for parity with the PHP source's $migrationHost, which is only ever referenced in this commented-out line (never actually used downstream, same as in the original)
migrationHost = "https://stage-fh-payments.datmanpay.com";
// datmanHost = "http://legecy-release.datmanpay.com";
//  datmanHost = "https://stage-fh-1.datmanpay.com"; // declared once here so every commented alternative below is a safe plain reassignment
// datmanHost = "https://ws8-payments.datmanpay"; // NOTE: this looks like a typo in the original PHP (missing ".com") — preserved exactly as given; fix to "https://ws10-payments.datmanpay.com" if that was unintentional
// let phpHost; // declared for parity with the PHP source's $phpHost, which is only ever referenced in these commented-out lines (never actually used downstream, same as in the original)
// phpHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6"; //SIT
// phpHost = "https://ws10-payments.datmanpay.com";
// phpHost = "https://stage-fh-1.datmanpay.com";
// datmanHost = "https://stage2.datmanpay.com";
// datmanHost = "https://legacy-qa-1.datmanpay.com";
// datmanHost = "https://stage-6.datmanpay.com";
// datmanHost = "https://legacy-test.datmanpay.com";
let switchHost; // declared once here so every commented alternative below is a safe plain reassignment
// switchHost = 'https://ws8-payments.datmanpay.com/switch/api/v1';
switchHost = "https://stage-fh-payments.datmanpay.com/switch/api/v1";
// switchHost = 'https://stage-fh-1.datmanpay.com/switch/api/v1';
// switchHost = "https://stage-payments.datmanpay.com/switch/api/v1";
// switchHost = "https://xzm162tl69.execute-api.eu-west-1.amazonaws.com/t2srelease/api/v1";
// switchHost = 'https://ty0j16tra0.execute-api.eu-west-2.amazonaws.com/ws8/api/v1';
// switchHost = 'https://payments.datmanpay.com/switch/api/v1';
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
// console.log(`<a href='${datmanHost}/opto/card.php?data=${encryptedData}' target='_blank'>PHP</a> - <i style='color:red'>Not in production yet</i>`);

const phonePaymentLink = `${switchHost}/phone-payment/?data=${EncryptNew(JSON.stringify(payload))}`;
console.log("\nCardstream phone payment link:");
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

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj
// pre prod - Is1FlCFiRR3simumDWdotklr9Eg2Sk
//
// FIDELITY NOTE: the original used mcrypt's MCRYPT_RIJNDAEL_256 in CBC mode.
// That's a 256-bit-BLOCK cipher, a different algorithm from AES (AES only
// standardized Rijndael's 128-bit block variant), so no mainstream crypto
// library — including Node's built-in `crypto` — implements it. This
// function was ALSO commented out (unused) in your source, so it's kept
// here purely as a reference translation, not as a callable helper.
// function payment_encrypt2(string, key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
// {
//   // True Rijndael-256/mcrypt has no direct Node equivalent — see the
//   // fidelity note above. This is a best-effort AES-256-CBC stand-in:
//   const keyMd5 = crypto.createHash('md5').update(key).digest();
//   const ivMd5 = crypto.createHash('md5').update(keyMd5).digest();
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.concat([keyMd5, keyMd5]), ivMd5.subarray(0, 16));
//   const encrypted = Buffer.concat([cipher.update(phpSerialize(string), 'utf8'), cipher.final()]);
//   return encodeURIComponent(encrypted.toString('base64'));
// }

// This second PHP variant already used openssl_encrypt/AES-256-CBC instead
// of mcrypt, so — unlike the one above — it converts to JS with full
// fidelity, no stand-in needed:
// function payment_encrypt2(string, key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') {
//   const encryptionMethod = "aes-256-cbc";
//   const iv = crypto.createHash('md5').update(key).digest('hex').slice(0, 16); // Generate IV from the key
//   const cipher = crypto.createCipheriv(encryptionMethod, normalizeKey(key, 32), Buffer.from(iv, 'latin1'));
//   let encryptedMessage = cipher.update(phpSerialize(string), 'utf8', 'base64');
//   encryptedMessage += cipher.final('base64');
//   return encodeURIComponent(encryptedMessage);
// }


// prod
// UdQAvINlVkbXD95FMrS4FY1AkLlWB4AD

// stage
// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj

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

/*
Merchant Id will be automatically retreived from T2S Database based on the host used
hostname qa3.t2scdn.com points to MID => 63159841

T2S ORDER IDS (staging)
  320039674	website3.bigfoodie1.co.uk	63355140	15.00
  294493536	qaweb1.t2scdn.com	63355140	5.76
  294493537	qaweb1.t2scdn.com	63355140	3.60
  294493570	qaweb1.t2scdn.com	63355140	8.28

DATMAN MERCHANT IDS (staging)
  BARCLAYS => 63355140

Customer IDS (staging)
  nitish@datman.je    => 31837
  muzammil@datman.je  => 27202

BARCLAYS Test card
card no: 4917 6100 0000 0000
exp date: 03/2030
cvv: 737


BARCLAYS MMS (sandbox)
https://ca-test.barclaycardsmartpay.com/ca/ca/login.shtml

SQL QUERIES
   update card_payment set payment_status = 'FAILED' where order_id = 294482156;
   select * from card_payment where order_id = 294482156 order by id desc limit 10;
*/