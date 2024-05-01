from device import Device

class Valve(Device):
    def __init__(self, device_id) -> None:
        super().__init__(device_id)

    def _change_device_state(self, state: Device.DeviceState):
        print("here")

print(Valve(1))