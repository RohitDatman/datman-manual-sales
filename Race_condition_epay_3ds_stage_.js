var axios = require('axios');
var api_endpoint = 'https://ws7.datmanpay.com/api2.php?action=paymentV2'
var data = JSON.stringify({
    "order_id": 567897334,
    "merchantTokenId": "mxtoken_3d1a9bda598b0da8124eb0b9f4d3d9eb338d1967b1f6066c629b05a3157f1323",
    "amount": 6.50,
    "merchant_id": 1235055,
    "WebhookUrl": "https://54602f6a156431a177c223aa5bd34f1b.m.pipedream.net",
    "customer_id": "63155140",
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
    "email": "qatesting@testing.je",
    "CancelUrl": "https://www.google.com/",
    // "WebhookUrl": "https://9b25d4d122dbf021b9b247f6e0d94ed0.m.pipedream.net",
    "RedirectUrl": "https://www.example.com",
    "backurl": "https://www.bing.com/"
  });

var config = {
  method: 'post',
  url: api_endpoint,
  headers: { 
    'Content-Type': 'application/json', 
    'api_token': '4HfhV2aYtUp7fwbonPM0gXPFUJ4PF98Q4fi', 
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