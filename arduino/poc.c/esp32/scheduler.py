from task import Task
from typing import List
from random import random
from device.device_manager import device_manager
from task_manager import task_manager
# import heapq


class Scheduler:
    MAX_TASKS = 3
    
    def __init__(self) -> None:
        self.tasks: List[Task] = []
        self.running_task : Task | None = None

    def tick(self, now: float):
        if len(self.tasks) == 0:
            self.create_next_task(now)

        if self.running_task:
            self.check_to_stop_task(now);
        else:
            self.check_to_start_task(now);
    
    def check_to_stop_task(self, now: float):
        if self.running_task and now >= self.running_task.get_end_time():
            print(f"=========> time to stop {self.running_task.get_end_time()}")
            self.running_task.finish()
            self.tasks.pop(0)
            self.running_task = None

    def check_to_start_task(self, now: float):
        next_task = self.tasks[0] if len(self.tasks) > 0 else None

        if next_task and now >= next_task.get_start_time() and now <= next_task.get_end_time():
            self.running_task = next_task
            self.running_task.start()

    def create_next_task(self, now: float) -> None:
        task_config, next_start_time = task_manager.find_next_task_config(now)
        if not task_config:
            return None

        task = Task(self.get_not_existing_task_id(), task_config, device_manager.get_device(task_config.get_device_id()), task_config.get_duration(), next_start_time)
        self.add(task)

    def add(self, task: Task):
        self.tasks.append(task)
        # heapq.heappush(self.tasks, (task.get_start_time(), task))

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