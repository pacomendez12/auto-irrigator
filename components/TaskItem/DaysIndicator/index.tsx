import React from "react";
import { StyleSheet } from 'react-native';
import { Badge } from "react-native-paper";

import Pressable from "../../Pressable";

import { View } from "../../Themed";
import styles from "./styles";

const initials = ["L", "M", "I", "J", "V", "S", "D"];

const daysLength = initials.length;


export default function DaysIndicator({
  occurrences, size, isEditable, setOcurrences, offset = 0
}: {
  occurrences: number;
  size: number;
  isEditable: boolean;
  offset: number;
  setOcurrences?: (ocurrences: number) => any;
}) {
  const days = initials.map((_: string, dayIdx: number) => {
    return ((occurrences >> (offset * daysLength + dayIdx)) & 0x1) === 1;
  });

  const horizontalMargin = Math.floor((size - 15) / 5) > 0 ? Math.floor((size - 15) / 5) : 0;

  return (
    <View style={styles.daysContainer}>
      {days.map((dayEnabled, idx) => {
        const style = dayEnabled ? styles.active : styles.inactive;
        return (
          <Pressable key={idx} style={StyleSheet.flatten([styles.container, { marginHorizontal: horizontalMargin }])} disabled={!isEditable} onPress={() => {
            if (setOcurrences)
              setOcurrences(occurrences ^ (1 << (offset * daysLength + idx)) ?? 0);
          }}>
            <Badge visible style={style} size={size}>
              {initials[idx]}
            </Badge>
          </Pressable>
        );
      })}
    </View>
  );
}
