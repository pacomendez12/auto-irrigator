import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Switch } from "react-native-paper";

import { Text, View } from "../Themed";
import { getTimeFromSecondsShort } from "../../util/time";
import Pressable from "../Pressable";
import { Task } from "../../types";

import TypeIndicator from "./TaskTypeIndicator";
import DaysIndicator from "./DaysIndicator";
import styles from "./styles";

export default function Item({
  task,
  containerStyle,
  toggleEnabled,
  onShowDeleteAlert,
}: {
  task: Task;
  containerStyle: StyleProp<ViewStyle>;
  toggleEnabled: (task: Task) => void;
  onShowDeleteAlert: (task: Task) => void;
}) {
  return (
    <Pressable
      onLongPress={() => {
        onShowDeleteAlert(task);
      }}
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.containerLeft}>
          <View style={styles.hourAndIndicator}>
            <Text style={styles.hourText}>
              {getTimeFromSecondsShort(task.time)}
            </Text>
            <TypeIndicator type={task?.schedule?.type} />
          </View>

          <View style={styles.daysContainer}>
            <DaysIndicator occurrences={task?.schedule?.occurrences} />
          </View>
        </View>
        <View style={styles.containerRight}>
          <Switch
            value={task?.enabled}
            trackColor={{ false: "#dfdfdf", true: "#2f95dc77" }}
            thumbColor="#2f95dc"
            onValueChange={() => {
              toggleEnabled(task);
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}
