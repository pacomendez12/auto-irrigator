import React, { useState } from "react";
import StyledTextInput from "../StyledTextInput";
import CustomPressable from "../Pressable";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

export default function DatePickerTextInput(props: {
  value: Date;
  setValue: (date: Date) => void;
  title?: string;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: Event, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setTimeout(() => {
        props.setValue(date);
      }, 0);
    }
  };

  return (
    <>
      <CustomPressable
        style={{
          marginHorizontal: 10,
          marginVertical: 15,
        }}
        onPress={() => setShowPicker(true)}
      >
        <StyledTextInput
          leftIconName="calendar"
          value={props.value.toDateString()}
          editable={false}
          title={props.title}
        />
      </CustomPressable>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.value}
          minimumDate={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          disabled={showPicker}
        />
      )}
    </>
  );
}
