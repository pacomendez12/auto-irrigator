import React, { Dispatch, SetStateAction } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import DatePickerTextInput from "../../../DatePickerTextInput";
import TimePickerTextInput from "../../../TimePickerTextInput";
import Duration from "../Duration";

import { View, Text } from "../../../Themed";
import { Task } from "../../../../types";

import DaysIndicator from "../../../TaskItem/DaysIndicator";

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

  const setStartDate = (date: Date) => {
    setTask((oldTask: Task) => {
      const startDate = date.getTime() / 1000;
      const endDate =
        startDate > (oldTask?.schedule?.endDate ?? 0)
          ? startDate
          : oldTask?.schedule?.endDate;
      return {
        ...oldTask,
        schedule: {
          ...oldTask.schedule,
          startDate,
          endDate,
        },
      };
    });
  };

  const setEndDate = (date: Date) => {
    setTask((oldTask: Task) => {
      const endDate = date.getTime() / 1000;
      const startDate =
        endDate < (oldTask?.schedule?.startDate ?? Number.MAX_VALUE)
          ? endDate
          : oldTask?.schedule?.startDate;
      return {
        ...oldTask,
        schedule: {
          ...oldTask.schedule,
          startDate,
          endDate,
        },
      };
    });
  };

  const setTime = (date: Date) => {
    setTask((oldTask: Task) => {
      return {
        ...oldTask,
        time: getTimeFromDate(date),
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

  const startDate = task?.schedule?.startDate
    ? new Date(task.schedule.startDate * 1000)
    : new Date();

  const endDate = task?.schedule?.endDate
    ? new Date(task.schedule.endDate * 1000)
    : new Date();

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
            value={startDate}
            setValue={setStartDate}
            title="Fecha inicio"
          />
          <DatePickerTextInput
            value={endDate}
            setValue={setEndDate}
            title="Fecha fin"
          />
          <TimePickerTextInput
            value={
              task?.schedule?.startDate
                ? new Date(getDateFromTime(startDate, task.time))
                : new Date()
            }
            setValue={setTime}
            title="Hora"
          />
          <Duration task={task} setTask={setTask} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getDateFromTime(initialDate: Date, totalSeconds: number) {
  if (!initialDate) return new Date();
  const result = new Date(initialDate);

  const hours = totalSeconds / 60 / 60;
  result.setHours(hours);

  const minutes = (totalSeconds % (60 * 60)) / 60;
  result.setMinutes(minutes);

  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
}

function getTimeFromDate(date: Date) {
  if (!date) return 0;
  let seconds = date.getSeconds();
  seconds += date.getMinutes() * 60;
  return seconds + date.getHours() * 60 * 60;
}
