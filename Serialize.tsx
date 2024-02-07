enum Action {
  STOP,
  MANUAL_START,
  SET_DATE,
  ADD_TASK,
  DELETE_TASK,
  CHANGE_TASK,
  SET_DEVICE_NAME,
}

interface Message {
  action: Action;
  deviceId: number | null;
  payload: any | null;
}

function createMessage(
  action: Action,
  deviceId: number | null | undefined,
  payload: any | null
): string {
  const message = {
    action: action,
    deviceId: deviceId,
    payload: payload,
  };

  return JSON.stringify(message);
}

export function createStartMessage(deviceId: number, duration: number) {
  return createMessage(Action.MANUAL_START, deviceId, { duration });
}

export function createStopMessage(deviceId: number) {
  return createMessage(Action.STOP, deviceId, null);
}

export function createSetDateMessage() {
  const date = new Date();
  const secondsInTimeZone = Math.floor(date.getTime() / 1000);
  const utcSeconds = secondsInTimeZone - (date.getTimezoneOffset() * 60);
  return createMessage(Action.SET_DATE, undefined, { currentDate: utcSeconds });
}

/*export function createGetDateMessage() {
  return createMessage(Action.GET_DATE, null, null);
}*/
