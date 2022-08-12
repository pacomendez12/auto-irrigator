import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

import ValveCard from "../components/ValveCard";
import DeviceFinder from "../components/DeviceFinder";
import { BluetoothContext } from "../BluetoothState";
import { createStartMessage, createStopMessage } from "../Serialize";

const CUSTOM_SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";

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

  const setValveState = useCallback(async (state: Valve, idx: number) => {
    const services = await device.current?.services();
    console.log(services?.map((c) => c.uuid));

    const characteristics = await device.current?.characteristicsForService(
      CUSTOM_SERVICE_UUID
    );
    console.log(characteristics);

    const characteristic = characteristics[0];

    if (state.isOn) {
      const message = createStartMessage(idx, state.irrigationTime);
      console.log(message);

      console.log(Buffer.from(message, "utf-8").toString("base64"));

      characteristic.writeWithoutResponse(
        Buffer.from(message, "utf-8").toString("base64")
      );
    } else {
      const message = createStopMessage(idx);
      console.log(message);

      console.log(Buffer.from(message, "utf-8").toString("base64"));
      characteristic.writeWithoutResponse(
        Buffer.from(message, "utf-8").toString("base64")
      );
    }

    /*if (idx === 0) {
      const value = state.isOn ? "1" : "2";
      console.log(Buffer.from(value, "utf-8").toString("base64"));
      characteristic.writeWithoutResponse(
        Buffer.from(value, "utf-8").toString("base64")
      );
    } else if (idx === 1) {
      const value = state.isOn ? "3" : "4";
      console.log(Buffer.from(value, "utf-8").toString("base64"));

      characteristic.writeWithoutResponse(
        Buffer.from(value, "utf-8").toString("base64")
      );
    }*/

    setValves((valves: Array<Valve>) => {
      valves[idx] = { ...state };
      return [...valves];
    });
  }, []);

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
