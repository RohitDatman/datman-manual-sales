
const crypto = require('crypto');
// let secret = 'wKcbCMfdjX3PPf3dFDdrb6BuQGcVbs4h' //prod
let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF'; //sandbox
// let secret = '7GDCtMJCPApfzWPqKbdHcSu66NWCuvqr';
// let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj' //dev/qa - optomany
// let secret = 'dfp8LUXCkqhtKB5AwxFXXNLewf3xzUMj'
// let secret = 'A*vYA^Jv"Rm8LYR8X^MDt%zBFap_aH'
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
let result = decryptRequest('THM2UzhKUU1rdUY2MVNZcmE1bmRmSi9Xbkx1bG5HSlZqcVpQQWhCUkZjSFpYdjVTb0QxTjdPVDNQbk90OUlzdlB5UHRuUFlhMGp2TGxLTUZQaW45cHc9PQ==');
// console.log(result);return false;

let payload_eg = {
    host: 'example.com',
    order_id: '294482156',
    provider: 'T2S',
    customer_id: '336366',
    merchant_id: '63184000',
    total: '1.01',
    first_name: 'QA',
    last_name: 'Test',
    house_number: '347',
    flat: 'Flat 6', //optional
    address_line1: 'Primrose Rise',
    address_line2: 'Lavender Road',
    address: 'lksjd flask, sdlkfjasld',
    postcode: 'NN178YG',
    email: 'testing@testing.com',
    cc_token: 'egtoken_20122407DK25ZH41PZ93BJJ', //optional
    last_four_digits: '0821', //optional
    redirect_url: 'https://example.com/redirect', //optional
    cancel_url: 'https://example.com/cancel?a=b', //optional
    webhook_url: 'https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net', //optional
    db_total: false, //optional
    reference: 'falskdjfasdlaksjdlasd' //optional
};
let payload = payload_eg;
let host = 'https://stage.dw62m7utw2a83.amplifyapp.com/earth/?data='
console.log(`${encryptRequest(JSON.stringify(payload))}`);

