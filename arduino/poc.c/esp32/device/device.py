from abc import ABC, abstractmethod
from enum import Enum
from device_manager import device_manager


class Device(ABC):
    class DeviceState(Enum):
        STOPPED = 0
        STARTED = 1

    def __init__(self, device_id) -> None:
        self.device_id = device_id
        self.gpio = device_manager.map_gpio(device_id)
        self.name = device_manager.map_device_name(device_id)
        self.stop()

    def start(self, timeout):
        self.state = self.DeviceState.STARTED
        self._change_device_state(self.state)

    def stop(self):
        self.state = self.DeviceState.STOPPED
        self._change_device_state(self.state)

    def get_device_id(self):
        return self.device_id
    
    def get_device_name(self):
        return self.name
    
    def get_state(self):
        return self.state
    
    @abstractmethod
    def _change_device_state(self, state: DeviceState):
        """change device state"""
