import React, { Dispatch, SetStateAction } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import DatePickerTextInput from "../../../../DatePickerTextInput";
import TimePickerTextInput from "../../../../TimePickerTextInput";
import Duration from "../Duration";

import { View, Text } from "../../../../Themed";
import { Task } from "../../../../../types";

import DaysIndicator from "../../../../TaskItem/DaysIndicator";

export default function MultipleWeekEvent({
  task,
  setTask,
  weeks,
  actionSheetRef,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  weeks: number;
  actionSheetRef: any;
}) {
  weeks = weeks < 0 ? 1 : weeks > 4 ? 4 : weeks;

  const setDate = (date: Date) => {
    setTask((oldTask: Task) => {
      return {
        ...oldTask,
        schedule: {
          ...oldTask.schedule,
          startDate: date.getTime() / 1000,
          endDate: date.getTime() / 1000,
        },
      };
    });
  };

  const setOcurrences = (ocurrences: number) => {
    setTask((oldTask: Task) => ({
      ...oldTask,
      schedule: {
        ...oldTask.schedule,
        occurrences: ocurrences,
      },
    }));
  };

  return (
    <SafeAreaView>
      <ScrollView
        nestedScrollEnabled={true}
        onMomentumScrollEnd={() =>
          actionSheetRef?.current?.handleChildScrollEnd()
        }
      >
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          {new Array(weeks).fill(0).map((_, idx) => {
            return (
              <View key={idx}>
                {weeks > 1 ? (
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 5,
                      textAlign: "center",
                      color: "#aaaaaaff",
                    }}
                  >{`Semana ${idx + 1}`}</Text>
                ) : null}
                <DaysIndicator
                  occurrences={task?.schedule?.occurrences}
                  size={40}
                  isEditable
                  setOcurrences={setOcurrences}
                  offset={idx}
                />
              </View>
            );
          })}
        </View>
        <View>
          <DatePickerTextInput
            value={
              task?.schedule?.startDate
                ? new Date(task.schedule.startDate * 1000)
                : new Date()
            }
            setValue={setDate}
            title="Fecha inicio"
          />
          <DatePickerTextInput
            value={
              task?.schedule?.startDate
                ? new Date(task.schedule.startDate * 1000)
                : new Date()
            }
            setValue={setDate}
            title="Fecha fin"
          />
          <TimePickerTextInput
            value={
              task?.schedule?.startDate
                ? new Date(task.schedule.startDate * 1000)
                : new Date()
            }
            setValue={setDate}
            title="Hora"
          />
          <Duration task={task} setTask={setTask} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
