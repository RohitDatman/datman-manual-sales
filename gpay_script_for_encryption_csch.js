const crypto = require("crypto");
// let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"; //staging
// let secret = 'tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf'; //staging New key
let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"; // cpe2e

//let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr';
let encryptRequest = (data) => {
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(
    encryptionMethod,
    Buffer.from(secret),
    iv
  );
  let encrypted =
    encryptor.update(data, "utf8", "base64") + encryptor.final("base64");
  return Buffer(encrypted).toString("base64");
};

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, "base64").toString("ascii");
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (decryptData =
    decryptor.update(encryptedData, "base64", "utf8") +
    decryptor.final("utf8"));
};
// 663208906,663208546,663208390 - adyen AUS
var randomOrderID = JSON.stringify(
  Math.floor(100000000 + Math.random() * 900000000)
);
console.log("OrderID: ", randomOrderID);
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2));
console.log("Amount: ", amountNum);

let token_pay_payload = {
  host: "alphabets.com",
  // 663208347 - Adyen UK
  // 665000067 - CS-CH
  // 663209459 - cs-ch
  // 1235001 - cs
  merchant_id: "1235001", //63169829, 663191808, 663191808, 63155140
  order_id: randomOrderID,
  customer_id: "7834747793",
  provider: "FH",
  email: "rohit@datman.je",
  phoneNumber: "8677867878",
  name: "XYZ Takeaway",
  DbTotal: true,
  Amount: "10.00",
  AvsHouseNumber: "12",
  AvsPostcode: "AA11AA",
  MerchantReference: "LAKDSF29348LAKSDJF",
  RedirectUrl: "https://www.google.com",
  FailureUrl: "https://www.google.com/failure",
  CancelUrl:
    "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  WebhookUrl:
    "https://webhook.site/c49c68ef-6b95-4124-be39-25ed645909b9)https://webhook.site/c49c68ef-6b95-4124-be39-25ed645909b9",
  customer_joining_date: "75757667",
  firstname: "Rohit",
  lastname: "M",
  flat: "flat",
  // txnType: "WALLET_RECHARGE_AGAINST_ORDER",
  address1: "address 1",
  address2: "address 22",
  // authorisation_type:"PreAuth",
  gatewayParameters: {
    gateway: "googlepay",
    instrumentToken: {
  "signature": "MEUCIBlREKHrpEgi87i0/UGy/f33hiM519IBex9j5sDEJj//AiEAjoh1PFBgf54OX2mJKDEIBUiWx/hH/+cVzYpMWSahRRU=",
  "protocolVersion": "ECv1",
  "signedMessage": "{\"encryptedMessage\":\"d+vzefSZvvsScc7v5rpOBSEBnMtsl/s0ZXXEVaVKofLRHa4+0S4/4QFARXDW0P5wAwMvJGZf8DhlaVUVTWyCaSwPds0E7+a908gB4JLbxEv4HaX+Jj3t6G/481CyiNJr7c8QpJDhCEZz3kr/pmpbCwhf5L3KWdpc/IgFOYDT5B1Ur0gajeNGWbst8U4HwTH8USDGP3NwBIKgM5f7gqAWhFqshA5ZNHjvGVZE2q63hKzFdtR1N5MCsA21cg98m0svkEaPF1BG6adOGJVP6YLjLIMymlfIlBoSdC5DS1do1P2X4EtwSxqrUUr5nTiSzvAedoUrrKnAKTVeI/0e1FPAgpWEzFsr2XktfywVfbL/xVmRVmlF8p3/WqTWaZlFEpNse4nDdpzzxuGjKSqm87EuPky779nDbgAvOqmIu1dP91zvAd4IkTvlcH2MfsrB5Pi9I7LqzDtT3+Vv\",\"ephemeralPublicKey\":\"BC3y3ReqDo0rB6/Pcrur7c2GvIeOIDnjIX6uv9iuNyhkqaw2ULxdJu+TtBBiWw/a0gQVO0MJ2mBXyRpbzMg2vfs\\u003d\",\"tag\":\"xlGRKEmN3QNyrKOnBcQUyJhwRsx0NZTbraVLsgyJfnE\\u003d\"}"
},
    "billingAddress": {
      "address1": "1",
      "address2": "",
      "address3": "",
      "administrativeArea": "",
      "countryCode": "GB",
      "locality": "Stoke On Trent",
      "name": "Dharmesh Gandham",
      "phoneNumber": "+44 7446 411868",
      "postalCode": "ST4 3NR",
      "sortingCode": ""
    },
    "risk": {
      "device_session_id": "dsid_tcwec2uftlqebh4c2rrci5ah2a",
      "k_device_session_id": "e40ca6b4c63c4c17a21ecb88aaa85c8d",
      "device": {
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        "network": {
          "ipv4": "unknown",
          "ipv6": "2a00:23ee:2528:71cc:717a:a493:953a:51a",
          "tor": false,
          "vpn": false,
          "proxy": false

        },
        "provider": {
          "id": "e3f4914b-9ea2-4bc2-bbbb-99a2f0705c13",
          "name": "deviceinfo.js",
          "timestamp": "2025-05-19T09:26:41.340Z",
          "timezone": "Asia/Calcutta"
        },
        "virtual_machine": false,
        "incognito": false,
        "jailbroken": false,
        "rooted": false,
        "java_enabled": false,
        "javascript_enabled": true,
        "language": "en-US"
      }
    }
  },

  SplitFee: [
    {
      partner_merchant_id: "663208546",
      type_id: 1,
      value: 1.01,
      value_type: "amount",
    },
  ],
};

console.log(`${encryptRequest(JSON.stringify(token_pay_payload))}`);
