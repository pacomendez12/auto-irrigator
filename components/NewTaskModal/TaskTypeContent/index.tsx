import React from "react";
import * as Constants from "../../../AppConstants";

import { Task } from "../../../types";

import OneTimeEvent from "./components/OneTimeEvent";

export default function TaskTypeContent(props: {
  taskType: number;
  task: Task;
  setTask: (() => any) | ((current: any) => any);
}) {

  const renderContentBasedOnType = (taskType: number) => {
    const contentRendered : Record<number, Function> = {
      [Constants.ONE_TIME_EVENT]: () => <OneTimeEvent task={props?.task} setTask={props?.setTask} />,
    };

    return (contentRendered[taskType] || (() => null))();
  };

  return renderContentBasedOnType(props?.taskType ?? Constants.ONE_TIME_EVENT);
}
