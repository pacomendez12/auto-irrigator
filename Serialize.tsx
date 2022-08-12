enum Action {
  STOP,
  START,
  SET_TASKS,
  GET_TASKS,
  SET_DATE,
  GET_DATE,
  CONFIG_DEVICE,
}

interface Message {
  action: Action;
  deviceId: number | null;
  payload: any | null;
}

function createMessage(
  action: Action,
  deviceId: number | null,
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
  return createMessage(Action.START, deviceId, { duration });
}

export function createStopMessage(deviceId: number) {
  return createMessage(Action.STOP, deviceId, null);
}

export function createSetDateMessage() {
  return createMessage(Action.SET_DATE, null, new Date().getTime() / 1000);
}

export function createGetDateMessage() {
  return createMessage(Action.GET_DATE, null, null);
}
