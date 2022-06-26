import React, { useRef, useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";
import SwitchSelector from "react-native-switch-selector";

import { View, Text } from "../Themed";
import Header from "./Header";

import * as Constants from "../../AppConstants";

import styles from "./styles";
import TaskTypeContent from "../TaskTypeModelContent/index";
import { Task } from "../../types";

const options = [
  { label: "Una vez", value: Constants.ONE_TIME_EVENT },
  { label: "Semanal", value: Constants.REPEAT_WEEK },
  { label: "Quincenal", value: Constants.REPEAT_BIWEEK },
  { label: "Mensual", value: Constants.REPEAT_MONTH },
];

export default function EditTaskModal(props: {
  showModal: boolean;
  onHide: () => void;
  task: Task | null;
  onEditTask: (newtask: Task | null, originalTask: Task | null) => void;
}) {
  const actionSheetRef = useRef<ActionSheet>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(props.task);

  useEffect(() => {
    if (props?.showModal) setCurrentTask(props?.task);
    if (actionSheetRef.current)
      actionSheetRef.current.setModalVisible(props?.showModal);
  }, [props?.showModal, props?.task]);

  if (!currentTask || !props.task) {
    return null;
  }

  const onAccept = () => {
    props?.onHide();
    props?.onEditTask(currentTask, props?.task);
  };

  const setTaskType = (type: number) => {
    setCurrentTask((oldTask: Task | null) => {
      if (!oldTask) return null;
      return {
        ...oldTask,
        schedule: { ...oldTask.schedule, type },
      };
    });
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
          <View style={styles.switchSelectorContainer}>
            <SwitchSelector
              options={options}
              initial={currentTask?.schedule?.type ?? Constants.ONE_TIME_EVENT}
              buttonColor="#2f95dc"
              onPress={(value: number) => setTaskType(value)}
            />
          </View>
        </View>
        <View style={{ alignSelf: "stretch" }}>
          <TaskTypeContent
            taskType={currentTask?.schedule?.type ?? Constants.ONE_TIME_EVENT}
            task={currentTask}
            setTask={setCurrentTask}
            actionSheetRef={actionSheetRef}
          />
        </View>
      </View>
    </ActionSheet>
  );
}
