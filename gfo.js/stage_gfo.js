const crypto = require('crypto');
// let secret = 'tgk0qDEIQxh6Pjgrrheg0nYgE00ezedf'; //staging 
let secret = 'pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj'; // cpe2e



// pSk0qDEIQxh6PjgSSheg0nYgE00ezwkj

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

var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ',randomOrderID)
var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))
console.log('Amount: ',amountNum)

let gfo_payload = {
  "host": "alphabets.com",
  "merchant_id": "663207658",
  "order_id": "657897678979",
  "customer_id": "2323412",
  "provider": "FH",
  "email": "qatesting@datman.je",
  "phoneNumber":"8677867878",
  "name": "XYZ Takeaway",
  "Amount": "21.00",
  "AvsHouseNumber": "12",
  "AvsPostcode": "AA11AA",
  "MerchantReference": "LAKDSF29348LAKSDJF",
  "RedirectUrl": "https://www.google.com",
  "CancelUrl": "https://www.google.com/search?q=datman&source=lnms&tbm=isch&sa=X&sqi=2&ved=2ahUKEwjx3MyrwYP1AhULJrkGHYGvByQQ_AUoAXoECAEQAw&biw=954&bih=969&dpr=1",
  "WebhookUrl": "https://www.google.com",
  "customer_joining_date": "75757667",
  "firstname": "first name",
  "lastname": "last name",
  "flat": "flat",
  "address1": "address 1",
  "address2": "address 22",
  "gatewayParameters": {
    "gateway": "GFO",
    "instrumentToken":   
   
   

    {
      "signature": "MEQCIHWaGRZgizrY19ahzxCI1b4IgpvxXkzwk83IqHXiz0UiAiAXpLk5Y6tQmcQ+hp6klTnCRXQCWkZxW/RBfDrsbrz2uQ==",
      "protocolVersion": "ECv1",
      "signedMessage": "{\"encryptedMessage\":\"RZq+BtGMkRp/WZbLQitbIh4fK3omhG+Il1Tuma0QmDCbNI4vxf5tppqJFembhlHF8d7zyJ6poSpCi97dsPiqXbkoI2eaQY1yGLZOR9syiwMDZe1fVaaSrrjpZJbPFNqNBQM4TRWhRwiQzaxuTAB0IAesvLwOMD9unythqttZC1vyD12NcqN83ZWIOlBbzmQ0Sb2N8KVk5jcKZ2TfGNqd+0DBi4zWF42NwcIBlYBoCAVvuNKvOtRJ05/esnhzCvVlUMlJTKtTU4ApJpoIH0zTfun7UbBxIvNLm3FN6luh9IV/kbKY7V2jCWMvaHHflEuEnde0pciaGGP6eScKLSmqT2HQ65bT3Btr2vW0KQCpauChzbXG+W5HVF1U64YXuQX63KlqhvXWlusKSDB5QQS4FskcJKz1zG8vn+GVC+29CN9V7owzHgjDBISY7JOYiw/HJSuBqnqTo1ulM6FZrYJ5B6HSQG3qL65DK0DTG9U+MvEGLYqFCGY0Gew3H/k63+sXFEWlOrnpvLcng7n9n7rHeTLEozDz+cJBg25gHfuvQNPjJFGDgEFqwA\\u003d\\u003d\",\"ephemeralPublicKey\":\"BF6dpIOwjlYlmQRUV0BIaIXc/0H6laAdwzcA4XtL4JA8op+sAMcr9Qcax0IHviABmI0ZkaGm5q/Ac5NnAJgmdW8\\u003d\",\"tag\":\"D5lCuwdb4sMsjJYDPPOJRp/Mv1exU67sWbKPG7p2Om4\\u003d\"}"
    }

    //instrumentToken value should be generated from the google_adyen_token PHP script
    
    
    
  }
}

console.log(`${encryptRequest(JSON.stringify(gfo_payload))}`);