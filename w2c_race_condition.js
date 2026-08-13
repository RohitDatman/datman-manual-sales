
const axios = require('axios');
let data = JSON.stringify({
  "order_id": "818151722",
  "shopper_id": "31837",
  "amount": 7.63
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://tz529bp21m.execute-api.eu-west-2.amazonaws.com/ws5/api/v1/wallet-to-card',
  headers: { 
    'api_token': "4HfhV2aYtUp7fwbonPM0gXPFUJ4PF98Q4fi", 
    'Content-Type': 'application/json'
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