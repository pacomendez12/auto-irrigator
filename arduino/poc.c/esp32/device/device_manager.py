
from device.device import Device
from device.relayBaseInterruptor import RelayBaseInterruptor
from device.valve import Valve
from device.deviceConfig import DeviceConfig

DEVICE_RELAY_BASE_INTERRUPTOR = "relayBaseInterruptor".upper()
DEVICE_VALVE = "valve".upper()

class DeviceManager:

    def __init__(self) -> None:
        self.cache = {}
        self.devices = DeviceConfig.get_devices()
        for device in self.devices:
            created = self.__createDevice(device["device_id"])
            if created:
                self.cache[created.get_device_id()] = created
        

    def get_device(self, device_id: int) -> Device:
        return self.cache[device_id]
        
    def __createDevice(self, device_id):
        for device in self.devices:
            if device["device_id"] == device_id:
                dev_type = device["type"].upper()
                if dev_type == DEVICE_RELAY_BASE_INTERRUPTOR:
                    return RelayBaseInterruptor(device_id)
                elif dev_type == DEVICE_VALVE:
                    return Valve(device_id)


device_manager: DeviceManager = DeviceManager()