const crypto = require('crypto');
// import { b64dec, b64enc } from 'crypto-js';


async function getPublicKey() {
    const pem = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1GQ3ThF4jR753EAiUs70
    WJdjS5gf5L9TujER23KIzC14F+n7MUH4RkfwvSM/tASLZ3jysdwT8C8cw06P2JnG
    QHIB5cHYVHqz4ySOQwXvobfXVSlvDln9acLpx0+N/VH3/AHb+oaWCFQujBHY334r
    DDdL/twlC3IdK0EGW39xLUHo9RZQO2Ij4/l9VYzICxwl9HwGcVVe49E82c/odaCc
    d0q4ZdItGcAJwMWb62p76eZM0Fsj3nANBj2fUpSEvM2I/xgY/7JlDOqQUOZiCgQg
    bOJcdhvxYjIVHMXclKJQ3AzN9EPFjm7c+bIqQZlKxqRhs8ZAs5/EZu+yEeXAoEsa
    kwIDAQAB
    -----END PUBLIC KEY-----`;
    const b64 = pem.replace(/-----.*?-----/g, '').replace(/\s+/g, '');
    const raw = b64dec(b64).buffer;
    return crypto.subtle.importKey('spki', raw, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']);
}
const b64enc = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const b64dec = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

// cardnumber : 
//5301250070000191 - master 
// 4929421234600821 - visa 
//3540599999991047 - JCB
// 2222400070000005 - master card adyen 

const cardObj={ "card_number": "2222400070000005",
    "cvv": "737",
    "exp_month": "03",
    "exp_year": "30"
}
// encrypt payload (card JSON)
 async function encryptCardPayload(cardObj) {
    // 1. fetch PEM public key from server
    const rsaPubKey = await getPublicKey();

    // 2. generate AES-GCM key (256 bits)
    const aesKey = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true, // extractable because we will export raw key to encrypt with RSA
        ['encrypt', 'decrypt']
    );

    // 3. export raw AES key to encrypt it with RSA
    const rawAesKey = await crypto.subtle.exportKey('raw', aesKey); // ArrayBuffer

    // 4. encrypt the AES key with RSA-OAEP
    const encryptedKeyBuf = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, rsaPubKey, rawAesKey);

    // 5. encrypt the data with AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV recommended
    const encoder = new TextEncoder();
    const plaintext = encoder.encode(JSON.stringify(cardObj));

    // cipherBuf contains ciphertext + auth tag (appended)
    const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv, tagLength: 128 }, aesKey, plaintext);

    // 6. return base64 payload pieces
    return {
        encryptedKey: b64enc(encryptedKeyBuf),
        iv: b64enc(iv.buffer),
        ciphertext: b64enc(cipherBuf)
    };
}

const encryptedCardPayload = encryptCardPayload(cardObj).then(res => {
console.log(JSON.stringify(res, null, 2));});
// <!-- }); -->
// console.log(encryptedCardPayload);