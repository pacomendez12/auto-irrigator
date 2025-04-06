import unittest
from task_config import Schedule, OneTimeTaskConfig, MultiTimeTaskConfig
from scheduler import scheduler
import time as time
import datetime
from task_manager import task_manager
from util import Time
from device.device_manager import device_manager
from device.device import Device

BASE = 0x1
NONE = 0x0
MONDAY = BASE << 0
TUESDAY = BASE << 1
WENDNESDAY = BASE << 2
THURSDAY = BASE << 3
FRIDAY = BASE << 4
SATURDAY = BASE << 5
SUNDAY = BASE << 6

ONE_TIME_EVENT = 0x0
REPEAT_WEEK = 0x1
REPEAT_BIWEEK = 0x2
REPEAT_MONTH = 0x3


class Test_SchedulerTest(unittest.TestCase):
    time_increment = 10

    def days(self, d):
        return d * 24 * 60 * 60

    def mock_tasks(self, taks):
        task_manager.clear()
        scheduler.restart()
        for key, value in taks.items():
            task_manager.add(key, value)

    def test_one_time_executed(self):
        tasks = {
            1:
            OneTimeTaskConfig(1,
                              1,
                              43200,  # 12 PM
                              1,
                              True,
                              Schedule(ONE_TIME_EVENT, SUNDAY,
                                       self.date_to_timestamp("2025-02-25T00:00:00.000Z"), self.date_to_timestamp("2025-02-25T00:00:00.000Z"))
                              # for one time even ocurrences and end_date are not used
                              )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(15) / self.time_increment)):
            t = time.now(1740370740)  # 2025-02-24 04:19:00
            if t == self.date_to_timestamp("2025-02-25T12:00:00.000Z"):
                print("time to start")
            scheduler.tick(t)
            # print(t)

            # should be on
            if t >= self.date_to_timestamp("2025-02-25T12:00:00.000Z") and t < self.date_to_timestamp("2025-02-25T12:01:00.000Z"):
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            # should be off
            elif t < self.date_to_timestamp("2025-02-25T12:00:00.000Z") or t >= self.date_to_timestamp("2025-02-25T12:01:00.000Z"):
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

            self.assertEqual(device_manager.get_device(
                2).get_state(), Device.DeviceState.STOPPED)

    def test_2_one_time_executed_in_same_day(self):
        tasks = {
            1:
            OneTimeTaskConfig(1,
                              2,
                              3600,  # 1AM
                              5,
                              True,
                              # start = 2025-02-23 00:00:00, end = 2025-02-23 00:00:00
                              Schedule(ONE_TIME_EVENT, SUNDAY,
                                       1740268800, 1740268800)
                              # for one time even ocurrences and end_date are not used
                              ),
            2:
            OneTimeTaskConfig(1,
                              1,
                              43200,  # 12PM
                              20,
                              True,
                              # start = 2025-02-23 00:00:00, end = 2025-02-23 00:00:00
                              Schedule(ONE_TIME_EVENT, SUNDAY,
                                       1740268800, 1740268800)
                              # for onw time even ocurrences and end_date are not used
                              )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(15) / self.time_increment)):
            t = time.now(1740268800)  # 2025-02-23 00:00:00
            scheduler.tick(t)

            # device 2
            if t >= 1740272400 and t < 1740272700:  # should be on
                self.assertEqual(device_manager.get_device(
                    2).get_state(), Device.DeviceState.STARTED)
            elif t < 1740272400 or t >= 1740272700:  # should be off
                self.assertEqual(device_manager.get_device(
                    2).get_state(), Device.DeviceState.STOPPED)

            # device 1
            if t >= 1740312000 and t < 1740313200:  # should be on
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            elif t < 1740312000 or t >= 1740313200:  # should be off
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

    def test_2_one_time_executed_in_different_days(self):
        tasks = {
            1:
            OneTimeTaskConfig(1,
                              2,
                              0,  # 12 AM
                              60,
                              True,
                              # start = 2025-03-01 00:00:00, end = 2025-03-01 00:00:00
                              Schedule(ONE_TIME_EVENT, SUNDAY,
                                       1740787200, 1740787200)
                              # for onw time even ocurrences and end_date are not used
                              ),
            2:
            OneTimeTaskConfig(1,
                              1,
                              43200,  # 12PM
                              20,
                              True,
                              # start = 2025-02-23 00:00:00, end = 2025-02-23 00:00:00
                              Schedule(ONE_TIME_EVENT, SUNDAY,
                                       1740268800, 1740268800)
                              # for onw time even ocurrences and end_date are not used
                              )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(15) / self.time_increment)):
            t = time.now(1740268800)  # 2025-02-23 00:00:00
            scheduler.tick(t)

            # device 2
            if t >= 1740787200 and t < 1740790800:  # should be on
                self.assertEqual(device_manager.get_device(
                    2).get_state(), Device.DeviceState.STARTED)
            elif t < 1740787200 or t >= 1740790800:  # should be off
                self.assertEqual(device_manager.get_device(
                    2).get_state(), Device.DeviceState.STOPPED)

            # device 1
            if t >= 1740312000 and t < 1740313200:  # should be on
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            elif t < 1740312000 or t >= 1740313200:  # should be off
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

    def test_multi_time_executed_for_1_week(self):
        tasks = {
            1:
            MultiTimeTaskConfig(1,
                                1,
                                43200,  # 12PM
                                20,
                                True,
                                # start = 2025-02-22 00:00:00, end = 2025-03-01 00:00:00
                                Schedule(REPEAT_WEEK, MONDAY | WENDNESDAY | FRIDAY,
                                         1740182400, 1740787200)
                                )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(7) / self.time_increment)):
            t = time.now(1740268800)  # 2025-02-23 00:00:00
            scheduler.tick(t)

            # device 1
            if (t >= self.date_to_timestamp("2025-02-24T12:00:00.000Z") and t < self.date_to_timestamp("2025-02-24T12:20:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-02-26T12:00:00.000Z") and t < self.date_to_timestamp("2025-02-26T12:20:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-02-28T12:00:00.000Z") and t < self.date_to_timestamp("2025-02-28T12:20:00.000Z")):
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            else:
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

    def test_multi_time_in_when_day_is_different_for_utc_and_local_time(self):
        tasks = {
            1:
            MultiTimeTaskConfig(1,
                                1,
                                79200,  # 10 PM
                                15,
                                True,
                                # start = 2025-02-22 00:00:00, end = 2025-03-01 00:00:00
                                Schedule(REPEAT_WEEK, MONDAY | WENDNESDAY | FRIDAY,
                                         self.date_to_timestamp("2025-02-22T00:00:00.000Z"), self.date_to_timestamp("2025-03-01T00:00:00.000Z"))
                                )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(7) / self.time_increment)):
            t = time.now(1740268800)  # 2025-02-23 00:00:00
            scheduler.tick(t)

            # device 1
            if (t >= self.date_to_timestamp("2025-02-24T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-24T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-02-26T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-26T22:15:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-02-28T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-28T22:15:00.000Z")):
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            else:
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

    def test_multi_time_in_when_day_is_different_for_utc_and_local_time_running_4_weeks(self):
        tasks = {
            1:
            MultiTimeTaskConfig(1,
                                1,
                                79200,  # 10 PM
                                15,
                                True,
                                # start = 2025-02-22 00:00:00, end = 2025-03-01 00:00:00
                                Schedule(REPEAT_WEEK, MONDAY | WENDNESDAY | FRIDAY,
                                         self.date_to_timestamp("2025-02-22T00:00:00.000Z"), self.date_to_timestamp("2025-03-22T00:00:00.000Z"))
                                )

        }
        time = Time(self.time_increment)

        self.mock_tasks(tasks)

        for _ in range(int(self.days(50) / self.time_increment)):
            t = time.now(1740268800)  # 2025-02-23 00:00:00
            scheduler.tick(t)

            # device 1
            if (t >= self.date_to_timestamp("2025-02-24T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-24T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-02-26T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-26T22:15:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-02-28T22:00:00.000Z") and t < self.date_to_timestamp("2025-02-28T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-03T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-03T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-05T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-05T22:15:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-03-07T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-07T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-10T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-10T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-12T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-12T22:15:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-03-14T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-14T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-17T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-17T22:15:00.000Z")) or \
                (t >= self.date_to_timestamp("2025-03-19T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-19T22:15:00.000Z")) or \
                    (t >= self.date_to_timestamp("2025-03-21T22:00:00.000Z") and t < self.date_to_timestamp("2025-03-21T22:15:00.000Z")):
                print(
                    f"Start: {datetime.datetime.fromtimestamp(t, datetime.timezone.utc)}, {t}")
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STARTED)
            else:
                self.assertEqual(device_manager.get_device(
                    1).get_state(), Device.DeviceState.STOPPED)

    def date_to_timestamp(self, d):
        return datetime.datetime.fromisoformat(d).timestamp()


if __name__ == '__main__':
    unittest.main()
