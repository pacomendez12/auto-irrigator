from device.device import Device

class Valve(Device):
    def __init__(self, device_id) -> None:
        super().__init__(device_id)
        print("creating valve")

    def change_device_state(self):
        if self.state == Device.DeviceState.STARTED:
            self.gpio_pin.on()
            print(f'starging valve in gpio {self.gpio}')
            if self.gpio_monitor_pin:
                print(f'starging monitor for valve in gpio {self.gpio_monitor}')
                self.gpio_monitor_pin.on();
        elif self.state == Device.DeviceState.STOPPED:
            self.gpio_pin.off()
            print(f'stopping valve in gpio {self.gpio}')
            if self.gpio_monitor_pin:
                print(f'stopping monitor for valve in gpio {self.gpio_monitor}')
                self.gpio_monitor_pin.off();
