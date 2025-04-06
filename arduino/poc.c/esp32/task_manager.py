import sys
from typing import Type

from task_config import Schedule, TaskConfig, OneTimeTaskConfig


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

ONE_TIME_EVENT = 0x0
REPEAT_WEEK = 0x1
REPEAT_BIWEEK = 0x2
REPEAT_MONTH = 0x3

mockTasks = {
    1:
    OneTimeTaskConfig(0,
                      1,
                      83280,
                      1,
                      True,
                      Schedule(ONE_TIME_EVENT, SUNDAY | MONDAY | TUESDAY | WENDNESDAY |
                               THURSDAY | FRIDAY | SATURDAY, 1740290400, 1740420000)
                      )

}


class TaskManager:
    def __init__(self, tasks) -> None:
        self.tasks: dict[int, TaskConfig] = {}
        for key, value in tasks.items():
            self.add(key, value)

    def add(self, id: int, taskConfig: Type[TaskConfig]):
        self.tasks[id] = taskConfig

    def remove(self, task_id: int):
        del self.tasks[task_id]
        
    def clear(self):
        self.tasks.clear()

    def find_next_task_config(self, now: float) -> tuple[TaskConfig | None, float]:
        next_task = None
        lowest_time = sys.maxsize
        for config in self.tasks.values():
            next_occurrence = config.get_next_occurrence(now)

            if next_occurrence and next_occurrence < lowest_time:
                next_task = config
                lowest_time = next_occurrence

        return (next_task, lowest_time)

    def persist_tasks(self):
        pass

    def load_tasks(self):
        pass

    def find_task(self, task_id):
        return self.tasks[task_id]


task_manager = TaskManager(mockTasks)
