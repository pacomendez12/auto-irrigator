import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";

import { View } from "../../../../Themed";

import { Task } from "../../../../../types";
import { getStringDate } from "../../../../../util/time";
import { DateData } from "react-native-calendars/src/types";

const SELECTED_NONE = 0;
const SELECTED_START_DAY = 1;
const SELECTED_END_DAY = 2;

export default function OneTimeEvent({ task, setTask }: { task: Task; setTask: (() => any) | ((current: any) => any); }) {
    const [selectedDaysState, setSelectedDaysState] = useState(0);

    const markedDays = useMemo(() => {
        if (
            task?.schedule?.startDate === null &&
            task?.schedule?.endDate === null
        )
            return {};

        const start = getDateFromSeconds(task?.schedule?.startDate);
        const end = getDateFromSeconds(task?.schedule?.endDate);

        return generateMarkedDays(start, end);
    }, [task?.schedule?.startDate, task?.schedule?.endDate]);

    const setStartDateOnTask = (date: Date) => {
        setTask((task: Task) => ({
            ...task,
            schedule: {
                ...task?.schedule,
                startDate: date.getTime() / 1000,
                endDate: null
            },
        }));
    }

    const setEndDateOnTask = (date: Date) => {
        setTask((task: Task) => ({
            ...task,
            schedule: {
                ...task?.schedule,
                endDate: date.getTime() / 1000,
            },
        }));
    }

    const selectStartDate = (day: DateData) => {
        const start = getDateFromDateData(day);

        setStartDateOnTask(start);
        setSelectedDaysState(SELECTED_START_DAY);
    }

    const selectEndDate = (day: DateData) => {
        const end = getDateFromDateData(day);

        if (getDateFromSeconds(task?.schedule?.startDate).getTime() <= end.getTime()) {
            setEndDateOnTask(end);
            setSelectedDaysState(SELECTED_END_DAY);
        } else {
            setStartDateOnTask(end);
            setSelectedDaysState(SELECTED_START_DAY);
        }
    }

    return (
        <View>
            <Calendar
                minDate={new Date()}
                firstDay={1}
                disableAllTouchEventsForDisabledDays={true}
                markingType={"period"}
                onDayPress={(day) => {
                    if (selectedDaysState === SELECTED_NONE || selectedDaysState === SELECTED_END_DAY) {
                        selectStartDate(day);
                    } else if (selectedDaysState === SELECTED_START_DAY) {
                        selectEndDate(day);
                    }
                }}
                markedDates={markedDays}
            />
        </View>
    );
};


function generateMarkedDays(startDate: Date, endDate: Date) {
    const result: Record<string, any> = {};

    console.log(startDate);

    let current = startDate;
    while (current < endDate) {
        result[getStringDate(current)] = {
            selected: true,
            color: "#00A0F5",
            textColor: "#ffffff",
        };
        current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }

    result[getStringDate(startDate)] = {
        startingDay: true,
        color: "#00A0F5",
        textColor: "#ffffff",
    };
    result[getStringDate(endDate)] = {
        endingDay: true,
        color: "#00A0F5",
        textColor: "#ffffff",
    };

    return result;
}

function getDateFromSeconds(seconds: number | null) {
    if (seconds === null) return new Date(0);
    return new Date(seconds * 1000);
}

function getDateFromDateData(day: DateData) {
    const date = new Date(0);
    date.setUTCFullYear(day.year);
    date.setUTCMonth(day.month - 1);
    date.setUTCDate(day.day);

    date.setTime(date.getTime() + (date.getTimezoneOffset() + 60 * 1000));
    return date;
}