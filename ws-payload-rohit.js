// Exact JS port of the PHP payment-link generator script.
// https://github.com/faker-js/faker  (JS equivalent of PHP's fzaninotto/Faker)
//
// Setup:
//   npm install @faker-js/faker
//   node generate-payment-link.js
//
// IMPORTANT — read the note above paymentEncrypt2() near the bottom before
// relying on that function. It is ported as a non-functional stub because
// PHP's mcrypt + Rijndael-256 has no equivalent in Node's built-in crypto
// (which only supports AES = Rijndael with a 128-bit block, not the 256-bit
// block variant mcrypt used). In the original PHP script this function's
// output ($encryptedoldData) is computed but never actually used in the
// echoed links either, so nothing active depends on it.

const crypto = require('crypto');
const { faker } = require('@faker-js/faker');

// ============================================================
// forming business related values
// ============================================================
// $merchant_id=1234667;
// $merchant_id= 663212990; //CS-OBN
// $merchant_id=1234943; //CS-CH usa
// $merchant_id= 1234943; //CS-CH-US
// $merchant_id = 63155116; //CS_CH-AUS
// $merchant_id= 1235055;//cs-ch aus
// $merchant_id = 1234943;//cs-ch usa
// $merchant_id = "1235000";// uk  mid cs stage build
// $merchant_id = "1235001"; // cs uk automation
// $merchant_id = "1235010"; // ireland uk automation
// $merchant_id = "663207634"; // FH SIT uk CS
// $merchant_id = "663207056"; // SIT cs-ch
// $merchant_id = "63169827";
// $merchant_id = "663209310";
// $merchant_id = "1235001";// uk cs non 3ds
// $merchant_id = '663208632';//uk cs bigtable
// $merchant_id = '663209301';
// $merchant_id  = "663191524";//OBN
// $merchant_id= 663160246; //cs-ch usa
// $merchant_id = 1235000;//cs
// $merchant_id= 663208350 ;// adyen - USA
// $merchant_id= "663208390";//adyen - AUS
// $merchant_id= "1234943";//cs-ch usa non o2m
// $merchant_id = "1234574"; // O2M merchant USA
// $merchant_id= "63169827" ; //spreedly
// $merchant_id= "663209459";//CHECKOUT UK
//  $merchant_id= "663208607";//CHECKOUT BIG TABLE
// $merchant_id = 63155205;//CHECKOUT AUS
// $merchant_id = 63155273;
// $merchant_id= 63181447 ; // spreedly
// $merchant_id= 663215411 ; //Spreedly o2m
// $merchant_id= 663209090 ; // Adyen UK Tiger bite
// $merchant_id = "663207623"; //paystack
// $merchant_id = "663208111";//adyen-hf UK Big table
// $merchant_id = "663208470";//adyen-hf UK
// $merchant_id = "663192253";//adyen big table - fund transfer - dont use
// $merchant_id = "663192104";// adyen big table fund transfer
// $merchant_id = "663208386";// adyen o2m USA
// $merchant_id = "663207634";//adyen test
// $merchant_id = "663208389";//adyen-hf UK non Big table
// $merchant_id = 63154671 ;//stripe
// $merchant_id = '663207586' ;//- stripe-supper
// $merchant_id=63155140 ;//- stripe
// $merchant_id=663192887;
// $merchant_id=663207589;// cs- ireland
// $merchant_id="1234782";//checkout
// $merchant_id=663208582;
// $merchant_id=663208169;//big-table cs
// $merchant_id=1235010; // non-cs merchant from ireland
// // $merchant_id= 1235055;//cs-ch aus
// $merchant_id= 663209645 ;//adyen USA
// $merchant_id="1235030";//checkout USA O2M 663209694
//* 663208470,663208111,663208389 - adyen di
//* 663208350, 663208386, 663208394 - adyen US
// 663208906,663208546,663208390 - adyen AUS
// $merchant_id="663208607";//checkout big table
// $merchant_id= 663209723;  //adyen - uk
// $merchant_id= 663209670;  // adyen us 02m new
// $merchant_id= 663208386;//adyen- usa
// $merchant_id= "665000067";  // cs-ch new ui
// $merchant_id= 663209723; //adyen uk
// $merchant_id= 663215188; //adyen uk
//
// $merchant_id= 663210755; //adyen uk big-table
// $merchant_id= 663209524; //adyen uk tiger-bite
// $merchant_id= 663210833; //adyen NZ
// $merchant_id=  663209717; // adyen aus
//
// $merchant_id= 663211748; // adyen us rohit
// $merchant_id= 663208347;// Adyen UK rohit
// $merchant_id= 663210800; // Adyen AUS rohit

