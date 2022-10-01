#include <ArduinoJson.h>
#include <Wire.h>
#include <RTClib.h>
#include <SoftwareSerial.h>

#define VALVE_START 2
#define VALVES_NUMBER 2
#define VALVE_END VALVE_START + VALVES_NUMBER - 1

// States
#define STOP_STATE 0
#define MANUAL_START_SATE 1
#define AUTO_START_STATE 2

// Commands
#define STOP 0
#define M_STR 1
#define A_STR 2
#define SET_CONFIG 3
#define SET_DATE 4

//#define AT_CONFIG 1

struct Irrigation{
  char current_valve = 0;
  int total_time = 0;
};

class BTEvent {
  public:

  BTEvent(DynamicJsonDocument djd) : payload(djd) {}
  
  byte action;
  byte device;
  DynamicJsonDocument payload;
};

// Globals
RTC_DS3231 rtc;
SoftwareSerial BT(10, 11);
char btData = 0;
bool logged = false;
char state = STOP;
Irrigation irrigation;

void clearCurrentIrrigation() {
  irrigation.current_valve = 0;
  irrigation.total_time = 0;
}

void setCommand(char command, void * param) {
  switch(command) {
    case STOP:
      state = STOP_STATE;
      clearCurrentIrrigation();
      break;
    case M_STR:
      state = MANUAL_START_SATE;
      
      memcpy(&irrigation, param, sizeof(Irrigation));
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

  for (int i = VALVE_START; i <= VALVE_END; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  rtc.adjust(DateTime(__DATE__, __TIME__));
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
  DynamicJsonDocument document(256);
  deserializeJson(document, msg);

  BTEvent event(document);

  event.action = document["action"];
  event.device = document["deviceId"];

  return event;
}



void loop() {

  //handleBTCommand();
  
  //DateTime fecha = rtc.now();

  /*Serial.print(fecha.day());
  Serial.print("/");
  Serial.print(fecha.month());
  Serial.print("/");
  Serial.print(fecha.year());
  Serial.print(" ");
  Serial.print(fecha.hour());
  Serial.print(":");
  Serial.print(fecha.minute());
  Serial.print(":");
  Serial.println(fecha.second());*/


  /*#ifdef AT_CONFIG
  if (BT.available()) {
    Serial.write(BT.read());
  }

  if (Serial.available()) {
    BT.write(Serial.read());
  }
  #endif*/

  #ifndef AT_CONFIG

  int availableBytes = BT.available();
  
  if (availableBytes) {
    String msg = readMessage();

    Serial.println(msg);

    BTEvent event = parseMessage(msg);
    int value = event.action == 1 ? HIGH : LOW;

    digitalWrite(event.device + VALVE_START, value);

  }
  #endif
  
  //delay(1000);
}
