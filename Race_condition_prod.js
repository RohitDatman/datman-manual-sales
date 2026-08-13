var axios = require('axios');
var data = JSON.stringify({
  "order_id": "786687689",
  "merchantTokenId": "mxtoken_cVZKrfb8ZGRJPM3vdPtTUn_NNj87djbp",
  "amount": "1.00",
  "host": "d-1337.t2scdn.com",
  "merchant_id": 63169829,
  "provider": "FH",
  "first_name": "QA",
  "last_name": "Testing",
  "sending": "to",
  "address": {
    "house_number": "6",
    "flat": "6",
    "address1": "6",
    "address2": "6",
    "postcode": "ST5 7TF"
  },
  "avs": {
    "house_number": "6",
    "postcode": "ST5 7TF"
  },
  "AddressOnFile": [],
  "cvv": "202",
  "email": "sundaresan@datman.je",
  "SplitFee": [ 
    {
        "partner_merchant_id" : "663192616",
        "type_id" : "6",
        "value" : "0.50",
        "value_type" : "amount"
    },
    // {
    //     "partner_merchant_id" : "663194940",
    //     "type_id" : "6",
    //     "value" : "0.20",
    //     "value_type" : "amount"
    // }
  ]
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://datmanpay.com/api2.php?action=paymentV2',
  headers: { 
    'Content-Type': 'application/json', 
    'api_token': '720AAEA92F57487A6C13FE50812D107F001', 
    'Cookie': '__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
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