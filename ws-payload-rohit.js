#!/usr/bin/env node
//https://github.com/fzaninotto/Faker
// require_once 'vendor/autoload.php'; //composer require fzaninotto/faker
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker'); // npm install @faker-js/faker  (JS Faker is already a ready-to-use instance, no Factory::create() needed)

// NOTE ON THIS REVISION: every commented-out alternative below has been
// rewritten as valid JS (not just copy-pasted PHP). Uncomment any single
// line and it will run. `merchant_id`, `datmanHost`, and `phpHost` are
// declared with `let` (not `const`) specifically so that uncommenting one
// of their alternate lines — which just reassigns the variable — works
// without a "already declared" error. Object-literal alternatives (inside
// `payload` and `SplitFee`) work by JS's normal last-key-wins duplicate-key
// behavior, same as PHP arrays.

//forming business related values
let merchant_id; // declared once here so every commented alternative below (before or after the active line) is a safe plain reassignment
// merchant_id = 1234667;
// merchant_id = 663212990; //CS-OBN
// merchant_id = 1234943; //CS-CH usa
// merchant_id = 1234943; //CS-CH-US
// merchant_id = 63155116; //CS_CH-AUS
// merchant_id = 1235055;//cs-ch aus
// merchant_id = 1234943;//cs-ch usa
// merchant_id = "1235000";// uk  mid cs stage build
// merchant_id = "1235001"; // cs uk automation
// merchant_id = "1235010"; // ireland uk automation
// merchant_id = "663207634"; // FH SIT uk CS
// merchant_id = "663207056"; // SIT cs-ch
// merchant_id = "63169827";
// merchant_id = "663209310";
// merchant_id = "1235001";// uk cs non 3ds
// merchant_id = '663208632';//uk cs bigtable
// merchant_id = '663209301';
// merchant_id = "663191524";//OBN
// merchant_id = 663160246; //cs-ch usa
// merchant_id = 1235000;//cs
// merchant_id = 663208350;// adyen - USA
// merchant_id = "663208390";//adyen - AUS
// merchant_id = "1234943";//cs-ch usa non o2m
// merchant_id = "1234574"; // O2M merchant USA
// merchant_id = "63169827"; //spreedly
// merchant_id = "663209459";//CHECKOUT UK
// merchant_id = "663208607";//CHECKOUT BIG TABLE
// merchant_id = 63155205;//CHECKOUT US
// merchant_id = 63155273;
// merchant_id = 63181447; // spreedly
// merchant_id = 663215411; //Spreedly o2m
// merchant_id = 663209090; // Adyen UK Tiger bite
// merchant_id = "663207623"; //paystack
// merchant_id = "663208111";//adyen-hf UK Big table
// merchant_id = "663208470";//adyen-hf UK
// merchant_id = "663192253";//adyen big table - fund transfer - dont use
// merchant_id = "663192104";// adyen big table fund transfer
// merchant_id = "663208386";// adyen o2m USA
// merchant_id = "663207634";//adyen test
// merchant_id = "663208389";//adyen-hf UK non Big table
// merchant_id = 63154671;//stripe
// merchant_id = '663207586';//- stripe-supper
// merchant_id = 63155140;//- stripe
// merchant_id = 663192887;
// merchant_id = 663207589;// cs- ireland
// merchant_id = "1234782";//checkout
// merchant_id = 663208582;
// merchant_id = 663208169;//big-table cs
// merchant_id = 1235010; // non-cs merchant from ireland
// // merchant_id = 1235055;//cs-ch aus
// merchant_id = 663209645; //adyen USA
// merchant_id = "1235030";//checkout USA O2M 663209694
//* 663208470,663208111,663208389 - adyen di
//* 663208350, 663208386, 663208394 - adyen US
// 663208906,663208546,663208390 - adyen AUS
// merchant_id = "663208607";//checkout big table
// merchant_id = 663209723;  //adyen - uk
// merchant_id = 663209670;  // adyen us 02m new
// merchant_id = 663208386;//adyen- usa
// merchant_id = "665000067";  // cs-ch new ui
// merchant_id = 663209723; //adyen uk
// merchant_id = 663215188; //adyen uk
//
// merchant_id = 663210755; //adyen uk big-table
// merchant_id = 663209524; //adyen uk tiger-bite
// merchant_id = 663210833; //adyen NZ
// merchant_id = 663230330; // adyen 
//
// merchant_id = 663211748; // adyen us rohit
// merchant_id = 663208347;// Adyen UK rohit
// merchant_id = 663210800; // Adyen AUS rohit 
// merchant_id =  "1234661"; // Spreedly auth.net
merchant_id =  "663208081"; // Spreedly auth.net new



