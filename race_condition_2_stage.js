const axios = require('axios');
let data = JSON.stringify({
  "order_id": "54678968361",
  //  76897798151,
  "merchantTokenId": 
  // "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323",
  // "mxtoken_93e524c7417f5287cca79573e02cd6b4",
  // "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323",
  "mxtoken_DJQdilvFoetVYFkX_8-MW4uLrChcJyQt",
  "amount": "11.06",
  "host": "google.com",
  "merchant_id":
  // "1235000",
  //  1235031,
  "1234572",
  "WebhookUrl": "https://3r8kcozm6a.execute-api.eu-west-2.amazonaws.com/stage/webhook",
  "customer_id": 
  // "63155140",
  // "10390598",
  // "63155140",
  "15900773",
  "provider": "FH",
  "first_name": "QA",
  "last_name": "Testing",
  "sending": "to",
  "address": {
    "house_number": "6",
    "flat": "asdf",
    "address1": "6",
    "address2": "asd",
    "postcode": "NN178YG"
  },
  "avs": {
    "house_number": "6",
    "postcode": "NN178YG"
  },
  "AddressOnFile": [],
  "cvv": 356,
  "email": "qatesting@testing.com"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 
  // 'https://ws5.datmanpay.com/api2.php?action=paymentV2',
  
  'https://e578eduxqf.execute-api.eu-west-2.amazonaws.com/ws5/api2.php?action=paymentV2',
  headers: { 
    'Content-Type': 'application/json', 
    'api_token': '4HfhV2aYtUp7fwbonPM0gXPFUJ4PF98Q4fi', 
    'qa-auth': '762b5a41717faec828a5e1f71253b8b9', 
    'Cookie': '__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});



//forloop to send request 10 times
for (var i = 0; i < 10; i++) {
    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });
}