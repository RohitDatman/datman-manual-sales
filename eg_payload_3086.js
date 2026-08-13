const crypto = require("crypto");
const BASE_URL = 'https://ws5-gateway.datmanpay.com/earth/addcard';
const secret = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF";

const payload = {
    reference: "7678768987",
    customer_id: "345674657",
    country_code: 'GB',
    redirect_url: "https://example.com/",
    back_url: "https://example.com/",
    webhook_url: "https://webhook.site/107a776f-8b1d-4316-a238-3bff227d116c"
}

const base64Data = JSON.stringify({
    avs: {
        house_number: 'Flat 6',
        postcode: 'NN17 8YG'
    },
    billing_address_req: true,
    billing_address_req_new_card: true
});

const bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string
const base64String = bufferObj.toString('base64');

const encryptRequest = (data) => {
    const encryptionMethod = "AES-256-CBC";
    const iv = secret.substr(0, 16)
    const encryptor = crypto.createCipheriv(
        encryptionMethod,
        Buffer.from(secret),
        iv
    );
    const encrypted =
        encryptor.update(data, "utf8", "base64") + encryptor.final("base64");
    return Buffer(encrypted).toString("base64");
};
const cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload));

console.log(`${BASE_URL}?data=${cardstream_encrypted_payload}&response=${base64String}`)