// merchant_id = 1234664; // cs cashflow mid

// merchant_id = 1234782; // Adyen NZ merge ecom mid
// merchant_id = 663211913; // Adyen NZ merge ecom mid
// merchant_id = 663208960;
// merchant_id = 663211207; //RBS payout test mid
// merchant_id = 663209734; //sit fh auto debit
// merchant_id = 663230768; // sit adyen us


const provider = "FH";
const business_name = faker.company.name();
const host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
const email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; //faker.internet.email();
const webhookUrl = "https://webhook.site/bc63da79-5189-45a6-bea7-35e3f3a51a61"; //faker.internet.url();
const RedirectUrl = "https://google.com";//"https://" + host + "/success";
const CancelUrl = "https://" + host + "/cancel";

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
  // "order_id": "87477411",
  "order_id": faker.number.int({ min: 500000000, max: 599999999 }),
  // "order_id": 8376493739,
  "customer_id": faker.number.int({ min: 10000000, max: 19999999 }),

  // "customer_id": 14409158, //Adyen uk MIT
  // "customer_id": 19685927, //Adyen us MIT
  // "customer_id": 13484532, //Adyen au MIT
  // "customer_id": 10845159, //cs-ch us mit
  // "customer_id": 18314407, //cs uk mit

  // "customer_id": 16503046,//cs-ch aus
  // "customer_id": "12656968",//cs-ch usa and checkout o2m
  // "customer_id": "103167666",//checkout
  // "customer_id": "15251896",//cs-ch amex
  // "customer_id": "13551048",//spreedly
  // "customer_id": "18773734", //adyen uk token
  //  "customer_id": "17820961",//adyen -uk
  // "customer_id": "14860966",//adyen uk non 3ds
  // "customer_id": "14677770",//adyen
  // "customer_id": "12280770",//adyen USA
  // "customer_id": "63154549", //spreedly us
  // "customer_id": "15251896",//cs - uk
  // "customer_id": "18599579",//cs-uk
  // "customer_id": "14097990",//cs uk ireland
  //  "customer_id": "17385898",//adyen usa 02m
  //  "customer_id": "111111",//adyen aus
  // "customer_id": "488537402",//cs uk
  // "customer_id": "103167666",//checkout
  // "customer_id": "12230388", // adyen uk
  //  "customer_id": "10958273", // adyen usa
  // "customer_id": "18031813", // adyen aus
  // "customer_id": "1234943",//cs-ch usa
  // "customer_id": "1234568", //cs-ch new ui
  // "customer_id": "63155140", //cs ch saved card
  // "customer_id": "63155140",
  // "customer_id": "14677770", // adyen uk
  //  "customer_id": "15390943",// adyen NZ
//  "customer_id": "11548667", // Checkout
//  "customer_id": "14775623", // Checkout - HF

//  "customer_id": "12192297", //Adyen NZ ecom CID
//  "customer_id": "19755947", //Adyen NZ ecom CID


//  "customer_id": "12876517", // au
//  "customer_id": "7976795", // us
//  "customer_id": "1637258", // uk
//  "customer_id": "19041945", // uk
// "customer_id": "18932081", // adyen us rohit
// "customer_id": "15531193", // adyen uk rohit 
// "customer_id": "15642738", //



//  "txnType": "WALLET_RECHARGE_AGAINST_ORDER",


