from enum import Enum
from abc import ABC, abstractmethod

from numpy import number

#   {
#     id: 1,
#     time: 1480,
#     duration: 60,
#     schedule: {
#       type: REPEAT_WEEK,
#       occurrences: MONDAY | WENDNESDAY | FRIDAY,
#       startDate: 1656224045,
#       endDate: 1656224045,
#     },
#     enabled: true,
#   },


class ScheduleType(Enum):
    ONE_TIME_EVENT = 0;
    REPEAT_WEEK = 1;
    REPEAT_BIWEEK = 2;
    REPEAT_MONTH = 3;

class Schedule:
    def __init__(self, s_type, occurrences, start_date, end_date) -> None:
        self.type : ScheduleType = s_type
        self.ocurrences = occurrences
        self.start_date = start_date
        self.end_date = end_date
    
    def get_type(self) -> ScheduleType:
        return self.type

    def get_occurrences(self):
        return self.ocurrences
    
    def get_start_date(self):
        return self.start_date
    
    def get_end_date(self):
        return self.end_date

class TaskConfig(ABC):
    def __init__(self, config_id, device_id, time, duration, enabled, schedule: Schedule) -> None:
        self.id = config_id
        self.device_id = device_id
        self.time = time
        self.duration = duration
        self.schedule : Schedule = schedule
        self.enabled : bool = enabled

    # def create_next_task(self) -> Task:
    #     return scheduler.create_next_task(self.id, device_manager.getDevice(self.device_id), self.duration, self.enabled, self.schedule)

    def get_id(self):
        return self.id
    
    def get_device_id(self):
        return self.device_id
    
    def get_time(self):
        return self.time
    
    def get_duration(self):
        return self.duration
    
    def get_schedule(self):
        return self.schedule
    
    def get_enabled(self):
        return self.enabled

    def to_raw(self):
        pass

    @abstractmethod
    def __get_next_occurrence_in_period(self, now) -> int | None:
        """ Abstract method that finds the next occurence of the self configuration """

    @abstractmethod
    def __get_task_type_int(self) -> int:
        """ returns the integer associated to the task type """

    def get_next_occurrence(self, now) -> int | None:
        if self.__is_task_enabled_and_in_period(now):
            return self.__get_next_occurrence_in_period(now)

        return None

    def __is_task_enabled_and_in_period(self, now):
        config_time = self.get_time()
        end = self.get_schedule().get_end_date()
        end_date = end + config_time + 1

        return self.get_enabled() and now <= end_date

    # @staticmethod
    # def from_raw(self, raw_data) -> Self:
    #     pass

    # @staticmethod
    # def parse(data) -> Self:
    #     pass
        

class OneTimeTaskConfig(TaskConfig):
    def __init__(self, config_id, device_id, time, duration, enabled, schedule: Schedule) -> None:
        super().__init__(config_id, device_id, time, duration, enabled, schedule)
    
    def __get_next_occurrence_in_period(self, now) -> int | None:
        start_date = self.get_schedule().get_start_date() + self.get_time()
        return start_date

    def __get_task_type_int(self) -> int:
        return 0