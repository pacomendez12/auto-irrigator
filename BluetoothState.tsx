import * as React from 'react';

export const INITIAL_STATE = {
    isBluetoothEnabled: false,
    connectedDevice: null
}

export const BluetoothContext = React.createContext(INITIAL_STATE);
