from typing import Self
from device.device import Device
from enum import Enum
import time

class Task:

    DEFAULT_TIMEOUT = 5 * 60 * 60

    class TaskState(Enum):
        NEW = 0
        SCHEDULED = 1
        STARTED = 2
        STOPPED = 3

    def __init__(self, id, config, device : Device, duration, start_time) -> None:
        self.id = id
        self.config = config
        self.device = device
        self.duration = duration
        self.start_time = start_time
        self.end_time = start_time + duration
        self.state = self.TaskState.NEW

    def schedule_start(self):
        self.state = self.TaskState.SCHEDULED

    def __start_task(self):
        if self.device:
            self.state = self.TaskState.STARTED
            stop_at = time.time() + self.duration
            self.device.start(stop_at)
        else:
            print(f"Task with ID: {self.id} doesn't have a device assigned. it can't be started")

    def get_id(self):
        return self.id
    
    def get_start_time(self):
        return self.start_time

    def to_raw(self):
        pass

    # @staticmethod
    # def from_raw(self, raw_data) -> Self:
    #     pass

    # @staticmethod
    # def parse(data) -> Self:
    #     pass