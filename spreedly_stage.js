const crypto = require('crypto');

// let secret =  'hjkjhkh7897=';
let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; //eg encryption key dev/qa

// const BASE_URL = 'http://localhost:3000/checkout';
// const DEV_BASE_URL = 'https://dev-101-gateway-rn.datmanpay.com';
const BASE_URL = 'https://qa-101-gateway-rn.datmanpay.com/checkout';

let encryptRequest = (data) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};



var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ', randomOrderID);
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2));
console.log('Amount: ', amountNum);

let payload_eg = {
    host: 'example.com',
    order_id: randomOrderID,
    provider: 'FH',
    customer_id: '678907689',
    // '56789689710',
    merchant_id:  '1234572',
    total: amountNum,
    first_name: 'auto',
    last_name: 'test',
    house_number: '347',
    flat: 'Flat 6', //optional
    address_line1: 'Primrose Rise',
    address_line2: 'Lavender Road',
    address: 'flat 6 ',
    postcode: 'NN178YG',
    email: 'testing@testing.com',
    // cc_token: '42Ripj950HHzSZJWiH573uC2dKs', //optional
    // last_four_digits: '9703', //optional
    redirect_url: 
    // 'https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe',
    'https://example.com/redirect', //optional
    cancel_url: 
        // 'https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe',

    'https://google.com/cancel?a=b', //optional
    webhook_url: 'https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net', //optional
    db_total: false,
    reference: 'falskdjfasdlaksjdlasd'
};

// Split Fee Commission (Optional)
const split_fee = [
    {
        partner_merchant_id: '63155457',
        type_id: 3,
        value: 5.0,
        value_type: 'amount'
    },
    {
        partner_merchant_id: '63166985',
        type_id: 4,
        value: 20,
        value_type: 'percentage'
    },
    // {
    //     partner_merchant_id: '1235000',
    //     type_id: 1,
    //     value: 2,
    //     value_type: 'amount'
    // },
    // {
    //     partner_merchant_id: '1234600',
    //     type_id: 2,
    //     value: 1,
    //     value_type: 'amount'
    // },
    // {
    //     partner_merchant_id: '1234700',
    //     type_id: 5,
    //     value: 2,
    //     value_type: 'amount'
    // }
];

payload_eg.split_fee = split_fee;

var token = [
    {
        token: payload_eg.cc_token,
        last_four_digits: payload_eg.last_four_digits,
        master_token: 'mxtoken_MUlegQ_ZTqZ8fOZiSwA2-oayPfkKyuqG',
        billing_address_req: true
    }
];

var base64Data = JSON.stringify({
    currency_sign: '$',
    currency_name: 'USD',
    country_code: 'US',
    // token,
    total: payload_eg.total,
    cancel_url: payload_eg.cancel_url,
    redirect_url: payload_eg.redirect_url,
    billing_address_req: false,
    apay_enabled: true,
    amex_enabled: false,
    diners_enabled: false,
    discover_enabled: false,
    billing_address_req_new_card: false,
    back_url:
    // 'https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe',

     'https://example.com/back-url',
    avs: {
        house_number: payload_eg.house_number,
        postcode: payload_eg.postcode,
        merchant_id: payload_eg.merchant_id,
        last_four_digits: payload_eg.last_four_digits
    }
});

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string
let base64String = bufferObj.toString('base64');

var cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload_eg));

console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`);
// console.log(`${DEV_BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`);
// console.log(`${QA_BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`);