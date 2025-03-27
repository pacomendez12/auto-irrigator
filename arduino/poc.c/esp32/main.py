from scheduler import scheduler
import time as time
import datetime

class Main:

    def __init__(self) -> None:
        print("starting app")

    def run(self):
        while True:
            t = time.time() #1740370740
            # print(t)
            mytimestamp = datetime.datetime.fromtimestamp(t)
            # print("Converted Datetime:", mytimestamp)
            scheduler.tick(t)
            time.sleep(1)
            

app = Main()
app.run()