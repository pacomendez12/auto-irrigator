import React, { useRef, useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";
import SwitchSelector from "react-native-switch-selector";

import { View, Text } from "../Themed";
import Header from "./Header";

import * as Constants from "../../AppConstants";

import styles from "./styles";
import TaskTypeContent from "./TaskTypeContent/index";
import { Task } from "../../types";

const options = [
  { label: "Una vez", value: Constants.ONE_TIME_EVENT },
  { label: "Semanal", value: Constants.REPEAT_WEEK },
  { label: "Quincenal", value: Constants.REPEAT_BIWEEK },
  { label: "Mensual", value: Constants.REPEAT_MONTH },
];

export default function NewTaskModal(props: {
  showModal: boolean;
  onHide: () => void;
  onAddTask: (task: Task) => void;
}) {
  const actionSheetRef = useRef<ActionSheet>(null);
  const [task, setTask] = useState<Task>(createEmptyTask());

  useEffect(() => {
    if (props?.showModal) setTask(createEmptyTask());
    if (actionSheetRef.current)
      actionSheetRef.current.setModalVisible(props?.showModal);
  }, [props?.showModal]);

  const onAccept = () => {
    props?.onHide();
    props?.onAddTask(task);
  };

  const setTaskType = (type: number) => {
    setTask((oldTask: Task) => ({
      ...oldTask,
      schedule: { ...oldTask.schedule, type },
    }));
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      bounceOnOpen
      CustomHeaderComponent={
        <Header onAccept={onAccept} onCancel={props?.onHide} />
      }
      onClose={props?.onHide}
      closeOnTouchBackdrop={false}
    >
      <View style={styles.container}>
        <View style={styles.taskTypeSelector}>
          {/* <Text style={styles.label}>Tipo de tarea</Text> */}
          <View style={styles.switchSelectorContainer}>
            <SwitchSelector
              options={options}
              initial={task?.schedule?.type ?? Constants.ONE_TIME_EVENT}
              buttonColor="#2f95dc"
              onPress={(value: number) => setTaskType(value)}
            />
          </View>
        </View>

        <View style={{ alignSelf: "stretch" }}>
          <TaskTypeContent
            taskType={task?.schedule?.type ?? Constants.ONE_TIME_EVENT}
            task={task}
            setTask={setTask}
            actionSheetRef={actionSheetRef}
          />
        </View>
      </View>
    </ActionSheet>
  );
}

function createEmptyTask(): Task {
  const now = new Date();
  const nowWithoutSeconds = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getUTCMinutes(),
    0
  );

  const nowUnix = nowWithoutSeconds.getTime() / 1000;

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
  const time = Math.floor((now.getTime() - todayStart.getTime()) / 1000);

  return {
    id: nowUnix - Math.random() * Number.MAX_SAFE_INTEGER,
    time,
    duration: 0,
    schedule: {
      type: Constants.ONE_TIME_EVENT,
      occurrences: 0,
      startDate: nowUnix,
      endDate: nowUnix,
    },
    enabled: true,
  };
}
