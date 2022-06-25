import React, { Dispatch, SetStateAction, useState } from "react";
import DatePickerTextInput from "../../../../DatePickerTextInput";
import TimePickerTextInput from "../../../../TimePickerTextInput";
import Duration from "../Duration";

import { View } from "../../../../Themed";
import { Task } from "../../../../../types";

export default function OneTimeEvent({
  task,
  setTask,
  actionSheetRef,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  actionSheetRef: any;
}) {
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

  const setTime = (date: Date) => {
    setTask((oldTask: Task) => {
      return {
        ...oldTask,
        time: getTimeFromDate(date),
      };
    });
  };

  return (
    <View>
      <DatePickerTextInput
        value={
          task?.schedule?.startDate
            ? new Date(task.schedule.startDate * 1000)
            : new Date()
        }
        setValue={setDate}
      />
      <TimePickerTextInput
        value={
          task?.schedule?.startDate
            ? new Date(task.schedule.startDate * 1000)
            : new Date()
        }
        setValue={setTime}
      />
      <Duration task={task} setTask={setTask} />
    </View>
  );
}

function getTimeFromDate(date: Date) {
  if (!date) return 0;
  let seconds = date.getSeconds();
  seconds += date.getMinutes() * 60;
  return seconds + date.getHours() * 60 * 60;
}
