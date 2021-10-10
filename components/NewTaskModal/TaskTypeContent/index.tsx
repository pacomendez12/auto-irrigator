import React, { useRef, useState, useMemo } from "react";
import ActionSheet, { ActionSheetProps } from "react-native-actions-sheet";
import { Calendar } from "react-native-calendars";
import _ from "lodash";

import { View, Text } from "../../Themed";

import * as Constants from "../../../AppConstants";

import styles from "./styles";
import { Task } from "../../../types";
import { getStringDate } from "../../../util/time";

export default function TaskTypeContent(props: {
  taskType: number;
  task: Task;
  setTask: (() => any) | ((current: any) => any);
}) {
  const renderOneTimeEvent = () => {
    const [selectedDaysCounter, setSelectedDaysCounter] = useState(0);
    const now = new Date();

    const minDate = getStringDate(now);
    const markedDays = useMemo(() => {
      if (
        props?.task?.schedule?.startDate === null &&
        props?.task?.schedule?.endDate === null
      )
        return {};

      const start = new Date(props?.task?.schedule?.startDate * 1000);
      const end = new Date(props?.task?.schedule?.endDate * 1000);

      //console.log(start);
      return generateMarkedDays(start, end);
    }, [props?.task?.schedule?.startDate, props?.task?.schedule?.endDate]);
    //console.log(markedDays);

    return (
      <View style={{}}>
        <Calendar
          minDate={now}
          firstDay={1}
          disableAllTouchEventsForDisabledDays={true}
          markingType={"period"}
          onDayPress={(day) => {
            if (selectedDaysCounter === 0 || selectedDaysCounter === 2) {
              const start = new Date(0);
              start.setUTCFullYear(day.year);
              start.setUTCMonth(day.month - 1);
              start.setUTCDate(day.day);

              start.setTime(start.getTime() + (start.getTimezoneOffset() + 60 * 1000));

              props?.setTask((task: Task) => ({
                ...task,
                schedule: {
                  ...task?.schedule,
                  startDate: start.getTime() / 1000,
                  endDate: null
                },
              }));

              setSelectedDaysCounter(1);
            } else if (selectedDaysCounter === 1) {
              const end = new Date(0);
              end.setUTCFullYear(day.year);
              end.setUTCMonth(day.month - 1);
              end.setUTCDate(day.day);

              end.setTime(end.getTime() + (end.getTimezoneOffset() + 60 * 1000));

              props?.setTask((task: Task) => ({
                ...task,
                schedule: {
                  ...task?.schedule,
                  endDate: end.getTime() / 1000,
                },
              }));
              setSelectedDaysCounter(2);
            }
          }}
          markedDates={markedDays}
        />
      </View>
    );
  };

  const renderContentBasedOnType = (taskType: number) => {
    const contentRendered = {
      [Constants.ONE_TIME_EVENT]: () => renderOneTimeEvent(),
    };

    return (contentRendered[taskType] || (() => null))();
  };

  return renderContentBasedOnType(props?.taskType ?? Constants.ONE_TIME_EVENT);
}

function generateMarkedDays(startDate: Date, endDate: Date) {
  const result = {};

  console.log(startDate);

  let current = startDate;
  while (current < endDate) {
    result[getStringDate(current)] = {
      selected: true,
      color: "#00ADF5",
      textColor: "black",
    };
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }

  result[getStringDate(startDate)] = {
    startingDay: true,
    color: "#00ADF5",
    textColor: "black",
  };
  result[getStringDate(endDate)] = {
    endingDay: true,
    color: "#00ADF5",
    textColor: "black",
  };

  return result;
}
