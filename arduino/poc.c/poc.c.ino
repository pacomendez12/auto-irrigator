#include <ArduinoJson.h>
#include <Wire.h>
#include <RTClib.h>
#include <SoftwareSerial.h>
#include <stdint.h>
#include "structs.h"
#include "BTEvent.h"

#define MAX_CONFIGURATIONS 10
//#define AT_CONFIG 1
//#define SET_TIME_FROM_PC

const int alarmPin = 2;

volatile boolean tickedEndTask = false;


// Globals
RTC_DS3231 rtc;
SoftwareSerial BT(10, 11);
DeviceIrrigation * irrigation[DEVICES_TOTAL];
Task allTasks[MAX_CONFIGURATIONS];


int deviceToPin(int deviceId) {
  if (deviceId == 0) return 3;
  if (deviceId == 1) return 8;
}

byte getNextDeviceWhichEnds() {
  uint32_t nextTaskEnd = UINT32_MAX;
  byte device = DEVICE_NOT_FOUND;

  for (byte i = 0; i < DEVICES_TOTAL; i++) {
    DeviceIrrigation *currentDevice = irrigation[i];
    if ((currentDevice->state == MANUAL_START_STATE || currentDevice->state == AUTO_START_STATE) && currentDevice->endsAt < nextTaskEnd) {
      nextTaskEnd = currentDevice->endsAt;
      device = i;
    }
  }

  return device;
}

void resetAlarmForNextTaskEnd() {
  byte deviceId = getNextDeviceWhichEnds();

  rtc.disableAlarm(1);
  rtc.clearAlarm(1);

  if (deviceId == DEVICE_NOT_FOUND) {
    Serial.println("No started device will be scheduled");
    return;
  }

  Serial.println("Alarm will kick in: " + String(irrigation[deviceId]->endsAt - rtc.now().unixtime()) + " seconds");
  rtc.setAlarm1(DateTime(irrigation[deviceId]->endsAt), DS3231_A1_Date);
}

void scheduleTaskEnd(byte deviceId, uint32_t duration) {
  setDeviceState(deviceId, MANUAL_START, rtc.now().unixtime() + duration);
  resetAlarmForNextTaskEnd();
}

void setDeviceState(byte deviceId, byte state, uint32_t endsAt) {
  DeviceIrrigation *currentDevice = irrigation[deviceId];
  
  currentDevice->deviceId = deviceId;
  currentDevice->state = state;      
  currentDevice->endsAt = endsAt;
}

void stopDevice(byte deviceId) {
  Serial.println("Stopping device " + String(deviceId));
  irrigation[deviceId]->reset();
  digitalWrite(deviceToPin(deviceId), LOW);
  resetAlarmForNextTaskEnd();
}


void executeCommand(BTEvent &event) {
  IBasePayload * payload = event.getPayload();
  
  switch(event.getAction()) {
    case STOP:
      stopDevice(event.getDeviceId());
      break;
    case MANUAL_START:{
      scheduleTaskEnd(event.getDeviceId(), payload->getDuration());
      digitalWrite(deviceToPin(event.getDeviceId()), HIGH);
      break;
    }
    case SET_DATE: {
      uint32_t currentDateSeconds = payload->getCurrentDate();
      //Serial.print(currentDateSeconds);
      rtc.adjust(DateTime(currentDateSeconds));
      break;
    }
    default:
      break;
  }
}

void onAlarm() {
  tickedEndTask = true;
}

void executeEndTask() {
  Serial.println("<<< onAlarm");
  byte deviceId = getNextDeviceWhichEnds();
  if (deviceId != DEVICE_NOT_FOUND) {
    stopDevice(deviceId);
  }

  tickedEndTask = false;
}


void setup() {
  Serial.begin(9600);

  if (!rtc.begin()) {
    Serial.println("Module RTC not found");
    while(1);
  }

  BT.begin(9600);
  //BT.flush();

  for (byte i = 0; i < DEVICES_TOTAL; i++) {
    pinMode(deviceToPin(i), OUTPUT);
    digitalWrite(deviceToPin(i), LOW);
    
    irrigation[i] = new DeviceIrrigation(i);
  }

  #ifdef SET_TIME_FROM_PC
  rtc.adjust(DateTime(__DATE__, __TIME__));
  #endif

  rtc.disable32K();
  pinMode(alarmPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(alarmPin), onAlarm, FALLING);
  rtc.writeSqwPinMode(DS3231_OFF);
  rtc.clearAlarm(1);
  rtc.disableAlarm(1);
  rtc.clearAlarm(2);
  rtc.disableAlarm(2);
}

int readMessageSize() {
  String msg = "";
  char c;

  //BT.flush();

  do {
    c = BT.read();
    Serial.println(c);
    if (c == '{') {
      break;
    }
    msg += c;
    delay(50);
  } while(true);

  Serial.println("size readed: " + msg);
  
  return msg.toInt();
}

String readMessage() {
    BT.listen();
    /*String message = BT.readString();
    Serial.println("Size of string received = " + String(message.length()));
    Serial.println("string received = " + message);*/
    int messageBytes = readMessageSize() - 1;
    String msg = "{";

    char c;
    
    do {
      c = BT.read();
      Serial.println(c);
      /*while(!BT.available()) {
        //BT.flush();
        Serial.print("*");
        delay(50);
      }*/
      msg += c;
      delay(50);

      messageBytes--;
    } while(messageBytes && c != "\0");

    //BT.flush();
    
    
    /*int startMessageIdx = message.indexOf('{');
    String msg = startMessageIdx == -1 ? "" : message.substring(startMessageIdx);*/



    /*Serial.println("messageBytes: " + String(messageBytes));

    messageBytes -= msg.length();
    
    while (messageBytes > 0 && BT.available()) {
      Serial.println("in while");
      String data = BT.readString();
      Serial.println(data);
      msg = msg + data;
      messageBytes -= 20;
    }*/

    return msg;
}

BTEvent *parseMessage(String msg) {
  JsonDocument document;
  deserializeJson(document, msg);

  return new BTEvent(document);
}

void handleBT() {
  int av = BT.available();
  //Serial.println(av);
  if (av) {
    Serial.println("Available data");
    String msg = readMessage();

    Serial.println(msg);
    Serial.println(msg);

    BTEvent *event = parseMessage(msg);
    executeCommand(*event);
    delete event;
  }
}

void loop() {
  if (tickedEndTask) {
    executeEndTask();
  }
  
  handleBT();
}
