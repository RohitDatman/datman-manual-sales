const crypto = require('crypto');
const PLUTO_ENDPOINT = 'https://nd-1576-pluto-migration.dw62m7utw2a83.amplifyapp.com/pluto';
const SECRET_KEY = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF';

const encryptPayload = (data, secret) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
};

function plutoDirectScript(){
    let cardstreamOpto_payload = {
        host: 'example.com',
        order_id: '21149934',
        provider: 'FH',
        customer_id: '1234',
        merchant_id: '63155140',
        total: Math.round('14.00' * 100) / 100,
        first_name: 'Ishika',
        last_name: 'Garg',
        house_number: 'Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex',
        flat: '12',
        address_line1: 'Stock on',
        address_line2: 'Trend',
        postcode: 'HA27 8HJ',
        email: 'ishika@mypay.co.uk',
        redirect_url: 'https://example.com/redirect',
        cancel_url: 'https://example.com/cancel',
        db_total: false,
        reference: 'fcjenr43r32423r34cn4x4x',
        webhook_url: 'https://dc0ada0574b780b4a3ea40c7372b1696.m.pipedream.net',
        address: 'Unit 10 Pickwick Walk Uxbridge Road Hatch End Middlesex',
        cc_token: 'zPd88hZaItJp/EmQwN4v1CNDeY+adU0/eugRgg5/b2EfMQ==',
        last_four_digits: '9909'
    };
    
    let token = [
        {
            token: cardstreamOpto_payload.cc_token,
            last_four_digits: cardstreamOpto_payload.last_four_digits
        }
    ];
    
    let cardstream_optomany_encrypted_payload = encryptPayload(
        JSON.stringify(cardstreamOpto_payload),
        SECRET_KEY
    );
    
    var base64Data = JSON.stringify({
        currency_sign: '£',
        token,
        total: cardstreamOpto_payload.total,
        cancel_url: cardstreamOpto_payload.cancel_url,
        redirect_url: cardstreamOpto_payload.redirect_url,
        provider: 'OPTOMANY'
    });
    
    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(base64Data, 'utf8');
    
    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString('base64');
    return `${PLUTO_ENDPOINT}/?data=${cardstream_optomany_encrypted_payload}&response=${base64String}`;
}

console.log(plutoDirectScript())