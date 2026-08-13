// // UK accounts:
// // 663191847
// // 663207634
// // 663207654
// // 663207730
// // 663208347
// // 663208407
// // 663208964

// // USA accounts:
// // 663208350
// // 663208386
// // 663208394

// // AUS accounts:
// // 663208906
// // 663208546
// // 663208390

const crypto = require('crypto');
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; //staging
// let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; //staging New key

let encryptRequest = (data) => {
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(
    encryptionMethod,
    Buffer.from(secret),
    iv
  );
  let encrypted =
    encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer(encrypted).toString('base64');
};

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, 'base64').toString('ascii');
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (decryptData =
    decryptor.update(encryptedData, 'base64', 'utf8') +
    decryptor.final('utf8'));
};

var randomOrderID = JSON.stringify(
  Math.floor(100000000 + Math.random() * 900000000)
);
var randomCustomerID = JSON.stringify(
  Math.floor(200000000 + Math.random() * 900000000)
);
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2));
// console.log('Amount: ', amountNum)

var instrumentToken =

{
  "signature": "MEUCIQCZoVWNvYQOapDkGCeqno7RiuQXPiihy5Jtve9y7Y4mDgIgIN+z1M2HRs5jT6HPNqufboZ63660ns2+XMUhY0/6pN0=",
  "protocolVersion": "ECv1",
  "signedMessage": "{\"encryptedMessage\":\"Eq86XVc326cyuetO+93EUnF88UmJFtF6TFgDZCgpWNOG7IrgIWl4twXFXsSSBfH7e/+BIZV+/j+MICiwpfaAqlwzWf5n/rziXNEHBN7L+MyYKz4HVUUg99gEnhITacaskJEs8QihM2GBEs304n212eYqh1AKhalao2zorKWi9encdEhgiZf2hv65XCp6uhlwqFUbec+SW4/8mkAzupLQmvkTjmix8v88rZT54ehdjwczwFDlaPjKFh5kS8lFubUim1UcXjAQ1wpFYB/bUNGFcOPu1hk9ugUyH8QN0hH0dHrBTEipBhi/jlncwpcSqrDSnXAZ9wDLACmWu8cbRrwi/Eopsvh3GY7tq1+0kAiYiM6owDzYePd+PaawqtaXgoNK0IO+mDmCJ4cltn/Xzrgm+B897TUo7dst8Ij2goki4JlDqbvgHP2F5Kyk1Zr6TEryczMuDoLxH5vqRgKtWSymrJl4XS3hiaBAKA1JCJCQVVZ6qcn0ZpUpOiwMg2uCV07ZbzRnEi5uwBhvmM1CyQ91\",\"ephemeralPublicKey\":\"BKXzvSFdGzcjE6wbtMCDaDDyWYWLYn7RgY+QQ+hB2qE92Io23c4CiJUyZfqG5x+e5213vihUu9/nNByYJ7oAPCU\\u003d\",\"tag\":\"KAsCS9hHqADFBNGXatFdnJXCnIVn6Ff2dkZeC03s4yU\\u003d\"}"
};
let token_pay_payload = {
  host: 'alphabets.com',
  merchant_id: '663208386',
  order_id: randomOrderID,
  customer_id: randomCustomerID,
 source: 'mobile-app',
  provider: 'FH',
  email: 'krithika.r@datman.je',
  phoneNumber: '8677867878',
  name: 'XYZ Takeaway',
  Amount: '10',
  AvsHouseNumber: '12',
  AvsPostcode: 'AA11AA',
  MerchantReference: 'LAKDSF29348LAKSDJF',
  RedirectUrl: `https://order.t2sonline.com/payment.php?simple=1&bSuccess&id=${randomOrderID}`,
  CancelUrl:
    'https://order.t2sonline.com/payment.php?simple=1&bFail&id=' +
    randomOrderID,
  WebhookUrl: 'https://www.google.com',
  customer_joining_date: '75757667',
  firstname: 'krithika',
  lastname: 'testing',
  flat: 'flat',
  address1: 'address 1',
  address2: 'address 22',
  // txnType: 'WALLET_RECHARGE_AGAINST_ORDER',
 "deviceInfo": {
        "deviceChannel": "browser",
        "deviceScreenResolution": "1512x982x30",
        "deviceIdentity": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "deviceAcceptContent": "application/x-www-form-urlencoded",
        "deviceAcceptEncoding": "gzip, deflate, br",
        "deviceAcceptLanguage": "en-US",
        "deviceTimeZone": 100,
        "deviceColorDepth": 30,
        "deviceScreenHeight": 982,
        "deviceScreenWidth": 1512
    }  ,
  gatewayParameters: {
    gateway: 'googlepay',
    // "gateway": "GFO",
    instrumentToken: instrumentToken,
  },
  SplitFee: [
      {
          partner_merchant_id: "663210814",
          type_id: 6,
          value: 1.01,
          value_type: "amount",
      },
  ],
};

// console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);

var payload = {
  data: `${encryptRequest(JSON.stringify(token_pay_payload))}`,
};

console.log(JSON.stringify(payload));
console.log('OrderID: ', randomOrderID);
console.log('CustomerID: ', randomCustomerID);
