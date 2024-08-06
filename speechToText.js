require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function speechToText(filePath) {
  if (!process.env.ASR_API_KEY) {
    console.error('ASR_API_KEY is not set in the environment variables.');
    throw new Error('Missing ASR_API_KEY');
  }

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
    if (response.data && response.data.output) {
      return response.data.output.map(segment => segment.text).join(' ');
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error in speechToText:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error in speechToText: No response received', error.request);
    } else {
      console.error('Error in speechToText:', error.message);
    }
    throw error;
  }
}

module.exports = speechToText;
