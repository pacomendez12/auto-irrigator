from abc import ABC, abstractmethod
from Client import Client

class Command(ABC):

    def __init__(self, client: Client) -> None:
        super().__init__()
        self.client = client

    @abstractmethod
    def execute(self): None
        

    