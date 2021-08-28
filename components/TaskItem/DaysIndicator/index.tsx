import React from "react";
import { Badge } from "react-native-paper";

import { View } from "../../Themed";
import styles from "./styles";

const initials = ["L", "M", "I", "J", "V", "S", "D"];


export default function getDaysString({
  occurrences,
}: {
  occurrences: number;
}) {
  const totalDays = countDays(occurrences);
  if (totalDays === 0) return null;

  const days = initials.map((_: string, dayIdx: number) => {
    return ((occurrences >> dayIdx) & 0x1) === 1;
  });

  return (
    <React.Fragment>
      {days.map((dayEnabled, idx) => {
        const style = dayEnabled ? styles.active : styles.inactive;
        return (
          <View key={idx} style={styles.container}>
            <Badge visible style={style}>
              {initials[idx]}
            </Badge>
          </View>
        );
      })}
    </React.Fragment>
  );
}

function countDays(daysFlags: number) {
  let counter = 0;
  for (let i = 0; i < 8; i++) {
    if (((daysFlags >> i) & 0x1) === 1) counter++;
  }
  return counter;
}