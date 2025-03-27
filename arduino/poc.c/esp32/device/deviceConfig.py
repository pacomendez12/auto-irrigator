

devices = [
    {"device_id": 1, "gpio": 1, "gpio_monitor": 2, "name": "device 1", "type": "valve"},
    {"device_id": 2, "gpio": 3, "gpio_monitor": 4, "name": "device 2", "type": "relayBaseInterruptor"}
]


class DeviceConfig:
    loaded_devices : list[dict] | None = None
    
    @staticmethod
    def load_devices() -> None:
        DeviceConfig.loaded_devices = devices # TODO: load devices here from file
    
    @staticmethod
    def get_devices() -> list[dict]:
        if DeviceConfig.loaded_devices:
            return DeviceConfig.loaded_devices
        DeviceConfig.load_devices()
        return DeviceConfig.loaded_devices or list()
    
    @staticmethod
    def map_gpio(device_id: int):
        return DeviceConfig.__get_property(device_id, "gpio")
    
    @staticmethod
    def map_gpio_monitor(device_id: int):
        return DeviceConfig.__get_property(device_id, "gpio_monitor")
    
    @staticmethod
    def map_device_name(device_id: int):
        return DeviceConfig.__get_property(device_id, "name")
    
    @staticmethod
    def __get_property(device_id, property: str):
        if not DeviceConfig.loaded_devices:
            return None
        devs = list(filter(lambda dev: device_id == dev["device_id"], DeviceConfig.loaded_devices))
        if len(devs) == 0 or not devs[0][property]:
            return None
        return devs[0][property]