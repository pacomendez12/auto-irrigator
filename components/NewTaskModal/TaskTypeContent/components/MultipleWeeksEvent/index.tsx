import React, { Dispatch, SetStateAction } from "react";
import DatePickerTextInput from "../../../../DatePickerTextInput";
import TimePickerTextInput from "../../../../TimePickerTextInput";

import { View } from "../../../../Themed";
import { Task } from "../../../../../types";

import DaysIndicator from "../../../../TaskItem/DaysIndicator";


export default function MultipleWeekEvent({ task, setTask, weeks }: { task: Task; setTask: Dispatch<SetStateAction<Task>>, weeks: number }) {

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

    const setOcurrences = (ocurrences: number) => {
        setTask((oldTask: Task) => ({
            ...oldTask,
            schedule: {
                ...oldTask.schedule,
                occurrences: ocurrences
            }
        }))
    }

    return (
        <View>
            <View style={{
                marginTop: 10,
                paddingVertical: 10
            }}>
                <DaysIndicator occurrences={task?.schedule?.occurrences} size={40} isEditable setOcurrences={setOcurrences}/>
            </View>
            <View>
                <DatePickerTextInput value={task?.schedule?.startDate ? new Date(task.schedule.startDate * 1000) : new Date()} setValue={setDate} />
                <TimePickerTextInput value={task?.schedule?.startDate ? new Date(task.schedule.startDate * 1000) : new Date()} setValue={setDate} />
            </View>
        </View>
    );
};
