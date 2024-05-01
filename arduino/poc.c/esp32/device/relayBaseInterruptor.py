from device import Device

class RelayBaseInterruptor(Device):
    def __init__(self, device_id) -> None:
        super().__init__(device_id)

    def __change_device_state(self):
        pass