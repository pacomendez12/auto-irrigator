#ifndef __PAYLOAD_H
#define __PAYLOAD_H

#include "structs.h"

class StartPayload;

class IBasePayload {
  
  public:
  virtual int getDuration() {return 0;}
  virtual byte getId() {return 0;}
  virtual byte getDeviceId() {return 0;}
  virtual byte getScheduleType() {return 0;}
  virtual int getScheduleOcurrences() {return 0;}
  virtual long getScheduleStartDate() {return 0;}
  virtual long getScheduleEndDate() {return 0;}
  virtual long getCurrentDate() { return 0; }
};

class StartPayload : public IBasePayload {
  public:

  StartPayload(int duration) : duration(duration) {}
  
  int getDuration() {
    return this->duration;
  }

  private:
  int duration;
};

class DatePayload : public IBasePayload {
  public:

  DatePayload(long currentDate) : currentDate(currentDate) {}
  
  long getCurrentDate() {
    return this->currentDate;
  }

  private:
  long currentDate;
};

class ConfigPayload : public IBasePayload {
  public:

  ConfigPayload(int id, byte deviceId, byte scheduleType, int scheduleOcurrences, long scheduleStartDate, long scheduleEndDate) : 
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
  long getScheduleStartDate() {return scheduleStartDate;}
  long getScheduleEndDate() {return scheduleEndDate;}

  private:
  byte id;
  byte deviceId;
  byte scheduleType;
  int scheduleOcurrences;
  long scheduleStartDate;
  long scheduleEndDate;
};


#endif
