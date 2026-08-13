const crypto = require("crypto");

let secret = "p87aAzmPkU!=jJUr@Q%$dXznMLRfFuTF"; //hotfix
// let BASE_URL = 'https://release.gateway.datmanpay.com/earth';

// let BASE_URL = 'https://nd-2155-apple-pay-web.dw62m7utw2a83.amplifyapp.com/earth';

let BASE_URL ='https://ws5-gateway.datmanpay.com/earth';

// let BASE_URL='https://nd-3786-back-button-fix.dw62m7utw2a83.amplifyapp.com/earth'

// let BASE_URL ='https://nd-3245-checkout-frontend.dw62m7utw2a83.amplifyapp.com/earth'

// let BASE_URL ='https://stage-gateway.datmanpay.com/earth'

// let BASE_URL='https://ws1-gateway.datmanpay.com/earth'

// let BASE_URL ='https://sandbox-stage-gateway.datmanpay.com/earth'

// let BASE_URL = 'https://nd-3621-node-js-upgrade-from-12.dw62m7utw2a83.amplifyapp.com/earth/addcard';


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
  order_id:  randomOrderID,
  provider: "FH",
  customer_id: "101615045",
  merchant_id: "1235000", //63155140
  total:1.01,
//    amountNum,
  first_name: "testing firstname",
  last_name: "lastname testing",
  house_number: "347",
  flat: "Flat 6", //optional
  address_line1: "primrose",
  address_line2: "apartment",
  address: "northampton",
  postcode: "NN178YG",
  email: "qatesting@testing.com",
  cc_token: "egtoken_23041815HK50HZ35NW73QHD", //uncomment for making saved card sale
  last_four_digits: "0821", //uncomment for making saved card sale
  redirect_url: 
  // "https://www.google.com/search?q=hello&source=hp&ei=YgbHYt_1Ib6VseMPgO-coAg&iflsig=AJiK0e8AAAAAYscUckg6qoiPYs5DbGkB_8GVf_HrDho-&ved=0ahUKEwjfrrWJluf4AhW-SmwGHYA3B4QQ4dUDCAc&uact=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes33sd=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUewfsfsswes=AJiK0e8AAAAAYscUe",
  "https://example.com", 
  cancel_url: "https://example.com/?a=b", 
  webhook_url: "https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net", 
  // BackUrl :"https://www.google.com/",
  reference: "1234",
  db_total: false
};

var token = [
//  {
//       token: (payload_eg.cc_token).replace("egtoken_", ""),
//       last_four_digits: payload_eg.last_four_digits,
//       master_token: "mxtoken_29209b0d577c48e5624debd60fd5a64b",
//       billing_address_req: false
//  } 
//uncomment these lines for making saved card sale
];

var base64Data = JSON.stringify({
  currency_sign: "£",
  token,
  total: payload_eg.total,
  cancel_url: payload_eg.cancel_url,
  redirect_url: payload_eg.redirect_url,
  billing_address_req : true,
  billing_address_req_new_card : true
});

// Create buffer object, specifying utf8 as encoding
let bufferObj = Buffer.from(base64Data, 'utf8');

// Encode the Buffer as a base64 string

let base64String = bufferObj.toString('base64');

// let corrupted_payload=base64String
console.log(base64String)
var cardstream_encrypted_payload = encryptRequest(JSON.stringify(payload_eg))

let var_encrypted_data= "bkfjdsbfjkfjsfksdfbksdfndskfjbdhdnfadnasbdjas8987987hjnhgkjhhjkh"

console .log("proper encrypted data ", cardstream_encrypted_payload)
var corrupted_payload= cardstream_encrypted_payload
// .substr(21,"hjbnghjknbvhjklnbcfghjkl;jhgfcgvhk.n,mbvnm")


.concat(var_encrypted_data)
// .slice(0, 500)
// let junk_var="hslkcdsnhjdbncksdbjkncdkjbhghhjbjnmnm,nmuygiou6689898"
// const invalid_base64String = base64String
// .concat(junk_var)
// .slice(0, 200) ;


// console.log(`junk : ${invalid_base64String}`);
// .push("jyughjhfgjkbhjkgbvgjyfhbjvjhkbhjb")
// .slice(0, 200) ;
console.log("valid:",base64String)
// console.log("invalid:",invalid_base64String)


console.log(`${BASE_URL}/?data=${corrupted_payload}&response=${base64String}`)
return {
  encypted_token: `${corrupted_payload}&response=${base64String}`,
  base64Str: base64String,
}





// console.log(cardstream_encrypted_payload)
// console.log(`${BASE_URL}/?data=${cardstream_encrypted_payload}&response=${base64String}`)