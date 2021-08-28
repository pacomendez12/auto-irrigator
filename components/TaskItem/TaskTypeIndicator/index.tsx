import React from "react";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import { Text, View } from "../../Themed";

const ONE_TIME_EVENT = 0x0;
const REPEAT_WEEK = 0x1;
const REPEAT_BIWEEK = 0x2;
const REPEAT_MONTH = 0x3;

export default function TaskTypeIndicator({ type }: { type: number }) {
  const oneTimeEvent = () => {
    return <Chip>Única vez</Chip>;
  };

  const weeklyEvent = () => {
    return <Chip>Semanal</Chip>;
  };
  const biWeeklyEvent = () => {
    return <Chip>Cada 2 semanas</Chip>;
  };
  const MontlyEvent = () => {
    return <Chip>Mensual</Chip>;
  };

  const renderIndicator = () => {
    switch (type) {
      case ONE_TIME_EVENT:
        return oneTimeEvent();
      case REPEAT_WEEK:
        return weeklyEvent();
      case REPEAT_BIWEEK:
        return biWeeklyEvent();
      case REPEAT_MONTH:
        return MontlyEvent();
    }

    return null;
  };

  return <View style={styles.container}>{renderIndicator()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    backgroundColor: "transparent",
  },
});
