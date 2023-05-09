
#include "sys/time.h" // to get current system time
// ESP32 BLE libraries to config BLE client & server
#include <BLEDevice.h> 
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLEBeacon.h> // iBeacon lib
#include "esp_sleep.h" //esp32 for entering deep sleep (power management)


#define GPIO_DEEP_SLEEP_DURATION 10 // Deep Sleep duration for esp32 10s
RTC_DATA_ATTR static time_t last; // last var used to get latest time when esp32 went to deepsleep
RTC_DATA_ATTR static uint32_t bootcount; // bootcount used to count number of resets
BLEAdvertising* pAdvertising; // BLE type
struct timeval now; // Access current time
#define BEACON_UUID "aa3dd991-41b3-4f25-8fe7-53e2d64fa0d5" //define the UUID beacon


void setBeacon() {
  BLEBeacon oBeacon = BLEBeacon();
  oBeacon.setManufacturerId(0x4C00);
  oBeacon.setProximityUUID(BLEUUID(BEACON_UUID));
  oBeacon.setMajor((bootcount & 0xFFFF0000) >> 16);
  oBeacon.setMinor(bootcount & 0xFFFF);

  BLEAdvertisementData oAdvertisementData = BLEAdvertisementData();
  BLEAdvertisementData oScanResponseData = BLEAdvertisementData();
  oAdvertisementData.setFlags(0x04); 

  std::string strServiceData = "";
  strServiceData += (char)26;    // Len
  strServiceData += (char)0xFF;  // Type

  strServiceData += oBeacon.getData();
  oAdvertisementData.addData(strServiceData);
  pAdvertising->setAdvertisementData(oAdvertisementData);
  pAdvertising->setScanResponseData(oScanResponseData);
}

void setup() {
  Serial.begin(115200);
  gettimeofday(&now, NULL);
  Serial.printf("start ESP32 %d\n", bootcount++);
  Serial.printf("deep sleep (%lds since last reset, %lds since last boot)\n", now.tv_sec, now.tv_sec - last);
  last = now.tv_sec;

  BLEDevice::init("ESP32 as iBeacon"); // Create the BLE Device

  // Create the BLE Server
  BLEServer* pServer = BLEDevice::createServer();  // <-- no longer required to instantiate BLEServer, less flash and ram usage
  pAdvertising = BLEDevice::getAdvertising();
  BLEDevice::startAdvertising();
  setBeacon();

  pAdvertising->start(); // Start advertising
  Serial.println("Advertizing started...");
  delay(100);

  pAdvertising->stop();
  Serial.printf("enter deep sleep\n");
  esp_deep_sleep(1000000LL * GPIO_DEEP_SLEEP_DURATION);
  Serial.printf("in deep sleep\n");
}

void loop() {}
