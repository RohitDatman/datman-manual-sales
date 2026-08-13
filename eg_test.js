const crypto = require("crypto");
let secret = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF"; //hotfix
// let secret = "pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj"; //sandbox
// let secret = "7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr"; //checkout
// let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr'; //prod key
// const BASE_URL = "https://nd-1223-payment-capture-billing-address-hotfix.dw62m7utw2a83.amplifyapp.com/earth";
// let BASE_URL = "https://release.gateway.datmanpay.com/earth"
//let BASE_URL = "https://legecy-release.datmanpay.com/earth"
// let BASE_URL = 'https://datmanpay.com/earth'
//let BASE_URL = 'https://2h0gmrzlbe.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/sale/'

// const BASE_URL = "https://nd-2795-eg-direct-kount-integration.dw62m7utw2a83.amplifyapp.com/earth";
// const BASE_URL = "https://gateway.datmanpay.com/earth";

// const BASE_URL = "http://localhost:3000/earth";
// regression
// const BASE_URL = 'https://nd-3621-node-js-upgrade-from-12.dcthd6fqwlayl.amplifyapp.com/earth';

// const BASE_URL = 'https://nd-3621-node-js-upgrade-from-12.dcthd6fqwlayl.amplifyapp.com/earth';

const BASE_URL ='https://nd-3621-node-js-upgrade-from-12.dw62m7utw2a83.amplifyapp.com/earth';

// const BASE_URL = "https://d1phenr9vd34jn.cloudfront.net/earth";

// const BASE_URL = "http://localhost:3000/earth/addcard";

// Rahul's Build Link
// const BASE_URL = "https://nd-3086-savecardapi-datman.dw62m7utw2a83.amplifyapp.com/earth";


// const BASE_URL = "https://new-amplify-build-from-master.d1aofsz2p36pea.amplifyapp.com/earth";

// Pradeep's Build Link - ND-3489
// const BASE_URL = "https://nd-3194-fix-payment-page-crash.dw62m7utw2a83.amplifyapp.com/earth";

// Build Link for ND-3489
// const BASE_URL = "https://nd-3308-state-wise-logging-3dsv2.dw62m7utw2a83.amplifyapp.com/earth"

// ND-3178
// const BASE_URL = "https://d2xrbv4t73y1mg.cloudfront.net/earth";


// const BASE_URL = "https://nd-3621-node-js-upgrade-from-12.dw62m7utw2a83.amplifyapp.com/earth";



// const BASE_URL = "https://8iog93vmca.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/sale/hosted";


// for earth microservices: postman
// const BASE_URL = "http://localhost:4007/dev/api/v1/sale/create";
// const BASE_URL = "https://c2gpowngf3.execute-api.eu-west-1.amazonaws.com/stage/api/v1/sale/create";

// for earth microservices: frontend
// const BASE_URL = "http://localhost:3000/earth";

// const BASE_URL = "http://localhost:4007/dev/api/v1/sale/create";

// const BASE_URL =  "https://nd-3194-fix-payment-page-crash.dw62m7utw2a83.amplifyapp.com/earth"

// for postman
// const BASE_URL = "http://localhost:4007/dev/api/v1/sale/hosted";


// for frontend
// const BASE_URL = "http://localhost:3000/checkout/pay";

// const BASE_URL = "http://localhost:3000/antar";
// const BASE_URL = "https://nd-2795-eg-direct-kount-integration.d1aofsz2p36pea.amplifyapp.com/earth";

//let BASE_URL = 'https://nd-2795-eg-direct-kount-integration.dw62m7utw2a83.amplifyapp.com/earth'
//let BASE_URL = "https://t2srelease.gateway.datmanpay.com/earth";
//let BASE_URL = 'https://2h0gmrzlbe.execute-api.eu-west-1.amazonaws.com/hotfix/api/v1/sale/create'
//let BASE_URL = 'https://release-2.gateway.datmanpay.com/earth'
//let BASE_URL ='https://nd-1351-3ds-timeout-hotfix.dw62m7utw2a83.amplifyapp.com/earth'
//let BASE_URL = 'https://vz381dai2d.execute-api.eu-west-1.amazonaws.com/dev/api/v1'


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
var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ', randomOrderID)
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))
console.log('Amount: ', amountNum)