// $merchant_id= 1234664; // cs cashflow mid

let merchant_id = 1234782; // Adyen NZ merge ecom mid
// let merchant_id = 663211913; // Adyen NZ merge ecom mid
//  let merchant_id = 663208960;
// let merchant_id = 663211207; //RBS payout test mid
// let merchant_id = 663209734; //sit fh auto debit
// let merchant_id = 663210808; // sit adyen us

const provider = "FH";
const business_name = faker.company.name(); // PHP: $faker->company
const host = business_name.toLowerCase().replace(/[^a-z0-9]+/g, '') + ".com";
const email = "1358fa7e-2067-46a4-82e4-30cad3228b6f@email.webhook.site"; // faker.internet.email() — unused below, kept for parity (payload uses a literal instead, same as the PHP)
const webhookUrl = "https://webhook.site/2ef01d8d-982f-4d8e-b500-0af2310ae473"; // faker.internet.url()
const RedirectUrl = "https://google.com"; // "https://" + host + "/success"
const CancelUrl = "https://" + host + "/cancel";

// NOTE on duplicate keys below (customer_id, and originally token/last4Digits
// in the PHP source): PHP array literals and JS object literals both resolve
// duplicate keys the same way — the LAST occurrence wins. The PHP script
// relies on this to "override" the faker-generated customer_id with a fixed
// test value further down, so the object literal below intentionally keeps
// both `customer_id` entries in the same order to reproduce that exactly.
const payload = {
  // "source": "mobile-app",
  host: host,
  merchant_id: merchant_id,
  // order_id: "87477411",
  order_id: faker.number.int({ min: 500000000, max: 599999999 }),
  // order_id: 8376493739,

  customer_id: faker.number.int({ min: 10000000, max: 19999999 }),

  // customer_id: 14409158, //Adyen uk MIT
  // customer_id: 19685927, //Adyen us MIT
  // customer_id: 13484532, //Adyen au MIT
  // customer_id: 10845159, //cs-ch us mit
  // customer_id: 18314407, //cs uk mit

  // customer_id: 16503046,//cs-ch aus
  // customer_id: "12656968",//cs-ch usa and checkout o2m
  // customer_id: "103167666",//checkout
  // customer_id: "15251896",//cs-ch amex
  // customer_id: "13551048",//spreedly
  // customer_id: "18773734", //adyen uk token
  // customer_id: "17820961",//adyen -uk
  // customer_id: "14860966",//adyen uk non 3ds
  // customer_id: "14677770",//adyen
  // customer_id: "12280770",//adyen USA
  // customer_id: "63154549", //spreedly us
  // customer_id: "15251896",//cs - uk
  // customer_id: "18599579",//cs-uk
  // customer_id: "14097990",//cs uk ireland
  // customer_id: "17385898",//adyen usa 02m
  // customer_id: "111111",//adyen aus
  // customer_id: "488537402",//cs uk
  // customer_id: "103167666",//checkout
  // customer_id: "12230388", // adyen uk
  // customer_id: "10958273", // adyen usa
  // customer_id: "18031813", // adyen aus
  // customer_id: "1234943",//cs-ch usa
  // customer_id: "1234568", //cs-ch new ui
  // customer_id: "63155140", //cs ch saved card
  // customer_id: "63155140",
  // customer_id: "14677770", // adyen uk
  // customer_id: "15390943",// adyen NZ
  // customer_id: "11548667", // Checkout

  // customer_id: "12192297", //Adyen NZ ecom CID
  // customer_id: "19755947", //Adyen NZ ecom CID

  // customer_id: "12876517", // au
  // customer_id: "7976795", // us
  // customer_id: "1637258", // uk
  // customer_id: "19041945", // uk
  // customer_id: "18932081", // adyen us rohit
  // customer_id: "15531193", // adyen uk rohit
  customer_id: "7552009", //

  txnType: "WALLET_RECHARGE_AGAINST_ORDER",
  // txnType: "CREATE_MIT_TOKEN",

  provider: provider,
  email: "automation_test@test.com",
  phoneNumber: faker.helpers.replaceSymbols("07##########"), // PHP: $faker->numerify("07##########")
  name: business_name,
  // Amount: faker.number.float({ min: 10, max: 50, fractionDigits: 2 }),
  AvsHouseNumber: '3', // faker.location.buildingNumber()
  Amount: "45.52",
  // Amount: "0.3",

  // AvsPostcode: faker.location.zipCode(),
  AvsPostcode: 'NN17 8YG',
  // AvsPostcode: '84001', // For USA ZIP code;
  MerchantReference: faker.helpers.replaceSymbols("MerchantReference##########"),
  RedirectUrl: RedirectUrl,
  CancelUrl: CancelUrl,
  // authorisation_type: "PreAuth",
  // txnType: "WALLET_RECHARGE_AGAINST_ORDER", //enable only for wallet +X
  WebhookUrl: webhookUrl,
  customer_joining_date: dateTimeThisMonth(), // PHP: $faker->dateTimeThisMonth->format('Y-m-d H:i:s')
  firstname: "Rohit &*^#*#*# \u{1F612}", // "Rohit &*^#*#*# 😒"
  lastname: "M *&@^@*@*&@ \u{1F634}", // "M *&@^@*@*&@ 😴"
  flat: '3', // (faker.number.int({min:10,max:99})).toString()
  address1: faker.location.city(), // 'address1': '23',
  address2: faker.location.street(),
  // address1: faker.location.city(), // '23'
  // address2: faker.location.street(), // 'NN17 8YG '
  // backurl: 'https://sit-web30-uk.fhcdn.dev/order-now',
  backurl: "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe",

  // txnType: "GIFT_CARD",
  // gcReference: "jkdjkd-djdi-dijd-djdi2393wwqqer34iyy3",
  // order_id: payload.gcReference,

  // token: "mxtoken_iXP-L6kaup-lMsQTLpAxqsVlU42hEetB", //spreedly token for customer id 13551048;
  // last4Digits: "4242", // spreedly last4 digits
  // token: "mxtoken_e15be01cdc153cdd53fd2e5706d572c450fdd5515acd1296f345f0d3bfb19b3a", //spreedly token for customer id 13551048 mastercard;
  // last4Digits: "0000",
  // token: "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323", //cs-ch token for customer id ; 63155140
  // last4Digits: "0821",
  // token: "mxtoken_f69a58e8067e5f2131474a01896b1a664dd20acdb205012a593f7afc549aa7e4", //cs-ch token for customer id 14494880;
  // last4Digits: "0821",
  // token: "mxtoken_f69a58e8067e5f2131474a01896b1a664dd20acdb205012a593f7afc549aa7e4",// cs token - 14097990 - 0821
  // last4Digits: "0821",
  // token: "mxtoken_c7d7d67d270555fedfeff7f89f2a3f49", //cs-ch token for customer id 12656968 mastercard;
  // last4Digits: "0821",
  // token: "mxtoken_a223cf5ae132bf9c5465dc6d45a6b987060dc1f05914cdfab43bf8257e5c2fc5", //adyen uk - 18773734 cus id
  // last4Digits: "1111",
  // token: "mxtoken_f9ebf2866517eee165a0fbfef43760cfdce877a64ab56dff2d877527139b153d",//adyen uk  - 12230388
  // last4Digits: "0005",
  // token: "mxtoken_97cbe48f68fe94b268a1539fb4454931fb0e0e3bf35da692b6d151be9e09dbd0",//cardstream - 15251896 - 0821 card
  // last4Digits: "0002",
  // token: "mxtoken_3qyZiWAEvaSZuaCiwyN36Z-NsCM1Zsur",   //spreedly 63154549
  // last4Digits: "1111",
  // token: "mxtoken_kIgN_lZOhtLeMgmkTf483nFtd_uO5g4m",//checkout 11548667
  // last4Digits: "0000",
  // token: "mxtoken_k7sJpYts2LAdnhB0covGxRYuBm_yNZEe",//checkout 11548667
  // last4Digits: "0821",
  // token: "mxtoken_4b509c5294954328dc7a80b470afa265420e11a03d2ccc5abca03f5f0b5eb784",//cs-ch usa -19621225
  // last4Digits: "0821",
  // token: "mxtoken_05768ed428f98953e33f4ec0cbc0f026cb936aef44e563dd1665d286ec9e24af", //cs- 18599579
  // last4Digits: "0821",
  // token: "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// adyen usa 12280770
  // last4Digits: "5454",
  // token: "mxtoken_94515ccf972eeaaf8426faa85866f700bff786052d772ada654a3f6b10ad51a8", // cs-ch new ui 1234568
  // last4Digits: "0821",
  // token: "mxtoken_b154b0d89e6119e1ad372c2b7360c49a7cd52b6bfc72b970ee860dee6f19379b",//adyen 19652473
  // last4Digits: "0000",
  // token: "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// adyen uk 14677770
  // last4Digits: "5454",
  // token: "mxtoken_4ae72d8438fdb0dea4c78eca6cf8b2f7b9e10b6c1a94007f5ba8d96b47a1defb",// cs uk 488537402
  // last4Digits: "0821",
  // token: "mxtoken_d0182e064aa8de8157c9ecf98844351b9abbd24940be26275a80f9f433ef81db",// adyen us 11130480
  // last4Digits: "0005",
  // token: "mxtoken_e5b1c89a65122a5cef8eeec7db430ecde3320b9a6bcd12c5efeee25039510486",// adyen us 18932081
  // last4Digits: "0005",
  // token: "mxtoken_e5b1c89a65122a5cef8eeec7db430ecde3320b9a6bcd12c5efeee25039510486",// adyen uk 15762470
  // last4Digits: "0005",

  // token: "mxtoken_4b78b7fcb3e0722165379556ee6b96b3671645da8d086a39da8594bbed481571",
  // last4Digits: "4950",

  // token: "mxtoken_0e810f0d1cb2ecc81b72d357f1b05dbb5fb55d6373e843e761f6535c9e4fa2bb",
  // last4Digits: "5454",

  // token: "mxtoken_274dfe3e533779e67d26a83e6ecb02c7507d8006ab7f540c1cbf0f095b9354d7",
  // last4Digits: "0005",

  // token: "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323",
  // last4Digits: "0821",

  // token: "mxtoken_0e20c9a1cbbf43711d163e67a0bcc44239828528aa1c32a510afcc3574575395",// charge back test
  // last4Digits: "5454",

  // metadata: { description: "testing description" }

  // authorisation_type: "PreAuth",
  // statement_descriptor: "",
  // statement_descriptor_address: "",
};

