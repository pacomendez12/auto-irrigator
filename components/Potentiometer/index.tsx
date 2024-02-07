import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { MonoText } from "../StyledText";
import { Text, View } from "../Themed";
import LedLine from "./components/LedLine";
import Knob from "./components/knob";
import Switch from "./components/switch";

const CONTAINER_SIZE = 160;
const COMPONENT_SIZE = CONTAINER_SIZE - 10;

export default function Potentiometer({
  isOn,
  setIsOn,
  level,
  setLevel,
}: {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  level: number;
  setLevel: (value: number) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.knobContainer}>
        <LedLine level={level} isActive={!isOn} />
        <Knob
          level={level}
          setLevel={setLevel}
          isOn={isOn}
          setIsOn={setIsOn}
          isActive={!isOn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: CONTAINER_SIZE,
    width: CONTAINER_SIZE,
    backgroundColor: "#ececec"
  },
  knobContainer: {
    position: "absolute",
    width: COMPONENT_SIZE,
    height: COMPONENT_SIZE,
    backgroundColor: "#ececec"
  },
});
