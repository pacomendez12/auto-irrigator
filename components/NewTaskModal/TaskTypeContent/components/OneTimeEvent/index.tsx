import React, { Dispatch, SetStateAction } from "react";
import DatePickerTextInput from "../../../../DatePickerTextInput";
import TimePickerTextInput from "../../../../TimePickerTextInput";

import { View } from "../../../../Themed";
import { Task } from "../../../../../types";


export default function OneTimeEvent({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) {

    const setDate = (date: Date) => {
        setTask((oldTask: Task) => {
            return {
                ...oldTask,
                schedule: {
                    ...oldTask.schedule,
                    startDate: date.getTime() / 1000,
                    endDate: date.getTime() / 1000
                }
            }
        })
    }

    return (
        <View>
            <DatePickerTextInput value={task?.schedule?.startDate ? new Date(task.schedule.startDate * 1000) : new Date()} setValue={setDate} />
            <TimePickerTextInput value={task?.schedule?.startDate ? new Date(task.schedule.startDate * 1000) : new Date()} setValue={setDate} />
        </View>
    );
};
