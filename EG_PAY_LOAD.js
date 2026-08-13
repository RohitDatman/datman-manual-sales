const crypto = require("crypto");

let secret = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF"; //hotfix
let BASE_URL = 'https://ws1-gateway.datmanpay.com/earth';


let encryptRequest = (data) => {
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let encryptor = crypto.createCipheriv(
    encryptionMethod,
    Buffer.from(secret),
    iv
  );
  let encrypted =
    encryptor.update(data, "utf8", "base64") + encryptor.final("base64");
  return Buffer(encrypted).toString("base64");
};

let decryptRequest = (encryptedData) => {
  encryptedData = Buffer.from(encryptedData, "base64").toString("ascii");
  let encryptionMethod = "AES-256-CBC";
  let iv = secret.substr(0, 16);
  let decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (decryptData =
    decryptor.update(encryptedData, "base64", "utf8") +
    decryptor.final("utf8"));
};
var randomOrderID = Math.floor(100000000 + Math.random() * 900000000);
console.log('OrderID: ',randomOrderID)
 var amountNum = Number((Math.random() * (20 - 2) * 2).toFixed(2))


 console.log('Amount: ',amountNum)
let payload_eg = {
  host: "pit-1.t2scdn.com",
  order_id: randomOrderID,
  provider: "FH",
  customer_id: "10101292",
  merchant_id: "1235000", //63155140
  total: amountNum,
  first_name: "testing firstname",
  last_name: "lastname testing",
  house_number: "347",
  flat: "Flat 6", //optional
  address_line1: "primrose",
  address_line2: "apartment",
  address: "northampton",
  postcode: "NN178YG",
  email: "qatesting@testing.com",
  cc_token: "9740282", //uncomment for making saved card sale
  last_four_digits: "0821", //uncomment for making saved card sale
  redirect_url: "http://www.freakinghugeurl.com/refer.php?co", 
  cancel_url: "https://example.com/?a=b", 
  webhook_url: "https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net", 
  reference: "1234",
  db_total: false
};

var token = [
 {
      token: (payload_eg.cc_token).replace("egtoken_", ""),
      last_four_digits: payload_eg.last_four_digits,
      master_token: "mxtoken_08ba2e2b1c9aaafb00f7615fe4f50ef55430c043b1046fa2cdd0af2025c21c7a",
      billing_address_req: false
 } 
//uncomment these lines for making saved card sale
];

var base64Data = JSON.stringify({
  currency_sign: "£",
  token,
  total: payload_eg.total,
  cancel_url: payload_eg.cancel_url,
  redirect_url: payload_eg.redirect_url,
  billing_address_req : false,
  billing_address_req_new_card : false
});

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string

let base64String = bufferObj.toString('base64');
var cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload_eg))
console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`)