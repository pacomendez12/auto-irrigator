import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Characteristic, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

import ValveCard from "../components/ValveCard";
import DeviceFinder from "../components/DeviceFinder";
import { BluetoothContext } from "../BluetoothState";
import { createStartMessage, createStopMessage } from "../Serialize";

const CUSTOM_SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";

const MESSAGE_CHUNK_SIZE = 20;

interface Valve {
  name: string;
  isOn: boolean;
  irrigationTime: number;
}

export default function ManualIrrigation() {
  const [valves, setValves] = useState<Array<Valve>>([
    { name: "Válvula 1", isOn: false, irrigationTime: 0 },
    { name: "Válvula 2", isOn: false, irrigationTime: 0 },
  ]);
  const device = useRef<Device>(null);

  /*const setDeviceName = (deviceId: number, name: string) => {
    setValves((devs: string[]) => {
      const copy = [...devs];
      copy[deviceId] = name;
      return copy;
    });
  };*/

  const renderDeviceFinder = (state: any) => {
    return (
      <DeviceFinder
        isBluetoothEnabled={state?.isBluetoothEnabled}
        isGpsEnabled={state.isGpsEnabled}
        setState={state.setState}
      />
    );
  };

  const setValveState = async (state: Valve, idx: number) => {
    const currentValve = valves[idx];
    if (currentValve.isOn !== state.isOn) {
      const characteristics = await device.current?.characteristicsForService(
        CUSTOM_SERVICE_UUID
      );

      const characteristic = characteristics?.[0] ?? null;

      if (characteristic) {
        if (state.isOn) {
          const message = createStartMessage(idx, state.irrigationTime);
          sendMessage(characteristic, message);
        } else {
          const message = createStopMessage(idx);
          sendMessage(characteristic, message);
        }
      }
    }

    setValves((valves: Array<Valve>) => {
      valves[idx] = { ...state };
      return [...valves];
    });
  };

  const renderManualScreen = (BTstate) => {
    device.current = BTstate.connectedDevice;

    return (
      <ScrollView style={styles.scrollView} bounces={false}>
        {valves.map((valve: Valve, idx: number) => {
          return (
            <ValveCard
              key={idx}
              id={idx}
              valve={valve}
              setValve={setValveState}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <BluetoothContext.Consumer>
      {(state) => {
        const connected = state?.connectedDevice !== null;
        return (
          <SafeAreaView style={styles.container}>
            <>
              {connected && renderManualScreen(state)}
              {!connected && renderDeviceFinder(state)}
            </>
          </SafeAreaView>
        );
      }}
    </BluetoothContext.Consumer>
  );
}

function sendMessage(characteristic: Characteristic, message: String) {
  const bufferSize = message.length;
  const bufferSizeMessage = Buffer.from(String(bufferSize), "utf-8").toString(
    "base64"
  );

  characteristic.writeWithoutResponse(bufferSizeMessage);

  let i = 0;
  for (let i = 0; i < Math.ceil(bufferSize / MESSAGE_CHUNK_SIZE); i++) {
    const start = i * MESSAGE_CHUNK_SIZE;
    const end =
      i * MESSAGE_CHUNK_SIZE <= bufferSize
        ? (i + 1) * MESSAGE_CHUNK_SIZE
        : bufferSize;

    const subMsg = message.substring(start, end);

    characteristic.writeWithoutResponse(
      Buffer.from(String(subMsg), "utf-8").toString("base64")
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "stretch",
    alignItems: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  scrollView: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
