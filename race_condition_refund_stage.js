var axios = require('axios');
var api_endpoint = 'https://ws6.datmanpay.com/api2.php?action=refund'
var data = JSON.stringify({
    "order_id": 205077452,
    "shopper_id": "71951",
    "amount": '4.19',
    "host": "dev-1-uk.t2scdn.com",
    "merchant_id": 1235000,
    "provider": "FH",
    "reason": "Order failed",
    "destination": "CARD",
  });

var config = {
  method: 'post',
  url: api_endpoint,
  headers: { 
    'Content-Type': 'application/json', 
    'api_token': '4HfhV2aYtUp7fwbonPM0gXPFUJ4PF98Q4fi', 
    'qa-auth':'762b5a41717faec828a5e1f71253b8b9'
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