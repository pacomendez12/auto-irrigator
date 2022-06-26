import React, { Dispatch, SetStateAction } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { View, Text } from "../../../Themed";
import { getTimeFromSeconds } from "../../../../util/time";

import useDuration, { TOTAL_DURATION_STEPS } from "../../hooks/useDuration";

import { Task } from "../../../../types";

import styles from "./styles";
import { ColorPropType } from "react-native";

export default function Duration({
  task,
  setTask,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
}) {
  const [{ duration, durationIndex }, setDurationIndex] = useDuration(
    task.duration
  );

  const setDuration = (index: number | Array<number>) => {
    setDurationIndex(index);
    setTask((oldTask: Task) => ({ ...oldTask, duration: duration }));
  };

  return (
    <View style={styles.durationContainer}>
      <Slider
        value={durationIndex}
        onValueChange={setDuration}
        step={1}
        minimumValue={0}
        maximumValue={TOTAL_DURATION_STEPS}
        thumbTintColor={"#2e78b7"}
        minimumTrackTintColor={"#48aae7ff"}
        maximumTrackTintColor={"#48aae7ff"}
      />
      <Text style={styles.timeText}>{`Duración: ${getTimeFromSeconds(
        duration
      )}`}</Text>
    </View>
  );
}
