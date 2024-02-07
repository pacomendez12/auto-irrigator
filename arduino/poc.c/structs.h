#ifndef __structs_h
#define __structs_h

#define DEVICE_START_PIN 2
#define DEVICES_TOTAL 2
#define LAST_DEVICE_PIN DEVICE_START_PIN + DEVICES_TOTAL - 1

// States
#define STOP_STATE 0
#define MANUAL_START_STATE 1
#define AUTO_START_STATE 2

// Actions
#define STOP 0
#define MANUAL_START 1
#define SET_DATE 2
#define ADD_TASK 3
#define DELETE_TASK 4
#define CHANGE_TASK 5
#define SET_DEVICE_NAME 6


enum SchedulerType {
  ONE_TIME_EVENT = 0x0,
  REPEAT_WEEK,
  REPEAT_BIWEEK,
  REPEAT_MONTH,
};


class DeviceIrrigation {
  public:
    byte state = STOP_STATE;
    byte deviceId = 0;
    long endsAt = 0;

    DeviceIrrigation(byte deviceId) : deviceId(deviceId) {
      
    }
  
    void reset() {
      state = STOP_STATE;
      endsAt = 0;
    }
};

struct Schedule {
  SchedulerType schedulerType;
  int ocurrences;
  long startDate;
  long endDate;
};

struct Task {
  int id;
  short device_id;
  int duration;
  bool enabled;
  Schedule schedule;
};

#endif
