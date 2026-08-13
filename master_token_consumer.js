const cryptoD = require('crypto');
var encryption_key = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF"


var masterTokenPayload = {
    card_number: "4929421234600821",
    expiry_month: "12",
    expiry_year: "21",
    cvv: "356",
    provider: 'OPTOMANY',
    provider_token: "W57/7yf8k81HHH9GUnoSZ6G6RvelaIqps83nlw3iTBMfMQ==",
    last_4_digit: "0821",
    customer_id: "71691150",
    other_provider: 'CARDSTREAM',
    first_name: "Ishika",
    last_name: "Garg",
    postcode: "NN178YG",
    email: "ishika@mypay.co.uk",
    address: "Flat 6 Primrose Rise 347 Lavender Road Northampton",
    master_token: "mxtoken_37c9d04e2141958ad1969bcc4f930019"
};

const encryptPayload = (data, secret) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = cryptoD.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};

let payload = encryptPayload(
    JSON.stringify(masterTokenPayload),
    encryption_key
);

var objectstring = {
    payload
}

console.log(objectstring)