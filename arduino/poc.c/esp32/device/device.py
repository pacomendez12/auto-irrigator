from abc import ABC, abstractmethod
from enum import Enum
from device.deviceConfig import DeviceConfig
from machine import Pin


class Device(ABC):
    class DeviceState(Enum):
        STOPPED = 0
        STARTED = 1

    def __init__(self, device_id) -> None:
        self.device_id = device_id
        self.gpio = DeviceConfig.map_gpio(device_id)
        self.gpio_monitor = DeviceConfig.map_gpio_monitor(device_id)
        self.name = DeviceConfig.map_device_name(device_id)
        self.gpio_pin = Pin(self.gpio, mode=Pin.OUT)
        self.gpio_monitor_pin = Pin(self.gpio_monitor, mode=Pin.OUT) if self.gpio_monitor else None
        self.stop()

    def start(self):
        self.state = self.DeviceState.STARTED
        self.change_device_state()

    def stop(self):
        self.state = self.DeviceState.STOPPED
        self.change_device_state()

    def get_device_id(self):
        return self.device_id
    
    def get_device_name(self):
        return self.name
    
    def get_state(self):
        return self.state
    
    @abstractmethod
    def change_device_state(self):
        """change device state"""