const SplitFee = [
  {
    partner_merchant_id: 663208111,
    type_id: 1,
    value: 1,
    value_type: "amount",
  },
  {
    partner_merchant_id: 663208386,
    type_id: 3,
    value: 0.50,
    value_type: "amount",
  },
  // {
  //   partner_merchant_id: 663208350,
  //   type_id: 3,
  //   value: 0.21,
  //   value_type: "amount",
  // },
  // {
  //   partner_merchant_id: 663208470,
  //   type_id: 4,
  //   value: 4.71,
  //   value_type: "amount",
  // },
  // {
  //   partner_merchant_id: 663208470,
  //   type_id: 5,
  //   value: 5.71,
  //   value_type: "amount",
  // },
  // {
  //   partner_merchant_id: 663208470,
  //   type_id: 6,
  //   value: 0.71,
  //   value_type: "amount",
  // },
  // {
  //   partner_merchant_id: 663208111,
  //   type_id: 7,
  //   value: 18.71,
  //   value_type: "amount",
  // },
];
payload.SplitFee = SplitFee;

// PHP: echo "<pre>"; print_r($payload); echo "</pre>";
console.log("<pre>");
console.log(payload);
console.log("</pre>");

// PHP: $encryptedData = payment_encrypt2($payload); (unused elsewhere in the
// original script — see note above paymentEncrypt2 for why it's a stub here)
let encryptedoldData;
try {
  encryptedoldData = paymentEncrypt2(payload);
} catch (err) {
  console.warn('paymentEncrypt2(): not portable to Node — see comment above the function. Skipped (this value is unused by the active output anyway).');
}

