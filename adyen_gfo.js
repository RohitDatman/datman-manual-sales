const crypto = require('crypto');
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; //staging
// let secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h'; //prod 
// let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; // cpe2e

//let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr';
let encryptRequest = (data) => {
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
  let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer(encrypted).toString('base64');
};

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, 'base64').toString('ascii');
  let encryptionMethod = 'AES-256-CBC';
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (decryptData = decryptor.update(encryptedData, 'base64', 'utf8') + decryptor.final('utf8'));
};

var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ', randomOrderID)
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))
console.log('Amount: ', amountNum)

let gfo_payload = {
  "host": "alphabets.com",
  "order_id": "888457430",
  "merchant_id": "663192104", //63169829, 1234567, 1234580
  "customer_id": "3434352",
  "provider": "FH",
  "email": "qatesting@testing.je",
  "phoneNumber": "8677867878",
  "name": "XYZ Takeaway",
  "Amount": "25.00",
  "AvsHouseNumber": "12",
  "AvsPostcode": "AA11AA",
  "MerchantReference": "LAKDSF29348LAKSDJF",
  "RedirectUrl": "https://www.google.com",
  // "CancelUrl": "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  "WebhookUrl": "https://webhook.site/bce9e8cb-dee2-47de-8330-ffcc36a1f3e2",
  "customer_joining_date": "75757667",
  "firstname": "Dharmesh",
  "lastname": "Gandham",
  "flat": "12",
  "address1": "address 1",
  "address2": "address 22",
  "gatewayParameters": {
    "gateway": "GFO",
    // checkout GFO
    // "instrumentToken": {
    //   "signature": "MEQCIBtnmHwFLIQWar9JhPCh4IgssLatzwxPLpopKLYWPHD5AiAmFx2kTFhAcZXbYGgDc+6PGaqDhb+f1RR/rmAt4mWS+g==",
    //   "protocolVersion": "ECv1",
    //   "signedMessage": "{\"encryptedMessage\":\"IAwQZx24KMA/tEAkuBO1JiAI0uB8DTy0OqFHIXKOmjsUF+iBEz6AP+y5Eh2mL2k0Ljl4ATgS1pSiFdHW/OQzsdlGKDfaX1/ZrlLLZsNjNYb8U1kqYdKRM7kNTQZmhFjLRKAvD48TmCEPjwZk2vN7kEKFFVMOIXLiz5HtcxHqwwqgfNMMPmmRysJYeJc9jDsdXJYkJC3EA2lO4c+TvFLy5o8vBBkvcsUf7NVjYMM3/l2GEZ5BTON1GJxL4rGTusajiL4N6KZjYS2NmExsuywAKmtpCjSaN4cXXMAthHN70HYuqwdrBxurf5SwyjiPQMWtCnW3PLW83zJk2lJlgnAzJ7TEq0rrAsuO3HdIlKLEOx2Fdo4BUmwn+hysXWobBBp6CHNUdku3bbZhKO+vAtolOCfqd0HCN/Yy7ZyeU4yDjmMGgC5n9DCuV3wCNhv+hFD/b/QpsL9ctqCc4lUK1uXaC6AD1oc/kFbANrolCnKv\",\"ephemeralPublicKey\":\"BBKvwSjlV9mw03GviP0bbFJLJnCCU524i5Utao93uppcmAR8H/gcrokqldXcDbXTDkrK/5D+NbRCTt/0kKtxyjo\\u003d\",\"tag\":\"Q88LROmZ4kPwA9vumKuyzdbXsThizHuzun4x8NZsNbA\\u003d\"}"
    // }
    "instrumentToken": {
        "signature": "MEUCIHk9Dz/VOwB9lkD/p0PNKipdXKs9RwXc+/qz0hBSns1MAiEA6SJFHitGlnxNeYDJ2+LAUvrBAqGxSbKCu5XwTBPslJM=",
        "protocolVersion": "ECv1",
        "signedMessage": "{\"encryptedMessage\":\"ZYh+eaf35d26pKwm7nwqptnfIJuhhgltWFFCVp8aGvS9hKexfTJPqxbD8JJ/+OYmmvkJ0r2cuRYq3JRvtsup9J/uGjCkC9eHzdADFEqzR5+lVm1u6hBMCXscFb0R318+gXBsjPPU5GQKgU4r9hF6ldqXx7VDP8i6jthIEE1P8jWG7fE7UeEFSJ5aQOM+Kyn2LPP7q/zmM0i4FvjqM0d4yYUI6DX4TXKjmegVtwr8m/onAqYls5TQ2WkYnVRxKb4hE6uhwCd5s4QUxom/uckDly1qg3Ibki6prZHPG9JNDUij4CUri+jnYmgzqR+6Ewbocvtsh1qmubR5Dp5UD/6jkjy0PbIDt6jH7imjwotsDTD4kqASI3z2WodzyvEnbQkeRPvkqTxttItvthkqITk5Yua3xQr1aihHOUKt3T2TO4oJkTbu8nllL8SxFjjGFKZghkHgkPRNGUg3YCB2F1KM08A6DK9r5NGJRb132aWV\",\"ephemeralPublicKey\":\"BMgiBovoNKCXwTUjBfBomMShZDgInyMnhUDV+rPyJ+UiRvxDSjMbNAGDVIF4ZZY61bcJttU7mErWkIjgag1ehwY\\u003d\",\"tag\":\"Po0emyiwGMDsbDWW/y5l97hr7eNAOjfJMya02vm50uU\\u003d\"}"
      }
    }

//     "instrumentToken": {
//         "signature": "MEYCIQCg4GepGo062kLlt4ng21K15zCrDYqKBHbOpkyxEL23eQIhANdaRkvgkK2q4nf+pWvUen3WB2mWY44RUNEreQ6OvIJ/",
//         "protocolVersion": "ECv1",
//         "signedMessage": "{\"encryptedMessage\":\"neUEuMbEP69fCHTC8IDj7rCjtgCYBk8VJlU3stsbyowbzpge6YNa197JXosd0DVJlr6CTXQxGrmsR+IZtrsDp9xBm5PmlJkm5DTHw5yyQn5JRJPUwZSMpIAUC6Z9nxtlbIRgdwmfF5JEux8GXV0Czzu55gNYKpy2n41gi2iyqjdInIHuQlppLmPtWrx5aMxoBR1NP9ujV1BswhW+8MY5rYZxSzSV5aMWjEwj+tBnC7RAkxJ3qx5bwGr3mL927x49PCLQnqBP2Z3RroIwD8D5uRDWjkbLUh4zfs6rFPC9QdHD8ydEx3W7ktYd/rshGNWZKUci7ydqIbs/zp+/PZ27xusnoKHnVlAYs577CE4QsjlDHSnyV2wLCppgdSySJfLvvt6PXn46WV+Ph/gfU8DuMMOHofILG/e/Sv0HWtVp+xxouEMrPlNOq1Y95iApR9raoF/3NjI75G9jyFRNN31GTcihqb0LdTA0dWWuedw/HBfDQJSg3K5fUJ+tyqOgvDlNflbiC0++5K/qXMwTbti2hC7tsTKRDL+O012qQcugbFLpM9Bo1ixY\",\"ephemeralPublicKey\":\"BHDPFPjtWEgFkmLrTf413EPZDUFv77hl3gQvaM4lbC0/0odLPhsSKq3kwe7Igh43zzyUYVk1en8ZqkPpZidKJ1Y\\u003d\",\"tag\":\"7wYM9UfEqAtlGmEc0mgpZqQtZPersSscgS+OTJME7Tw\\u003d\"}"
//       }
//   }
}

let SplitFee = [
  {
    // "partner_merchant_id": "63155457",
    "partner_merchant_id": "663192253", // sandbox
    "type_id": 1,
    "value": 2.00,
    "value_type": "amount"
  }
  ,
  {
    // "partner_merchant_id": "63166985",
    "partner_merchant_id": "663192253",  // sandbox
    "type_id": 4,
    "value": 3,
    "value_type": "amount"
  }
]

gfo_payload["SplitFee"] = SplitFee

console.log(`${encryptRequest(JSON.stringify(gfo_payload))}`);
