var noble = require('@abandonware/noble');

noble.startScanning(); // any service UUID, no duplicates


noble.startScanning([], true); // any service UUID, allow duplicates


var serviceUUIDs = []; // default: [] => all
var allowDuplicates = true; // default: false

noble.startScanning(serviceUUIDs, allowDuplicates); // particular UUID's
