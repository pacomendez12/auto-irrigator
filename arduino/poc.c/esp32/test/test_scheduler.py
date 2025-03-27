import unittest
from unittest.mock import patch
from task_config import Schedule, OneTimeTaskConfig
from scheduler import scheduler
import time as time
import datetime
from task_manager import task_manager
from task import Task

BASE = 0x1
NONE = 0x0
SUNDAY = BASE << 0
MONDAY = BASE << 1
TUESDAY = BASE << 2
WENDNESDAY = BASE << 3
THURSDAY = BASE << 4
FRIDAY = BASE << 5
SATURDAY = BASE << 6

ONE_TIME_EVENT = 0x0
REPEAT_WEEK = 0x1
REPEAT_BIWEEK = 0x2
REPEAT_MONTH = 0x3


class Test_SchedulerTest(unittest.TestCase):
    mockTasks = {
        1:
        OneTimeTaskConfig(1,
                          1,
                          83280,
                          1,
                          True,
                          Schedule(ONE_TIME_EVENT, SUNDAY | MONDAY | TUESDAY | WENDNESDAY |
                                   THURSDAY | FRIDAY | SATURDAY, 1740290400, 1740420000) # start = 2025-02-23 06:00:00, end = 2025-02-24 18:00:00
                          )

    }
    

    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        self.current_time = None
        task_manager.clear()
        for key, value in self.mockTasks.items():
            task_manager.add(key, value)
        
        
    
    def now(self, start):
        if (self.current_time):
            self.current_time = self.current_time + 1
        else:
            self.current_time = start
        
        return self.current_time

    def days(self, d):
        return d * 24 * 60 * 60

    def test_one_time_executed(self):
        with patch.object(Task, "start") as start, patch.object(Task, "finish") as finish:
        
            for _ in range(self.days(30)):
                t = self.now(1740370740) #2025-02-24 04:19:00
                # print(t)
                mytimestamp = datetime.datetime.fromtimestamp(t)
                # print("Converted Datetime:", mytimestamp)
                scheduler.tick(t)
                # time.sleep(1)
            start.assert_called_once()
            finish.assert_called_once()

if __name__ == '__main__':
    unittest.main()