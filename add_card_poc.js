const crypto = require("crypto");

// Define the base URL for the API endpoint
const BASE_URL =  
'https://stage-fh-gateway.datmanpay.com/add-card'

// 'https://ws7-gateway.datmanpay.com/add-card';

// Secret key for encryption and other payload details
const secret = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF";
// Payload data to be sent in the request
const countryCode = "GB"; //AU/US/GB/IR
const payload = {
    reference: "937384734", // Reference accept only numbers up to 16 digits
    customer_id: "937384734", // CustomerId accept only numbers up to 16 digits
    countryCode: countryCode, // relay on country table
    RedirectUrl: "https://example.com", // URL to redirect after processing
    WebhookUrl: "https://577f20eb63fd607cb01a53534be8a41e.m.pipedream.net", // URL for webhook notifications
    merchant_id : "663208347",
    // txnType : "CREATE_MIT_TOKEN"
}

// Function to encrypt the request payload
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

// Encrypt the payload and get the encrypted payload
const cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload));

// Constructing base64 encoded data for AVS and billing address details
const base64Data = JSON.stringify({
    backurl: 'https://example.com',  // Request for back url from add card
    countryCode, // ecncrypted countryCode and base64Data country code should be same
});

// Encode the Buffer as a base64 string
const bufferObj = Buffer.from(base64Data, 'utf8');
const base64String = bufferObj.toString('base64');

// Construct the final URL with encrypted payload and base64 data
console.log(`${BASE_URL}?data=${cardstream_encrypted_payload}&base64Data=${base64String}`);
