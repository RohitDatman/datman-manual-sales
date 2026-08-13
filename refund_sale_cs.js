const crypto = require('crypto');
let secret = 'p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF' //eg encryption key dev/qa

let encryptRequest = (data) => {
    let encryptionMethod = 'AES-256-CBC';
    let iv = secret.substr(0, 16);
    let encryptor = crypto.createCipheriv(encryptionMethod, Buffer.from(secret), iv);
    let encrypted = encryptor.update(data,'utf8','base64') + encryptor.final('base64');
    return Buffer(encrypted).toString('base64');
}

let payload_eg = {
  "order_id" : "11124111",
  "merchant_id" : "63155140",
  "amount" : "11.00",
  "reason" : "testing",
  "host" : "FH",
  "silent": true
}

console.log(encryptRequest(JSON.stringify(payload_eg)))