// "txnType": "CREATE_MIT_TOKEN",
  "provider": provider,
  // "email": "rohit@datman.je",
  // "email":"rohit@gmail.com",
  "email":"test@datman.je", 
  "phoneNumber": numerify("07##########"),
  "name": business_name,
  // "Amount": faker.finance.amount({ min: 10, max: 50, dec: 2 }),
  "AvsHouseNumber": '3',// faker.location.buildingNumber(),
  "Amount": "35.52",
    // "Amount": "0.3",

  // "AvsPostcode": faker.location.zipCode(),
  "AvsPostcode": 'NN17 8YG',
  // "AvsPostcode": "84001",// For USA ZIP code;
  "MerchantReference": numerify("MerchantReference##########"),
  "RedirectUrl": RedirectUrl,
  "CancelUrl": CancelUrl,
  // "authorisation_type": "PreAuth",
  // "captureDelayHours": "1",
  // "txnType": "WALLET_RECHARGE_AGAINST_ORDER",//enable only for wallet +X
  "WebhookUrl": webhookUrl,
  "customer_joining_date": formatDateTime(dateTimeThisMonth()),
  "firstname": "Rohit-",//faker.person.firstName(), //new field
  "lastname": "M-",//faker.person.lastName(), //new field
  "flat": '3',//String(faker.number.int({ max: 99 })), //new field
    "address1": faker.location.city(), //'23',//faker.location.city(), //new field
  "address2": faker.location.street(),
  // "address1": faker.location.city(), //'23',//faker.location.city(), //new field
  // "address2": faker.location.street(), // 'NN17 8YG ',//faker.location.street(), //new field
  // "backurl": "https://sit-web30-uk.fhcdn.dev/order-now",
  "backurl": "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe",
  // "source": "mobile-app", //hide GooglePay/ApplePay
  // "txnType": "GIFT_CARD",
  // "gcReference": "jkdjkd-djdi-dijd-djdi2393wwqqer34iyy3",
  // "order_id": "jkdjkd-djdi-dijd-djdi2393wwqqer34iyy3", // mirrors gcReference above (was a self-reference to $payload['gcReference'] in the PHP, which can't resolve while payload is still being built — see the GIFT_CARD overrides after the object below for the corrected version of that idea)

  // "TokenAvs": "",
//  "token": "mxtoken_iXP-L6kaup-lMsQTLpAxqsVlU42hEetB", //spreedly token for customer id 13551048;
//   "last4Digits": "4242", // spreedly last4 digits
//  "token": "mxtoken_e15be01cdc153cdd53fd2e5706d572c450fdd5515acd1296f345f0d3bfb19b3a", //spreedly token for customer id 13551048 mastercard;
//    "last4Digits": "0000",
//  "token": "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323", //cs-ch token for customer id ; 63155140
//  "last4Digits": "0821",
//  "token": "mxtoken_f69a58e8067e5f2131474a01896b1a664dd20acdb205012a593f7afc549aa7e4", //cs-ch token for customer id 14494880;
//  "last4Digits": "0821",
  // "token": "mxtoken_f69a58e8067e5f2131474a01896b1a664dd20acdb205012a593f7afc549aa7e4",// cs token - 14097990 - 0821
  // "last4Digits": "0821",
  // "token": "mxtoken_c7d7d67d270555fedfeff7f89f2a3f49", //cs-ch token for customer id 12656968 mastercard;
  // "last4Digits": "0821",
// "token": "mxtoken_a223cf5ae132bf9c5465dc6d45a6b987060dc1f05914cdfab43bf8257e5c2fc5", //adyen uk - 18773734 cus id
// "last4Digits": "1111",
  // "token": "mxtoken_f9ebf2866517eee165a0fbfef43760cfdce877a64ab56dff2d877527139b153d",//adyen uk  - 12230388
  // "last4Digits": "0005",
  "token": "mxtoken_331e50cf2a272e72942ddb7ed628dd8c7dfb3a26d0982ea7ba73adca333e55c7",//cardstream - 15251896 - 0821 card
  "last4Digits": "5454",
//   "token": "mxtoken_3qyZiWAEvaSZuaCiwyN36Z-NsCM1Zsur",   //spreedly 63154549
//  "last4Digits": "1111",
  // "token": "mxtoken_kIgN_lZOhtLeMgmkTf483nFtd_uO5g4m",//checkout 11548667
  // "last4Digits": "0000",
  // "token": "mxtoken_8CdqKH671TYbQDQHB6Ihc5SzJ5vQ2tR_",//checkout 11548667
  // "last4Digits": "0821",
  //  "token": "mxtoken_4b509c5294954328dc7a80b470afa265420e11a03d2ccc5abca03f5f0b5eb784",//cs-ch usa -19621225
  //  "last4Digits": "0821",
  // "token": "mxtoken_05768ed428f98953e33f4ec0cbc0f026cb936aef44e563dd1665d286ec9e24af", //cs- 18599579
  // "last4Digits": "0821",
  // "token": "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// adyen usa 12280770
  //  "last4Digits": "5454",
  //  "token": "mxtoken_94515ccf972eeaaf8426faa85866f700bff786052d772ada654a3f6b10ad51a8", // cs-ch new ui 1234568
  //  "last4Digits": "0821",
  // "token": "mxtoken_b154b0d89e6119e1ad372c2b7360c49a7cd52b6bfc72b970ee860dee6f19379b",//adyen 19652473
  // "last4Digits": "0000",
