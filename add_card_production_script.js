const crypto = require("crypto");

// Define the base URL for the API endpoint
const BASE_URL = 
// 'https://gateway.datmanpay.com/add-card';

'https://gateway.datmanpay.com/add-card';
// 'https://gateway-b.datmanpay.com/add-card'

// dr environment

// 'https://gateway-dr.datmanpay.com/add-card';


// 'https://dr-gateway.datmanpay.com/add-card'

// 'https://gateway-dr.datmanpay.com/add-card'
//https://ws5-gateway.datmanpay.com/add-card

// Secret key for encryption and other payload details
const secret = '7nu67EKnU6niCEHjqApfR6EEZ63SgWaC';
// Payload data to be sent in the request
const countryCode = "US";
const payload = {
    reference: "7376374383", // Reference accept only numbers up to 16 digits
    customer_id: "382628383", // CustomerId accept only numbers up to 16 digits
    countryCode: countryCode, // relay on country table
    RedirectUrl: "https://example.com", // URL to redirect after processing
    // RedirectUrl: "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe", // URL to redirect after processing
    WebhookUrl: "https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net"
    // "https://webhook.site/633d1403-035d-4238-828c-d8930cd26956" // URL for webhook notifications
    // WebhookUrl: "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe" // URL for webhook notifications
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
    // backurl: 'https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe',  // Request for back url from add card
    countryCode: "US" // ecncrypted countryCode and base64Data country code should be same
});

// Encode the Buffer as a base64 string
const bufferObj = Buffer.from(base64Data, 'utf8');
const base64String = bufferObj.toString('base64');

// Construct the final URL with encrypted payload and base64 data
console.log(`${BASE_URL}?data=${cardstream_encrypted_payload}&base64Data=${base64String}`);