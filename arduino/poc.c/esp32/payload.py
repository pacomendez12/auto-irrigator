class ConfigurationPayload:
    def __init__(self, id, device_id, schedule_type, schedule_ocurrences, schedule_start_date, schedule_end_date) -> None:
        self._id = id
        self._device_id = device_id
        self._schedule_type = schedule_type
        self._schedule_ocurrences = schedule_ocurrences
        self._schedule_start_date = schedule_start_date
        self._schedule_end_date = schedule_end_date


    @property
    def id(self):
        return self._id
    
    @property
    def device_id(self):
        return self._device_id
    
    @property
    def schedule_type(self):
        return self._schedule_type
    
    @property
    def schedule_ocurrences(self):
        return self._schedule_ocurrences
    
    @property
    def schedule_start_date(self):
        return self._schedule_start_date
    
    @property
    def schedule_end_date(self):
        return self._schedule_end_date
        

class ManualPayload:
