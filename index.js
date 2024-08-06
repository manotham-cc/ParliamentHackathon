require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
data.append('file', fs.createReadStream('./Test/30.mp4'));

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.iapp.co.th/asr/v3',
  headers: { 
    'apikey': process.env.ASR_API_KEY, 
    ...data.getHeaders()
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