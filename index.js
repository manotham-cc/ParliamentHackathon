const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();

//data.append

let config = {
    method: 'post',
    maxBodyLength: Infinity
};