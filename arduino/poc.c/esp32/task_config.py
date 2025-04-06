from enum import Enum
from abc import ABC, abstractmethod
import datetime


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

BASE = 0x1
NONE = 0x0
MONDAY = BASE << 0
TUESDAY = BASE << 1
WENDNESDAY = BASE << 2
THURSDAY = BASE << 3
FRIDAY = BASE << 4
SATURDAY = BASE << 5
SUNDAY = BASE << 6

DAYS = [MONDAY, TUESDAY, WENDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]


class ScheduleType(Enum):
    ONE_TIME_EVENT = 0
    MULTI_TIME_EVENT = 1


"""     REPEAT_WEEK = 1
    REPEAT_BIWEEK = 2
    REPEAT_MONTH = 3 """


class Schedule:
    def __init__(self, s_type, occurrences, start_date, end_date) -> None:
        self.type: ScheduleType = s_type
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
        self.schedule: Schedule = schedule
        self.enabled: bool = enabled

    # def create_next_task(self) -> Task:
    #     return scheduler.create_next_task(self.id, device_manager.getDevice(self.device_id), self.duration, self.enabled, self.schedule)

    def get_id(self) -> int:
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
    def get_next_occurrence_in_period(self, now) -> int | None:
        """ Abstract method that finds the next occurence of the self configuration """

    @abstractmethod
    def get_task_type_int(self) -> int:
        """ returns the integer associated to the task type """

    def get_calculated_start_time(self) -> float:
        return self.get_schedule().get_start_date() + self.get_time()

    @abstractmethod
    def get_calculated_end_time(self) -> float:
        """ calculates the real end time when the task should stop """

    def get_next_occurrence(self, now: float) -> float | None:
        if self.get_enabled() and self.__is_task_in_period(now):
            next = self.get_next_occurrence_in_period(now)
            if self.__is_task_in_period(next):
                return next

        return None

    def __is_task_in_period(self, now):
        # if self.get_calculated_end_time() >= now:
        #     print(
        #         f"Start: {datetime.datetime.fromtimestamp(self.get_calculated_start_time(), datetime.timezone.utc)}, {now}")
        #     print(
        #         f"End: {datetime.datetime.fromtimestamp(self.get_calculated_end_time(), datetime.timezone.utc)}, {now}")
        #     print(
        #         f"Now: {datetime.datetime.fromtimestamp(now, datetime.timezone.utc)}, {now}")
        #     print("")
        return self.get_calculated_start_time() <= now and now <= self.get_calculated_end_time()

    # @staticmethod
    # def from_raw(self, raw_data) -> Self:
    #     pass

    # @staticmethod
    # def parse(data) -> Self:
    #     pass


class OneTimeTaskConfig(TaskConfig):
    def __init__(self, config_id, device_id, time, duration, enabled, schedule: Schedule) -> None:
        super().__init__(config_id, device_id, time, duration, enabled, schedule)

    def get_next_occurrence_in_period(self, now) -> float | None:
        start_date = self.get_calculated_start_time()
        print(
            f"Next ocurence is {datetime.datetime.fromtimestamp(start_date, datetime.timezone.utc)}")
        return start_date

    def get_calculated_end_time(self) -> float:
        start = self.get_calculated_start_time()
        return start + (self.get_duration() * 60)

    def get_task_type_int(self) -> int:
        return ScheduleType.ONE_TIME_EVENT.value


class MultiTimeTaskConfig(TaskConfig):
    def __init__(self, config_id, device_id, time, duration, enabled, schedule: Schedule) -> None:
        super().__init__(config_id, device_id, time, duration, enabled, schedule)
        self.occurrences = self.get_occurrences()

    def get_next_occurrence_in_period(self, now) -> float | None:
        if not self.occurrences:
            return None

        first_instance = self.get_first_instance_date()

        idx = 0
        current = first_instance
        while (current < now):
            current_week_day = self.occurrences[idx % len(self.occurrences)]
            next_week_day = self.occurrences[(idx + 1) % len(self.occurrences)]

            current = current + self.calculate_diference(current_week_day, next_week_day)
            idx = idx + 1

        start_date = current + self.get_time()
        print(
            f"Next ocurence is {datetime.datetime.fromtimestamp(start_date, datetime.timezone.utc)}")
        return start_date

    def get_first_instance_date(self) -> float | None:
        start_date_week_day = datetime.datetime.fromtimestamp(
            self.get_schedule().get_start_date(), datetime.timezone.utc).weekday()
        first_day_week_day = self.occurrences[0]

        return self.get_schedule().get_start_date() + self.calculate_diference(start_date_week_day, first_day_week_day)

    def calculate_diference(self, current, target):
        diference = 0
        if (current == target):
            return 0
        elif (current > target):
            # the current week should not be consider
            diference = 6 - current + target + 1
        else:
            diference = target - current
        return diference * 86400

    def get_occurrences(self):
        days = []
        for i in range(7):
            if self.get_schedule().get_occurrences() >> i & 0x1 == 0x1:
                days.append(i)
        return days

    def get_calculated_end_time(self) -> float:
        calculated_end = self.get_schedule().get_end_date() + self.get_time()
        return calculated_end + (self.get_duration() * 60)

    def get_task_type_int(self) -> int:
        return ScheduleType.MULTI_TIME_EVENT.value
