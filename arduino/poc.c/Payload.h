#ifndef __PAYLOAD_H
#define __PAYLOAD_H

#include "structs.h"

class StartPayload;

class IBasePayload {
  
  public:
  virtual uint32_t getDuration() {return 0;}
  virtual byte getId() {return 0;}
  virtual byte getDeviceId() {return 0;}
  virtual byte getScheduleType() {return 0;}
  virtual int getScheduleOcurrences() {return 0;}
  virtual uint32_t getScheduleStartDate() {return 0;}
  virtual uint32_t getScheduleEndDate() {return 0;}
  virtual uint32_t getCurrentDate() { return 0; }
};

class StartPayload : public IBasePayload {
  public:

  StartPayload(uint32_t duration) : duration(duration) {}
  
  uint32_t getDuration() {
    return this->duration;
  }

  private:
  uint32_t duration;
};

class DatePayload : public IBasePayload {
  public:

  DatePayload(uint32_t currentDate) : currentDate(currentDate) {}
  
  uint32_t getCurrentDate() {
    return this->currentDate;
  }

  private:
  uint32_t currentDate;
};

class ConfigPayload : public IBasePayload {
  public:

  ConfigPayload(int id, byte deviceId, byte scheduleType, int scheduleOcurrences, uint32_t scheduleStartDate, uint32_t scheduleEndDate) : 
    id(id),
    deviceId(deviceId),
    scheduleType(scheduleType),
    scheduleOcurrences(scheduleOcurrences),
    scheduleStartDate(scheduleStartDate),
    scheduleEndDate(scheduleEndDate){
  }
  
  byte getId() {return id;}
  byte getDeviceId() { return deviceId;}
  byte getScheduleType() {return scheduleType;}
  int getScheduleOcurrences() {return scheduleOcurrences;}
  uint32_t getScheduleStartDate() {return scheduleStartDate;}
  uint32_t getScheduleEndDate() {return scheduleEndDate;}

  private:
  byte id;
  byte deviceId;
  byte scheduleType;
  int scheduleOcurrences;
  uint32_t scheduleStartDate;
  uint32_t scheduleEndDate;
};


#endif
