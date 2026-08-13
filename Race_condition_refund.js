var axios = require('axios');
var api_endpoint = 'https://datmanpay.com/api2.php?action=refund'
var data = JSON.stringify({
    "order_id": 786687689,
    "shopper_id": "71951",
    "amount": "1.00",
    "host": "dev-1-uk.t2scdn.com",
    "merchant_id": 63169829,
    "provider": "FH",
    "reason": "Order failed",
    "destination": "CARD",
  });

var config = {
  method: 'post',
  url: api_endpoint,
  headers: { 
    'Content-Type': 'application/json', 
    'api_token': '720AAEA92F57487A6C13FE50812D107F001', 
  },
  data : data
};

//forloop to send request 10 times
for (var i = 0; i < 10; i++) {
    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });
}