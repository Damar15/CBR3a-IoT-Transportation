const mqtt = require('mqtt')
const fs = require('fs');
require('dotenv').config()

const ca = fs.readFileSync('./rootCA.pem', 'utf8');
const cert = fs.readFileSync('./certificate.pem.crt', 'utf8');
const key = fs.readFileSync('./private.pem.key', 'utf8');
const endpoint = 'a2w3sp4eoy4pep-ats.iot.ap-southeast-2.amazonaws.com'

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
  console.log("Connected!");
  client.publish("raspi/data",JSON.stringify({
    // Request body data goes here
      payload: "Hello World!",
      serialNumber: "123ae",
      dateTime: String(Date.now()),
      activated: true,
      clientId: "1",
      device: 1,
      type: 1,
      timestamp: Date(Date.now()).toString(),
  }));
  console.log("Sent!");
});

