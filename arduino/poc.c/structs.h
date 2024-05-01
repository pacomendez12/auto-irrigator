#ifndef __structs_h
#define __structs_h

#define DEVICES_TOTAL 2

// States
#define STOP_STATE 0
#define MANUAL_START_STATE 1
#define AUTO_START_STATE 2
#define DEVICE_NOT_FOUND 100

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
    uint32_t endsAt = 0;

    DeviceIrrigation(byte deviceId) : deviceId(deviceId) {
      reset();
    }
  
    void reset() {
      state = STOP_STATE;
      endsAt = 0;
    }
};

struct Schedule {
  SchedulerType schedulerType;
  int ocurrences;
  uint32_t startDate;
  uint32_t endDate;
};

struct Task {
  int id;
  short device_id;
  int duration;
  bool enabled;
  Schedule schedule;
};

#endif
