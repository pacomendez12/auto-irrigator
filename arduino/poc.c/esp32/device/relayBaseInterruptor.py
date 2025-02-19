from device import Device
from machine import Pin

class RelayBaseInterruptor(Device):
    def __init__(self, device_id) -> None:
        super().__init__(device_id)
        self.gpio_pin = Pin(self.gpio, mode=Pin.OUT)
        self.gpio_monitor_pin = Pin(self.gpio, mode=Pin.OUT) if self.gpio_monitor else None

    def __change_device_state(self):
        if self.state == Device.DeviceState.STARTED:
            self.gpio_pin.on()
            if self.gpio_monitor_pin:
                self.gpio_monitor_pin.on();
        elif self.state == Device.DeviceState.STOPPED:
            self.gpio_pin.off()
            if self.gpio_monitor_pin:
                self.gpio_monitor_pin.off();