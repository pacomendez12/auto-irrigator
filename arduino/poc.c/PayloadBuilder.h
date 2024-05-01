#ifndef __PAYLOAD_BUILDER_H
#define __PAYLOAD_BUILDER_H

#include "structs.h"
#include "Payload.h"

class StartPayload;

class PayloadBuilder {
  private:
  PayloadBuilder() {}
  
  public:

  static IBasePayload * fromJsonDocument(JsonDocument &document, byte action) {
     if (action == STOP) {
       return NULL;
     } else if (action == MANUAL_START) {
       int duration = int(document["payload"]["duration"]);
       return new StartPayload(duration);
     } else if (action == SET_DATE) {
       uint32_t duration = document["payload"]["currentDate"];
       return new DatePayload(duration);
     } else if (action == ADD_TASK || action == DELETE_TASK || action == CHANGE_TASK) {
       byte id = document["payload"]["id"];
       byte deviceId = document["deviceId"];
       byte scheduleType = document["payload"]["schedule"]["type"];
       int scheduleOcurrences = document["payload"]["schedule"]["ocurrences"];
       uint32_t scheduleStartDate = document["payload"]["schedule"]["startDate"]; 
       uint32_t scheduleEndDate = document["payload"]["schedule"]["endDate"];
       return new ConfigPayload(id, deviceId, scheduleType, scheduleOcurrences, scheduleStartDate, scheduleEndDate);
     }
    
  }
};

#endif
