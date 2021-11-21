import React, { useState } from "react";
import StyledTextInput from "../StyledTextInput";
import CustomPressable from "../Pressable";
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';


export default function TimePickerTextInput(props: { value: Date, setValue: (date: Date) => void }) {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: Event, date?: Date) => {
        setShowPicker(false);
        if (date) {
            setTimeout(() => {
                props.setValue(date);
            }, 0);
        }
    }

    return (
        <>
            <CustomPressable
                style={{
                    marginHorizontal: 10,
                    marginVertical: 15
                }}
                onPress={() => setShowPicker(true)}
            >
                <StyledTextInput leftIconName="clock" value={props.value.toTimeString()} editable={false} />
            </CustomPressable>

            {
                showPicker && <DateTimePicker
                    testID="dateTimePicker"
                    value={props.value}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            }
        </>
    );
};
