const mqtt = require('mqtt')
const fs = require('fs');
require('dotenv').config()

const ca = fs.readFileSync(process.env.CA, 'utf8');
const cert = fs.readFileSync(process.env.CERT, 'utf8');
const key = fs.readFileSync(process.env.KEY, 'utf8');
const endpoint = process.env.ENDPOINT

const client = mqtt.connect(
  {
    host: endpoint,
    protocol: "mqtt",
    clientId: "sdk-nodejs-v2",
    clean: true,
    key: key,
    cert: cert,
    ca: ca,
    reconnectPeriod: 0,
    debug:true,
  }
);

client.on('connect', function () {
  console.log("Connected!")
})