// "token": "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// adyen uk 14677770
//    "last4Digits": "5454",
  // "DbTotal": "true", // NOTE: original PHP comment had a stray, malformed trailing token string here (mxtoken_4ae72d8438fdb0dea4c78eca6cf8b2f7b9e10b6c1a94007f5ba8d96b47a1defb) that wasn't valid syntax in either language — dropped
  //  "token": "mxtoken_4ae72d8438fdb0dea4c78eca6cf8b2f7b9e10b6c1a94007f5ba8d96b47a1defb",// cs uk 488537402
  //  "last4Digits": "0821",
  //   "token": "mxtoken_d0182e064aa8de8157c9ecf98844351b9abbd24940be26275a80f9f433ef81db",// adyen us 11130480
  //  "last4Digits": "0005",
  // "token": "mxtoken_e5b1c89a65122a5cef8eeec7db430ecde3320b9a6bcd12c5efeee25039510486",// adyen us 18932081
  //  "last4Digits": "0005",
  // "token": "mxtoken_e5b1c89a65122a5cef8eeec7db430ecde3320b9a6bcd12c5efeee25039510486",// adyen uk 15762470
  //  "last4Digits": "0005",


// "token": "mxtoken_4b78b7fcb3e0722165379556ee6b96b3671645da8d086a39da8594bbed481571",
//    "last4Digits": "4950",

  //  "token": "mxtoken_0e810f0d1cb2ecc81b72d357f1b05dbb5fb55d6373e843e761f6535c9e4fa2bb",
  //  "last4Digits": "5454",

  //  "token": "mxtoken_274dfe3e533779e67d26a83e6ecb02c7507d8006ab7f540c1cbf0f095b9354d7",
  //  "last4Digits": "0005",

// "token": "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323",
//   "last4Digits": "0821",


  //   "token": "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// charge back test
  //  "last4Digits": "5454",

//   "metadata": {
//     "description": "testing description"
//   },

// "authorisation_type": "PreAuth",
// "statement_descriptor": "",
// "statement_descriptor_address": "",


};

const SplitFee = [
  {
    "partner_merchant_id": 663208111,
    "type_id": 1,
    "value": 1,
    "value_type": "amount",
  },
   {
     "partner_merchant_id": 663208386,
     "type_id": 7,
    "value": 0.50,
     "value_type": "amount",
   },
  //  {
  //    "partner_merchant_id": 663208350,
  //    "type_id": 3,
  //    "value": 0.21,
  //    "value_type": "amount",
  //  },
  // {
  //   "partner_merchant_id": 663208470,
  //   "type_id": 4,
  //   "value": 4.71,
  //   "value_type": "amount",
  // },
  // {
  //   "partner_merchant_id": 663208470,
  //   "type_id": 5,
  //   "value": 5.71,
  //   "value_type": "amount",
  // },
  // {
  //   "partner_merchant_id": 663208470,
  //   "type_id": 6,
  //   "value": 0.71,
  //   "value_type": "amount",
  // },
  // {
  //   "partner_merchant_id": 663208111,
  //   "type_id": 7,
  //   "value": 18.71,
  //   "value_type": "amount",
  // },
];
payload.SplitFee = SplitFee;

// GIFT_CARD scratch overrides — in the original PHP these three lines sat
// INSIDE the array(...) literal as commented-out statements
// ($payload['txnType'] = ...), which would have been a PHP syntax error too
// if uncommented in that position (you can't have a statement mid-literal).
// Moved here, right after payload is fully built, so uncommenting any of
// them actually works:
// payload.txnType = "GIFT_CARD";
// payload.gcReference = "jkdjkd-djdi-dijd-djdi2393wwqqer34iyy3";
// payload.order_id = payload.gcReference;




let __html = "";
__html += "<pre>";
__html += JSON.stringify(payload, null, 2);
__html += "</pre>";
console.log(JSON.stringify(payload, null, 2));

// const encryptedData = payment_encrypt2(payload);

