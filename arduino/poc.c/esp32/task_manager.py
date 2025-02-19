import sys
import time as time
from asyncio import tasks
from typing import Self, Union

from numpy import number
# from scheduler import scheduler
from collections import OrderedDict
from task_config import TaskConfig
from task import Task
from device.device_manager import device_manager


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


class TaskManager:
    def __init__(self) -> None:
        self.tasks : dict[int, TaskConfig] = {}

    def add(self, taskConfig: TaskConfig):
        self.tasks[taskConfig.get_id()] = taskConfig

    def remove(self, task_id: int):
        del self.tasks[task_id]

    # def create_next_task(self) -> Task | None:
    #     task_config, next_start_time = self.find_next_task_config()
    #     if not task_config:
    #         return None
    #     return scheduler.create_next_task(task_config, next_start_time)
    
    def find_next_task_config(self) -> tuple[TaskConfig | None, int]:
        next_task = None
        lowest_time = sys.maxsize
        now = time.time()
        for config in self.tasks.values():
            if self.is_task_enabled_and_in_period(now, config):

                next_occurrence = config.get_next_occurrence(now)

                #if next_occurrence == None:
                #    return (None, 0)
                if next_occurrence and next_occurrence < lowest_time:
                    next_task = config
                    lowest_time = next_occurrence

        return (next_task, lowest_time)
    
    def is_task_enabled_and_in_period(self, now, config):
        if not config.get_enabled():
            return False
        
        config_time = config.get_time()
        end = config.get_schedule().get_end_date()
        end_date = end + config_time + 1

        return now >= config.get_schedule().get_start_date() and now <= end_date
    
    def persist_tasks(self):
        pass

    def load_tasks(self):
        pass

    def find_task(self, task_id):
        return self.tasks[task_id]

task_manager = TaskManager()