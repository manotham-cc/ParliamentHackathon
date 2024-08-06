require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function speechToText(filePath) {
  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.iapp.co.th/asr/v3',
      headers: { 
        'apikey': process.env.ASR_API_KEY,
        ...data.getHeaders()
      },
      data: data
    };

    const response = await axios.request(config);
    return response.data.output.map(segment => segment.text).join(' ');
  } catch (error) {
    console.error('Error in speechToText:', error);
    throw error;
  }
}

module.exports = speechToText;