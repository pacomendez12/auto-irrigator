#include <ArduinoJson.h>
#include <Wire.h>
#include <RTClib.h>
#include <SoftwareSerial.h>
#include "structs.h"
#include "BTEvent.h"

#define MAX_CONFIGURATIONS 10
//#define AT_CONFIG 1
//#define SET_TIME_FROM_PC


// Globals
RTC_DS3231 rtc;
SoftwareSerial BT(10, 11);
DeviceIrrigation * irrigation[DEVICES_TOTAL];
Task allTasks[MAX_CONFIGURATIONS];


void handleDeviceTimeout() {
  for(DeviceIrrigation *dev : irrigation) {
    if (dev->state == MANUAL_START || dev->state == AUTO_START_STATE) {
      uint32_t currentUnixSeconds = rtc.now().unixtime();
      if (currentUnixSeconds >= dev->endsAt) {
        stopDevice(dev->deviceId);
      } else {
        Serial.println("Still irrigating pending " + String(dev->endsAt - currentUnixSeconds) + " seconds for device " + String(dev->deviceId));
      }
    }
  }
}

void stopDevice(byte deviceId) {
  Serial.println("Stopping device " + String(deviceId));
  irrigation[deviceId]->reset();
  digitalWrite(deviceId + DEVICE_START_PIN, LOW);
}

void executeCommand(BTEvent &event) {
  DeviceIrrigation *currentDevice = irrigation[event.getDeviceId()];
  IBasePayload * payload = event.getPayload();
  
  switch(event.getAction()) {
    case STOP:
      stopDevice(event.getDeviceId());
      break;
    case MANUAL_START:{
      DateTime currentDate = rtc.now();
      
      currentDevice->deviceId = event.getDeviceId();
      currentDevice->state = MANUAL_START;      
      currentDevice->endsAt = currentDate.unixtime() + payload->getDuration();
      
      digitalWrite(event.getDeviceId() + DEVICE_START_PIN, HIGH);
      break;
    }
    case SET_DATE: {
      long currentDateSeconds = payload->getCurrentDate();
      //Serial.print(currentDateSeconds);
      rtc.adjust(DateTime(currentDateSeconds));
      break;
    }
    default:
      break;
  }
}

void handleBTCommand() {
  if (BT.available()) {
    Serial.write(BT.read());
  }

}


void setup() {
  Serial.begin(9600);

  if (!rtc.begin()) {
    Serial.println("Module RTC not found");
    while(1);
  }

  BT.begin(9600);

  for (int i = DEVICE_START_PIN; i <= LAST_DEVICE_PIN; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  for (int i = 0; i < DEVICES_TOTAL; i++) {
    irrigation[i] = new DeviceIrrigation(i);
  }

  #ifdef SET_TIME_FROM_PC
  rtc.adjust(DateTime(__DATE__, __TIME__));
  #endif
}

String readMessage() {
    String message = BT.readString();
    int messageBytes = message.toInt();
    int startMessageIdx = message.indexOf('{');
    String msg = startMessageIdx == -1 ? "" : message.substring(startMessageIdx);

    messageBytes -= msg.length();
    
    while (messageBytes > 0 && BT.available()) {
      Serial.println("in while");
      String data = BT.readString();
      Serial.println(data);
      msg = msg + data;
      messageBytes -= 20;
    }

    return msg;
}

BTEvent parseMessage(String msg) {
  JsonDocument document;
  deserializeJson(document, msg);

  BTEvent event(document);

  Serial.println((long)document["payload"]["currentDate"]);

  return event;
}



void loop() {
  handleDeviceTimeout();

  //handleBTCommand();
  
  DateTime fecha = rtc.now();

  Serial.print(fecha.day());
  Serial.print("/");
  Serial.print(fecha.month());
  Serial.print("/");
  Serial.print(fecha.year());
  Serial.print(" ");
  Serial.print(fecha.hour());
  Serial.print(":");
  Serial.print(fecha.minute());
  Serial.print(":");
  Serial.println(fecha.second());


  /*#ifdef AT_CONFIG
  if (BT.available()) {
    Serial.write(BT.read());
  }

  if (Serial.available()) {
    BT.write(Serial.read());
  }
  #endif*/

  #ifndef AT_CONFIG
  
  if (BT.available()) {
    String msg = readMessage();

    Serial.println(msg);
    Serial.println(msg);

    BTEvent event = parseMessage(msg);
    /*int value = event.getAction() == 1 ? HIGH : LOW;

    digitalWrite(event.getDeviceId() + DEVICE_START_PIN, value);*/

    executeCommand(event);

  }
  #endif
  
  delay(1000);
}
