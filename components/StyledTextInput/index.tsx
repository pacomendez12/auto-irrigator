import React from "react";
import { TextInput, TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View } from "../Themed";


export default function StyledTextInput(props: TextInputProps & { leftIconName?: string, rightIconName?: string }) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#c9c9c9",
            borderWidth: 0.5,
            borderRadius: 10,
            minHeight: 50
        }}>
            {props?.leftIconName && <MaterialCommunityIcons name={props?.leftIconName} size={24} color="#aeaeae" style={{ marginLeft: 10 }} />}
            <TextInput style={{ height: 40, flex: 1, marginLeft: 10, color: "#5f5f5f" }} {...props} />
            {props?.rightIconName && <MaterialCommunityIcons name={props?.rightIconName} size={24} color="#aeaeae" style={{ marginHorizontal: 10 }} />}
        </View>
    );
};
