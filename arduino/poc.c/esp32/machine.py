
class Pin:
    OUT = "out"
    IN = "in"
    
    def __init__(self, gpio, mode) -> None:
        self.gpio = gpio
        self.mode = mode
        
    def on(self):
        # print(f"machine on pin {self.gpio} is on")
        pass
    
    def off(self):
        # print(f"machine on pin {self.gpio} is off")
        pass