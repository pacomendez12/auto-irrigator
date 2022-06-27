import React from "react";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import { View } from "../../Themed";

import {
  ONE_TIME_EVENT,
  REPEAT_WEEK,
  REPEAT_BIWEEK,
  REPEAT_MONTH,
} from "../../../AppConstants";

export default function TaskTypeIndicator({ type }: { type: number }) {
  const oneTimeEvent = () => {
    return (
      <Chip
        style={{ backgroundColor: "#87decdff" }}
        textStyle={styles.chipText}
      >
        Única vez
      </Chip>
    );
  };

  const weeklyEvent = () => {
    return (
      <Chip
        style={{ backgroundColor: "#87decdff" }}
        textStyle={styles.chipText}
      >
        Semanal
      </Chip>
    );
  };
  const biWeeklyEvent = () => {
    return (
      <Chip
        style={{ backgroundColor: "#87decdff" }}
        textStyle={styles.chipText}
      >
        Quincenal
      </Chip>
    );
  };
  const MontlyEvent = () => {
    return (
      <Chip
        style={{ backgroundColor: "#87decdff" }}
        textStyle={styles.chipText}
      >
        Mensual
      </Chip>
    );
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
    marginLeft: 25,
    backgroundColor: "transparent",
  },
  chipText: {
    color: "#217867ff",
  },
});
