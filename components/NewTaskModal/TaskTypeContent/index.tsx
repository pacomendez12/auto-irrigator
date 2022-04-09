import React from "react";
import * as Constants from "../../../AppConstants";

import { Task } from "../../../types";

import OneTimeEvent from "./components/OneTimeEvent";
import MultipleWeekEvent from "./components/MultipleWeeksEvent";

export default function TaskTypeContent(props: {
  taskType: number;
  task: Task;
  actionSheetRef: any;
  setTask: (() => any) | ((current: any) => any);
}) {
  const renderContentBasedOnType = (taskType: number) => {
    const contentRendered: Record<number, Function> = {
      [Constants.ONE_TIME_EVENT]: () => (
        <OneTimeEvent
          task={props?.task}
          setTask={props?.setTask}
          actionSheetRef={props?.actionSheetRef}
        />
      ),
      [Constants.REPEAT_WEEK]: () => (
        <MultipleWeekEvent
          task={props?.task}
          setTask={props?.setTask}
          weeks={1}
          actionSheetRef={props?.actionSheetRef}
        />
      ),
      [Constants.REPEAT_BIWEEK]: () => (
        <MultipleWeekEvent
          task={props?.task}
          setTask={props?.setTask}
          weeks={2}
          actionSheetRef={props?.actionSheetRef}
        />
      ),
      [Constants.REPEAT_MONTH]: () => (
        <MultipleWeekEvent
          task={props?.task}
          setTask={props?.setTask}
          weeks={4}
          actionSheetRef={props?.actionSheetRef}
        />
      ),
    };

    return (contentRendered[taskType] || (() => null))();
  };

  return renderContentBasedOnType(props?.taskType ?? Constants.ONE_TIME_EVENT);
}
