import React, { useMemo, useRef } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../Themed";
import Led, { LED_WIDTH } from "./Led";

const CONTAINER_SIZE = 150;
// const RADIUS = CONTAINER_SIZE / 2 - LED_WIDTH / 4;
const RADIUS = CONTAINER_SIZE / 2;

const calculateLedsPosition = (number: number) => {
  return Array(number)
    .fill(0)
    .map((_, idx) => {
      const deg = idx * 30 + 135;
      const angle = (deg * Math.PI) / 180;

      const x = RADIUS + Math.cos(angle) * RADIUS;
      const y = RADIUS + Math.sin(angle) * RADIUS;
      const rotation = Math.atan((RADIUS - y) / (RADIUS - x)) + Math.PI / 2;
      return { x, y, rotation };
    });
};

export default function LedLine({
  level,
  isActive,
}: {
  level: number;
  isActive: boolean;
}) {
  const ledParams = useMemo(() => calculateLedsPosition(10), []);

  return (
    <View style={styles.ledIndicatorsBar}>
      {ledParams.map(({ x, y, rotation }, idx) => (
        <Led
          key={idx}
          x={x}
          y={y}
          isActive={isActive}
          isOn={level >= idx}
          rotation={rotation}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ledIndicatorsBar: {
    position: "absolute",
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    backgroundColor: "#ececec",
    borderRadius: RADIUS,
    flex: 1,
    flexDirection: "row",
  },
});
