const crypto = require('crypto');
const { faker } = require('@faker-js/faker');

// forming business related values
// const merchant_id = 63189380; // 63155140, 63169827, 1234580, 63189380;
// const merchant_id = 63155480; // adyen - OMNICART
// const merchant_id = 663215805;
// const merchant_id = 663213439;
const merchant_id = 663212350;
// const merchant_id = 663213572; // adyen BP
// const merchant_id = 663207640; // adyen BP - US
// 1234573 - CS CH US Edining
// 663209434 - CS CH US Edining
// 663212494 - edining
// 663209873 - Edining Adyen
// 663212350 - FASTFOOD
// 663212983 - SmeBizness
// 663212985 - Ask4Dish
// 663212454 , 663208350- Quickchow
// 663214243 - GKSOFT
// 663214519 - appcompanion
// 663214585 - EASYEATS
/// 663215161 - Foodninja
// 1234667 - gksoft
// 663215805 - order2online
// - 663217451 - YPSOLUTIONS

const business_name = faker.company.name();

// const host = "https://" + business_name.toLowerCase().replace(/[^A-Za-z0-9]+/g, '') + ".com";
const host = business_name.toLowerCase().replace(/[^A-Za-z0-9]+/g, '') + ".com";

const email = "sundaresan@datman.je"; // faker.internet.email();

const webhook_url =
  "https://webhook.site/011c949f-1f56-4fe8-b8d2-ace98108e198"; // faker.internet.url();

// const webhook_url = "https://www.google.com";

const redirect_url = "https://google.com";
const cancel_url = `https://${host}/cancel`;

const payload = {
  host,
  merchant_id,

  order_id: faker.number.int({
    min: 500000000,
    max: 599999999,
  }),

  // order_id: '355b-6e0d-48c3-b9e9-439752b9b22',

  // customer_id: 9266419, // adyen.  ED506826186- sandbox domain EE508481471
  // 537443785 - appcompanion
  // 593468736 - foodninja
  // 508169730 - order2online
  // 518078222 - YPSOLUTIONS

  customer_id: faker.number.int({
    min: 500000000,
    max: 599999999,
  }),

  // provider: provider,

  email,

  phone_number: `07${faker.string.numeric(10)}`,

  name: business_name,

  // amount: faker.number.float({ min: 10, max: 50, precision: 0.01 }),

  amount: 27.0,

  // avs_house_number: faker.location.buildingNumber(),

  avs_house_number: "347",

  // avs_postcode: faker.location.zipCode(),

  // avs_postcode: 'NN17 8YG',

  avs_postcode: "92837",

  merchant_reference: `MerchantReference${faker.string.numeric(10)}`,

  redirect_url,
  cancel_url,

  cash_payment_url: redirect_url,

  webhook_url,

  // customer_joining_date: faker.date.recent().toISOString(),

  first_name: faker.person.firstName(),

  last_name: faker.person.lastName(),

  flat: faker.number.int({ min: 10, max: 99 }).toString(),

  address1: faker.location.city(),

  address2: faker.location.street(),

  // txn_type: "CREATE_MIT_TOKEN",

  // source: "mobile-app",

  back_url: cancel_url,

  DbTotal: false,

  // source: "mobile-app",

  // token_avs: "",

  // token: "mxtoken_5e12fffa2e08d8ca7022aedb0f05a2e457a5e27937e7b6361dd01fa7d4aedcf2", // adyen OMNICART

  // token: "mxtoken_772fcb53bd163ad1587ca850e55629a91462a6e4107796bd4abe852b43f98cb1", // adyen EDININGEXPRESS

  // last4_digits: "0004", // spreedly

  token:
    "mxtoken_cc0af05ab1dc5afd4e490e39f8adbc8f344a68b597a68850d7840b98b821831d", // adyen EDININGEXPRESS

  last4_digits: "0004", // spreedly

  // last4_digits: "4242", // checkout/supper

  // last4_digits: "0000", // adyen/dna

  // last4_digits: "1111",

  // last4_digits: "0821",
};

// 663215806 - order2online split
// 663217452 - YPSOLUTIONS split 1, 663217453 - YPSOLUTIONS split 2

const split_fee = [
  {
    partner_merchant_id: 663217452, // sandbox BP - US 663212986 - ask4dish //- 663214244- GKSOFT // appcompanion - 663214520  // 663214586 - EASYEATS // FOODNINJA - 663215162
    type_id: 1,
    value: 5.0,
    value_type: "amount",
  },
  {
    // partner_merchant_id: 663176007,

    partner_merchant_id: 663217453, // sandbox BP - US
    type_id: 2,
    value: 1.5,
    value_type: "amount",
  },
];

payload.split_fee = split_fee;

console.log(JSON.stringify(payload, null, 2));

const encryptedData = payment_encrypt2(payload);

// const datmanHost = "https://ws5-payments.datmanpay.com";

