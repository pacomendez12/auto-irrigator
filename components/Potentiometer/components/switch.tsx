import React, { useCallback } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View } from "../../Themed";

const CONTAINER_SIZE = 50;
const BORDER_RADIUS = CONTAINER_SIZE / 2;

export default function Switch({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: (value: any) => void;
}) {
  const onPress = useCallback(() => {
    setIsOn(!isOn);
  }, [setIsOn]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button]}>
        <Ionicons
          size={30}
          name="ios-power"
          color={isOn ? "#00ccff" : "gray"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 35,
    left: 35,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 0.5,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
  },
});
