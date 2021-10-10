import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { cloneDeep } from "lodash";

import { Text, View } from "../components/Themed";
import TaskItem from "../components/TaskItem";
import Alert from "../components/Alert";
import EmptyState from "../components/EmptyState";
import NewTaskModal from "../components/NewTaskModal";

import { Task } from "../types";
import {
  NONE,
  MONDAY,
  TUESDAY,
  WENDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  ONE_TIME_EVENT,
  REPEAT_WEEK,
  REPEAT_BIWEEK,
  REPEAT_MONTH,
} from "../AppConstants";

const mockTasks: Task[] = [
  {
    id: 1,
    time: 1480,
    schedule: {
      type: REPEAT_WEEK,
      occurrences: MONDAY | WENDNESDAY | FRIDAY,
      startDate: 1633849259325,
      endDate: 1633849259325
    },
    enabled: true,
  },
  {
    id: 2,
    time: 480,
    schedule: {
      type: REPEAT_BIWEEK,
      occurrences: TUESDAY | THURSDAY,
      startDate: 1633849259325,
      endDate: 1633849259325
    },
    enabled: true,
  },
  {
    id: 3,
    time: 72020,
    schedule: {
      type: ONE_TIME_EVENT,
      occurrences: NONE,
      startDate: 1633849259325,
      endDate: 1633849259325
    },
    enabled: true,
  },
];

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState(cloneDeep(mockTasks));
  const currentTask = useRef<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const toggleIsEnabled = (task: Task) => {
    setTasks((tasks: [Task]) => {
      return tasks.map((t) => {
        if (t === task) return { ...t, enabled: !t.enabled };
        return t;
      });
    });
  };

  const onShowDeleteTask = (task: Task) => {
    currentTask.current = task;
    setShowDeleteAlert(true);
  };

  const hideDeleteAlert = () => {
    currentTask.current = null;
    setShowDeleteAlert(false);
  };

  const onDeleteTask = () => {
    setTasks((tasks: [Task]) =>
      tasks.filter((task) => task?.id !== currentTask.current?.id)
    );
    currentTask.current = null;
  };

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <TaskItem
        task={item}
        toggleSwitch={toggleIsEnabled}
        containerStyle={{
          marginLeft: 25,
        }}
        onShowDeleteAlert={onShowDeleteTask}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item: Task, index: number) => `${item?.id}`}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <EmptyState
            title="No hay tareas programadas"
            message="Para agregar una tarea presiona el botón '+' en la esquina inferior."
            icon={{ name: "water-off" }}
          />
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        uppercase={false}
        onPress={() => {
          setShowNewTaskModal(true);
        }}
      />
      <NewTaskModal
        showModal={showNewTaskModal}
        onHide={() => setShowNewTaskModal(false)}
      />
      <Alert
        title="Eliminar"
        message="¿Quieres eliminar esta tarea?"
        showAlert={showDeleteAlert}
        onHide={hideDeleteAlert}
        onDelete={onDeleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  fab: {
    position: "absolute",
    backgroundColor: "#2f95dc",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listContentContainer: {
    flexGrow: 1,
  },
});