const encryptedoldData = payment_encrypt2(payload);

const encryptedData = EncryptNew(JSON.stringify(payload));

let datmanHost; // declared once here so every commented alternative below (before or after the active line) is a safe plain reassignment
// datmanHost = "http://legacy-qa-5.datmanpay.com";
// datmanHost = "http://legecy-release.datmanpay.com";
// datmanHost = "https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5";
// datmanHost = "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// datmanHost = "https://sxmpqv8qr7.execute-api.eu-west-2.amazonaws.com/ws7";
// datmanHost = "https://zwbf0weg3c.execute-api.eu-west-2.amazonaws.com/ws4";
// datmanHost = "https://ws4.datmanpay.com";
// datmanHost = "https://ws7-payments.datmanpay.com/pluto";

datmanHost = "https://ws3-payments.datmanpay.com";

// datmanHost = "https://stage-fh-1.datmanpay.com";

// datmanHost = "https://stage-fh-payments.datmanpay.com";
// datmanHost = "https://stage-fh-1.datmanpay.com";
// datmanHost = "https://ws5.datmanpay.com/";
// datmanHost = "https://ws3-payments.datmanpay.com";
// datmanHost = "https://ws10-payments.datmanpay.com";
// datmanHost = "https://checkout-ws10.d1zjq3ww98ctjs.amplifyapp.com/";
// datmanHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6";//ws6
// datmanHost = "http://localhost:3000";
// datmanHost = "http://legacy-qa-4.datmanpay.com";
// datmanHost = "http://legacy-qa-3.datmanpay.com";
// datmanHost = "https://legacy-qa-3.datmanpay.com";
let phpHost; // declared for parity with the PHP source's $phpHost references below (never actually used downstream, same as in the original)
// phpHost = "http://localhost";
// phpHost = "https://ws3.datmanpay.com";
// phpHost = "https://ws7.datmanpay.com";
// phpHost = "https://ws1.datmanpay.com";
// phpHost = "https://stage.datmanpay.com";


const switchHost = 'https://payments.datmanpay.com/switch/api/v1';
const UranusGBPEndpoint = "";
const UranusEUREndpoint = "";
const UranusPhonePayment = "";
const UranusPhonePaymentWin = "";
const PlutoEndpoint = "";

// __html += `<a href='${datmanHost}/barclays/phonePayment.php?data=${encryptedData}' target='_blank'>Uranus - Phone payment(GBP)</a> - <i style='color:green'>Available in production</i>`;
// __html += "<br>";
// __html += "<br>";
// __html += "<br>";
// __html += "<br>";
// __html += `<a href='${datmanHost}/barclays/onlinePaymentV2.php?data=${encryptedData}' target='_blank'>Uranus - GBP</a> - <i style='color:green'>Available in production</i>`;
// __html += "<br>";
// __html += "<br>";
// __html += `<a href='${datmanHost}/barclays-irl/onlinePaymentV4.php?data=${encryptedData}' target='_blank'>Uranus - EUR</a> - <i style='color:green'>Available in production</i>`;
// __html += "<br>";
// __html += "<br>";


__html += "<br>";
__html += `<a href='${datmanHost}/opto/card.php?data=${encryptedData}' target='_blank'>new_encryption</a> `;


console.log("Order id", payload.order_id)

console.log("\nnew_encryption link:");

console.log(`${datmanHost}/opto/card.php?data=${encryptedData}`);

const outPath = path.join(__dirname, 'output.html');
fs.writeFileSync(outPath, __html, 'utf8');
console.log(`\nHTML written to: ${outPath}`);
console.log(`(payment_encrypt2/encryptedoldData computed but unused, as in the original — see fidelity note in source)`);

//pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj

// ---------------------------------------------------------------------------
// FIDELITY NOTE (payment_encrypt2): the original used mcrypt's
// MCRYPT_RIJNDAEL_256 in CBC mode. That's a 256-bit-BLOCK cipher, a
// different algorithm from AES (AES only standardized Rijndael's 128-bit
// block variant), so no mainstream crypto library — including Node's
// built-in `crypto` — implements it. mcrypt itself was also removed from
// PHP core as of 7.2. $encryptedoldData (this function's result) is never
// used anywhere else in the script — only $encryptedData (from EncryptNew,
// below) feeds the actual link — so this port keeps the function callable
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

function payment_encrypt2(string, key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
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