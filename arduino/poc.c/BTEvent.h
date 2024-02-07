
#ifndef __BTEVENT_H
#define __BTEVENT_H

#include "PayloadBuilder.h"
//#include "Payload.h"

class BTEvent {
  public:

  BTEvent(JsonDocument document) {
    this->action = document["action"];
    this->deviceId = document["deviceId"];
    
    payload = PayloadBuilder::fromJsonDocument(document);
  }
  
  ~BTEvent() {
    if (this->payload != NULL) {
      delete this->payload;
    }
  }

  byte getAction() {
    return this->action;
  }

  byte getDeviceId() {
    return this->deviceId;
  }

  IBasePayload * getPayload() {
    return payload;
  }


  private:
  byte action;
  byte deviceId;

  IBasePayload * payload;
};

#endif
