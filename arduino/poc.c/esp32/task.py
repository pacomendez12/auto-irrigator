from os import error
from typing import Self
from device.device import Device
from enum import Enum

class Task:

    DEFAULT_TIMEOUT = 5 * 60 * 60

    class TaskState(Enum):
        NEW = 0
        SCHEDULED = 1
        RUNNING = 2
        STOPPED = 3
        FINISHED = 4

    def __init__(self, id, config, device : Device, duration, start_time) -> None:
        if not device:
            raise Exception("Device could could not be None")
        self.id = id
        self.config = config
        self.device = device
        self.duration = duration
        self.start_time = start_time
        self.end_time = start_time + (duration * 60)
        self.state = self.TaskState.NEW

    def schedule_start(self):
        self.state = self.TaskState.SCHEDULED

    def finish(self):
        if self.device:
            self.device.stop()
        self.state = self.TaskState.FINISHED

    def stop(self):
        if self.device:
            self.device.stop()
        self.state = self.TaskState.STOPPED

    def start(self):
        if self.device:
            self.device.start()
        self.state = self.TaskState.RUNNING

    def get_id(self):
        return self.id
    
    def get_start_time(self):
        return self.start_time
    
    def get_end_time(self):
        return self.end_time

    def to_raw(self):
        pass

    # @staticmethod
    # def from_raw(self, raw_data) -> Self:
    #     pass

    # @staticmethod
    # def parse(data) -> Self:
    #     pass