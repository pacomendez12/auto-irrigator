from command import Command

# data format: |action|
class Start(Command):
    
    def execute(self):
        payload = self.client.getLastCommand()