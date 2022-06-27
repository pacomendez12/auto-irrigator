import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Switch } from "react-native-paper";

import { Text, View } from "../Themed";
import { getTimeFromSecondsShort } from "../../util/time";
import Pressable from "../Pressable";
import { Task } from "../../types";
import { getTimeFromSeconds } from "../../util/time";
import Moment from "moment";
import "moment/locale/es-mx";

import TypeIndicator from "./TaskTypeIndicator";
import DaysIndicator from "./DaysIndicator";
import styles from "./styles";
import { ONE_TIME_EVENT } from "../../AppConstants";
import moment from "moment";

const weeksByType = [0, 1, 2, 4];

moment().locale("es-MX");

const dateOptions = {};

export default function TaskItem({
  task,
  containerStyle,
  toggleSwitch,
  onShowDeleteAlert,
  onShowEditTask,
}: {
  task: Task;
  containerStyle: StyleProp<ViewStyle>;
  toggleSwitch: (task: Task) => void;
  onShowDeleteAlert: (task: Task) => void;
  onShowEditTask: (task: Task) => void;
}) {
  const weeks = weeksByType[task?.schedule?.type ?? ONE_TIME_EVENT];

  return (
    <Pressable
      onLongPress={() => {
        onShowDeleteAlert(task);
      }}
      onPress={() => onShowEditTask(task)}
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.containerLeft}>
          <View style={styles.hourAndIndicator}>
            <Text style={styles.hourText}>
              {getTimeFromSecondsShort(task.time)}
            </Text>
            <TypeIndicator type={task?.schedule?.type} />
          </View>

          {task?.schedule?.type !== ONE_TIME_EVENT && (
            <View style={styles.daysContainer}>
              {new Array(weeks).fill(0).map((_, idx) => {
                return (
                  <DaysIndicator
                    key={idx}
                    occurrences={task?.schedule?.occurrences}
                    size={20}
                    isEditable={false}
                    offset={idx}
                  />
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.containerRight}>
          <View style={styles.timeContainer}>
            <Text style={styles.durationText}>
              {getTimeFromSeconds(task?.duration)}
            </Text>
            <Text style={styles.dates}>{getDatesString(task)}</Text>
          </View>
          <Switch
            value={task?.enabled}
            trackColor={{ false: "#dfdfdf", true: "#2f95dc77" }}
            thumbColor="#2f95dc"
            onValueChange={() => {
              toggleSwitch(task);
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}

function getDatesString(task: Task) {
  const { startDate, endDate } = task?.schedule;
  const startDateString = moment(new Date((startDate ?? 0) * 1000)).format(
    "D [de] MMM YY"
  );
  const endDateString = moment(new Date((endDate ?? 0) * 1000)).format(
    "D [de] MMM YY"
  );
  const dateString =
    startDate === endDate
      ? startDateString
      : `Del\n${startDateString}\nal\n${endDateString}`;
  return dateString;
}
