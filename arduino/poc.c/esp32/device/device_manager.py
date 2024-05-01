
from device import Device
from relayBaseInterruptor import RelayBaseInterruptor
from valve import Valve


devices = [
    {"device_id": 1, "gpio": 1, "name": "device 1", "type": "relayBaseInterruptor"},
    {"device_id": 2, "gpio": 2, "name": "device 2", "type": "valve"}
]

DEVICE_RELAY_BASE_INTERRUPTOR = "relayBaseInterruptor".upper()
DEVICE_VALVE = "valve".upper()

class DeviceManager:

    def __init__(self) -> None:
        self.__load_devices()
        self.cache = []

    def map_gpio(self, device_id: int):
        return self.__get_property(device_id, "gpio")
    
    def map_device_name(self, device_id: int):
        return self.__get_property(device_id, "name")
    
    def __load_devices(self):
        #TODO: change this implementation to get config from file
        self.devices = devices
    
    def __get_property(self, device_id, property: str):
        devs = list(filter(lambda dev: device_id == dev["device_id"], devices))
        if len(devs) == 0 or not devs[0][property]:
            return None
        return devs[0][property]

    def get_device(self, device_id: int) -> Device:
        if not self.cache[device_id]:
            self.cache[device_id] = self.__createDevice(device_id)
        return self.cache[device_id]
        
    def __createDevice(self, device_id):
        device = self.devices[0]
        dev_type = device["type"].upper()
        if dev_type == DEVICE_RELAY_BASE_INTERRUPTOR:
            return RelayBaseInterruptor(device_id)
        elif dev_type == DEVICE_VALVE:
            return Valve(device_id)


device_manager: DeviceManager = DeviceManager()