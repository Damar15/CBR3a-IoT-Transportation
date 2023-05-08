const https = require('https');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config()

// Read in the private key and certificate
const privateKey = fs.readFileSync(process.env.KEY);
const certificate = fs.readFileSync(process.env.CERT);

const endpoint = process.env.ENDPOINT
const topic = "bus/malang"


async function sendRequest(postData){
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        httpsAgent: new https.Agent({
          key: privateKey,
          cert: certificate,
        }),
      };
    try {
        const response = await axios.post('https://' + endpoint + ':8443/topics/' + topic + '?qos=1', postData, options)
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const postData = JSON.stringify({
    // Request body data goes here
      payload: "Hello World!",
      serialNumber: "123ae",
      dateTime: String(Date.now()),
      activated: true,
      clientId: "1",
      device: 1,
      type: 1,
  });
sendRequest(postData)