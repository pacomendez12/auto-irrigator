import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import ValveCard from "../components/ValveCard";
import Potentiometer from "../components/Potentiometer";
import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  const [devices, setDevices] = useState(["Válvula 1", "Válvula 2"]);

  const setDeviceName = (deviceId: number, name: string) => {
    setDevices((devs: string[]) => {
      const copy = [...devs];
      copy[deviceId] = name;
      return copy;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {devices.map((device: string, idx: number) => {
          return (
            <ValveCard
              key={idx}
              id={idx}
              deviceName={device}
              setDeviceName={setDeviceName}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
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
