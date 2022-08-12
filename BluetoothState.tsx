import * as React from 'react';
import Device, { BleManager } from "react-native-ble-plx";

export const BLEManager = new BleManager();


export const INITIAL_STATE = {
    isBluetoothEnabled: false,
    isGpsEnabled: false,
    connectedDevice: null,
    setState: null
}

export const BluetoothContext = React.createContext(INITIAL_STATE);
