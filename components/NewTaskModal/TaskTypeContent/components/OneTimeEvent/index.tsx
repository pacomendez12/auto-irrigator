import React, { Dispatch, SetStateAction } from "react";
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

  const date = task?.schedule?.startDate
    ? new Date(task.schedule.startDate * 1000)
    : new Date();

  return (
    <View>
      <DatePickerTextInput value={date} setValue={setDate} />
      <TimePickerTextInput
        value={
          task?.schedule?.startDate
            ? new Date(getDateFromTime(date, task.time))
            : new Date()
        }
        setValue={setTime}
      />
      <Duration task={task} setTask={setTask} />
    </View>
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