let payload_eg = {
    host: "pit-1.t2scdn.com",
    // order_id: randomOrderID,
    order_id: randomOrderID,
    provider: "FH",
    customer_id: "67890887",
    merchant_id: "1235000", //63155140, 63169829, 63155140, 63155126
    // total: amountNum,
    total: 1.00,
    first_name: "qa",
    last_name: "testing",
    house_number: "347",
    flat: "Flat 6",//optional 
    address_line1: "Primrose Rise",
    address_line2: "Lavender Road",
    address: "lksjd flask, sdlkfjasld",
    postcode: "ST67EY",
    email: "qatesting@testing.je",
    cc_token: "mxtoken_29209b0d577c48e5624debd60fd5a64b", //optional // egtoken_22052510TY46GQ24TP04FMF
    // cc_token: "src_ulyrxqfp3whezk4xu4ghvl6czi", //optional // egtoken_22052510TY46GQ24TP04FMF
    // last_four_digits: "0821", //optional
    redirect_url: "https://example.com/?a=b", //optional
    cancel_url: "https://example.com/?a=b", //optional
    webhook_url: "https://webhook.site/6c7973dd-c9df-439f-93c0-4225409a2a9b", //optional
    reference: "1234",
    // cvv: "257",

    // Split Fee Commission (Optional)
    // split_fee: [
        // {
        //     partner_merchant_id: "63155140",

        //     // type_id: One of the below number
        //     // 1 -  Food/ Goods
        //     // 2 - Sales Tax/ Service Fee
        //     // 3 - Delivery Fee
        //     // 4 - Delivery Tip
        //     // 5 - Restaurant Tip
        //     type_id: 1,

        //     // value & value_type: 
        //     // It can be valid amount if value_type = 'AMOUNT'
        //     // Number between 0 - 100, if value_type = 'PERCENTAGE'
        //     value: 4.88,
        //     value_type: "amount"
        // },
        // {
        //     partner_merchant_id: "63153473",

        //     // type_id: One of the below number
        //     // 1 -  Food/ Goods
        //     // 2 - Sales Tax/ Service Fee
        //     // 3 - Delivery Fee
        //     // 4 - Delivery Tip
        //     // 5 - Restaurant Tip
        //     type_id: 2,

        //     // value & value_type: 
        //     // It can be valid amount if value_type = 'AMOUNT'
        //     // Number between 0 - 100, if value_type = 'PERCENTAGE'
        //     value: 4,
        //     value_type: "amount"
        // }
    // ]
};



var token = [
    // {
    //     token: (payload_eg.cc_token).replace("egtoken_", ""),
    //     // token: payload_eg.cc_token,
    //     last_four_digits: payload_eg.last_four_digits,
    //     master_token: "mxtoken_462e5cf60dbed6fd698e69d8fc1860c3",
    //     billing_address_req: false
    // }
];

var base64Data = JSON.stringify({
    currency_sign: "$",
    token,
    total: payload_eg.total,
    cancel_url: payload_eg.cancel_url,
    redirect_url: payload_eg.redirect_url,
    billing_address_req: false,
    billing_address_req_new_card: true,
    avs: {
        // house_number: '',
        // postcode: 'NN17 8YG',
        // merchant_id: '63155140',
        // last_four_digits: '3414'
    }
});

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string
let base64String = bufferObj.toString('base64');

var cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload_eg))

console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`)

// For front-end (Checkout Microservices)
// console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}&via=0`)

// For Postman Testing (Checkout Microservices)
// console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`)

// console.log(`${BASE_URL}/${cardstream_encrypted_payload}`)
// console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}`)


// console.log("Base64: ", base64String + "\n")
// console.log("decrypt:", decryptRequest('c2g0L1g2eEZIRXZ4MXQ4bFpxKzRVYS9ZSW9PaUIwa3BjaHBuVXgvS2xrM1dpSlJwc3FTQ3hGUktaM04wRGs0NjNiTWN3WFV3cml2OE9DUitISVgxaUFwWWtyNCt1K1JkblVxY3NsNmV4ckVCWW11YitMRmVXUjEvcm13SnFaKzA='))
// console.log("payload: ", cardstream_encrypted_payload)
// console.log("payload: ", `${cardstream_encrypted_payload}&response=${base64String}`)