const encryptedData = encryptNew(JSON.stringify(payload));

// $datmanHost = "http://legacy-qa-5.datmanpay.com";
// $datmanHost = "http://legecy-release.datmanpay.com";
// $datmanHost = "https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5";
// $datmanHost = "https://4zwa3ja0i3.execute-api.eu-west-2.amazonaws.com/ws1";
// $datmanHost = "https://sxmpqv8qr7.execute-api.eu-west-2.amazonaws.com/ws7";
// $datmanHost = "https://zwbf0weg3c.execute-api.eu-west-2.amazonaws.com/ws4";
// $datmanHost = "https://ws4.datmanpay.com";
// $datmanHost = "https://ws7-payments.datmanpay.com/pluto";

const datmanHost = "https://ws8-payments.datmanpay.com";

// $datmanHost = "https://stage-fh-1.datmanpay.com";
// $datmanHost = "https://stage-fh-payments.datmanpay.com";
// $datmanHost = "https://stage-fh-1.datmanpay.com";
// $datmanHost = "https://ws5.datmanpay.com/";
// $datmanHost = "https://ws3-payments.datmanpay.com";
// $datmanHost = "https://ws10-payments.datmanpay.com";
// $datmanHost = "https://checkout-ws10.d1zjq3ww98ctjs.amplifyapp.com/";
// $datmanHost = "https://77c25y8fq4.execute-api.eu-west-2.amazonaws.com/ws6";//ws6
// $datmanHost = "http://localhost:3000";
// $datmanHost = "http://legacy-qa-4.datmanpay.com";
// $datmanHost = "http://legacy-qa-3.datmanpay.com";
// $datmanHost = "https://legacy-qa-3.datmanpay.com";
// $phpHost = 'http://localhost';
// $phpHost = "https://ws3.datmanpay.com";
// $phpHost = "https://ws7.datmanpay.com";
// $phpHost = "https://ws1.datmanpay.com";
// $phpHost = "https://stage.datmanpay.com";

