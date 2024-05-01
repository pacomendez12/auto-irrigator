from task import Task
from typing import List
from random import random
from task_config import TaskConfig
from device.device_manager import device_manager
import heapq


class Scheduler:
    MAX_TASKS = 20
    
    def __init__(self) -> None:
        self.tasks = []
        pass

    def create_next_task(self, config : TaskConfig, next_start_time) -> Task:
        task = Task(self.get_not_existing_task_id(), config, device_manager.get_device(config.get_device_id()), config.get_duration(), next_start_time)
        self.add(task)
        return task

    def add(self, task: Task):
        heapq.heappush(self.tasks, (task.get_start_time(), task))

    def remove(self, task_id: int):
        self.tasks = [t for t in self.tasks if t.get_id() != task_id]

    def upsert(self, task_id, task: Task):
        self.remove(task_id)
        self.add(task)

    def get_not_existing_task_id(self):
        while True:
            id = random() * 65535
            task = self.find_task(id)
            if (not task):
                return id
            

    def find_task(self, task_id):
        for task in self.tasks:
            if task.get_id() == task_id:
                return task
    
    def persist_tasks(self):
        pass

    def load_tasks(self):
        pass

scheduler : Scheduler = Scheduler()