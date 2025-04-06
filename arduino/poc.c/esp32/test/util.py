class Time:
    def __init__(self, increment):
        self.current_time = None    
        self.increment = increment
    
    def now(self, start):
        if (self.current_time):
            self.current_time = self.current_time + self.increment
        else:
            self.current_time = start
        
        return self.current_time