const switchHost = 'https://payments.datmanpay.com/switch/api/v1';
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

console.log("<br>");
console.log(`<a href='${datmanHost}/opto/card.php?data=${encryptedData}' target='_blank'>new_encryption</a> `);

// ============================================================
// helpers
// ============================================================

// PHP: $faker->dateTimeThisMonth->format('Y-m-d H:i:s')
// @faker-js/faker doesn't ship a literal "thisMonth" helper, so this
// reproduces it: a random datetime between the 1st of the current month
// and right now, formatted the same way PHP's format() call did.
function dateTimeThisMonth() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const d = faker.date.between({ from: startOfMonth, to: now });
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// PHP:
// function payment_encrypt2($string, $key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj')
// {
//   return urlencode((base64_encode(@mcrypt_encrypt(
//     MCRYPT_RIJNDAEL_256,
//     md5($key),
//     serialize($string),
//     MCRYPT_MODE_CBC,
//     md5(md5($key))
//   ))));
// }
//
// NOT PORTABLE AS-IS. Two separate reasons, both hard blockers:
//   1. MCRYPT_RIJNDAEL_256 is Rijndael with a 256-bit BLOCK size (32-byte
//      blocks). That is a different cipher from AES, which is Rijndael
//      fixed to a 128-bit block — AES-256 means a 256-bit KEY with the
//      same 128-bit block. Node's built-in `crypto` module (OpenSSL) never
//      supported the 256-bit-block Rijndael variant, and PHP's own mcrypt
//      extension that implemented it was removed as of PHP 7.2 — this
//      function is legacy on the PHP side too.
//   2. serialize($string) is PHP's own object/array serialization format
//      (`a:3:{s:4:"host";...}`), which has no built-in Node equivalent —
//      you'd need a PHP-serialize-compatible library on the JS side even
//      before the cipher problem.
// In the PHP script this function's output was computed into
// $encryptedoldData but never actually used by either of the two echoed
// links (the ones that referenced it were already commented out), so it's
// effectively dead code there too. Left here as a stub so the call site
// matches structurally, rather than silently faking bytes that would not
// actually decrypt on the other end.
function paymentEncrypt2(_payloadObj, _key = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj') {
  throw new Error(
    'paymentEncrypt2() is not portable: MCRYPT_RIJNDAEL_256 (256-bit block Rijndael) ' +
    'has no Node.js/OpenSSL equivalent, and PHP serialize() format has no built-in ' +
    'JS counterpart. This function is unused dead code in the source PHP script anyway.'
  );
}

// PHP:
// function EncryptNew($textToEncrypt, $secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', $encryptionMethod = "AES-256-CBC")
// {
//   $iv = substr($secret, 0, 16);
//   $encryptedMessage = openssl_encrypt($textToEncrypt, $encryptionMethod, $secret, 0, $iv);
//   $base64EncryptedMessage = base64_encode($encryptedMessage);
//   return $base64EncryptedMessage;
// }
function encryptNew(textToEncrypt, secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj', encryptionMethod = 'aes-256-cbc') {
  const keyBuffer = Buffer.from(secret, 'utf8'); // 32 ASCII chars = 32 bytes, used as raw key bytes exactly like PHP
  const iv = keyBuffer.slice(0, 16); // PHP: substr($secret, 0, 16)
  const cipher = crypto.createCipheriv(encryptionMethod, keyBuffer, iv);
  // Collect raw ciphertext bytes and base64-encode ONCE on the full buffer.
  // (Encoding cipher.update()'s chunk and cipher.final()'s chunk to base64
  // separately and concatenating the strings — as opposed to concatenating
  // the raw Buffers first — corrupts the result, because base64 groups
  // bytes in 3s and AES block output generally isn't a multiple of 3 bytes.)
  const encryptedBuffer = Buffer.concat([
    cipher.update(textToEncrypt, 'utf8'),
    cipher.final(),
  ]);
  const innerBase64 = encryptedBuffer.toString('base64'); // == PHP's openssl_encrypt() return value
  return Buffer.from(innerBase64).toString('base64'); // == PHP's base64_encode() wrap
}