// const datmanHost = "https://sandbox-payments-edining.datmanpay.com";

const datmanHost = "https://sandbox-payments-fastfood.datmanpay.com";

// const datmanHost = "https://sandbox-payments-smebizness.datmanpay.com";

// const datmanHost = "https://sandbox-payments-quickchow.datmanpay.com";

// const datmanHost = "https://sandbox-payments-gksoft.datmanpay.com";

// const datmanHost = "https://sandbox-payments-appcompanion.datmanpay.com";

// const datmanHost = "https://sandbox-payments-easyeats.datmanpay.com";

// const datmanHost = "https://sandbox-payments-foodninja.datmanpay.com";

// const datmanHost = "https://sandbox-payments-order2online.datmanpay.com";

// const datmanHost = "https://sandbox-payments-ask4dish.datmanpay.com";

// const datmanHost = "https://sandbox-payments-yps.datmanpay.com";

// const datmanHost = "https://ws11.datmanpay.com";

// https://ws9-payments-edining.datmanpay.com

// const switchHost = 'https://ws3-payments.datmanpay.com/switch/api/v1';

// const switchHost = 'https://ws6-payments.datmanpay.com/switch/api/v1';

const switchHost = "";

const UranusGBPEndpoint = "";
const UranusEUREndpoint = "";
const UranusPhonePayment = "";
const UranusPhonePaymentWin = "";
const PlutoEndpoint = "";

// console.log(`${datmanHost}/barclays/phonePayment.php?data=${encryptedData}`);

// console.log(`${datmanHost}/barclays/onlinePaymentV2.php?data=${encryptedData}`);

// console.log(`${datmanHost}/barclays-irl/onlinePaymentV4.php?data=${encryptedData}`);

console.log(
  `${datmanHost}/opto/card.php?data=${EncryptNew(
    JSON.stringify(payload)
  )}`
);

// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj - FH
// xejPvqKFb50ZMBIN6dVN4Kzin6iymqlk - edining key
// noci1oPw7pKavuPWyqoHiB0RDxE62Y6A - quickchow
// lszOjEGjqUyMjggJUMvzYfELIUnTLWxFlqn
// tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf - Partners Stage key
// HdCl9F84zD8X595j2W3cgJOOs746jXjU - SmeBizness
// 9lY7eSvaKcsoZwc2qz47GIf9a9Cm1XtO - Ask4Dish
// PdCl9F84zD8X5p172W3cgJOOs746jXQm - GKSOFT
// fL1PlF7CS6s6jkXMj31FqIfAmzcKFiqc - appcompanion
// rCeO5yWRS7vh79to7hGeT6n9v8d2NPqk - EASYEATS
// yjulpQucf5qqIx7Ep1tKN76C5Nji3WqR - FOODNINJA
// dVTEP9mTLerN6nKi5o54QYBGXu58b7NG - fastfood
// zr92bu8dCCX4tf3HiquKC0d05L6ThBMi - order2online
// ddLbUhvWBqmUfl9U20mPVf3085ur5Gn4 - YPSOLUTIONS

function payment_encrypt2(
  data,
  key = "dVTEP9mTLerN6nKi5o54QYBGXu58b7NG"
) {
  // PHP mcrypt_encrypt equivalent is obsolete.
  // This is an approximation using AES-256-CBC.

  const keyHash = crypto
    .createHash("md5")
    .update(key)
    .digest();

  const iv = crypto
    .createHash("md5")
    .update(
      crypto
        .createHash("md5")
        .update(key)
        .digest("hex")
    )
    .digest();

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.concat([keyHash, keyHash]),
    iv
  );

  let encrypted = cipher.update(
    JSON.stringify(data),
    "utf8",
    "base64"
  );

  encrypted += cipher.final("base64");

  return encodeURIComponent(encrypted);
}

// function payment_encrypt2(data, key = 'P6VRBHonS12Wsumz6Kpl4J1IuYXS59nO')

function EncryptNew(
  textToEncrypt,
  secret = "dVTEP9mTLerN6nKi5o54QYBGXu58b7NG",
  encryptionMethod = "aes-256-cbc"
) {
  const iv = secret.substring(0, 16);

  const cipher = crypto.createCipheriv(
    encryptionMethod,
    Buffer.from(secret, "utf8"),
    Buffer.from(iv, "utf8")
  );

  let encrypted = cipher.update(
    textToEncrypt,
    "utf8",
    "base64"
  );

  encrypted += cipher.final("base64");

  return Buffer.from(encrypted).toString("base64");
}

// 3ds token - 599486996 - mxtoken_6505c035b30226df3e1b18a0af7808aee8e5ff7c958ee160defe43f0daf8e3e3

// non 3ds token - 565841547 - mxtoken_e1ea0a4b52774ff8789c32893ae594284916ed4b548330b0d90f1b5fac2350c0