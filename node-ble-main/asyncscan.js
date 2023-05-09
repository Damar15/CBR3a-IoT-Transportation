const noble = require('@abandonware/noble');
const devices = require('./device.json')

const deviceList = []

devices.forEach((value, index, array) => {
  deviceList.push(value["mac"])
})


noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    console.log("Powered On");
	  await noble.startScanningAsync(deviceList, false);
  }
});

noble.on('discover', (peripheral) => {
  console.log(peripheral["address"]);
});
