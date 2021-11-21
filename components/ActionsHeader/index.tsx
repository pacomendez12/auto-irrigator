import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View, Text } from "../Themed";
import Button from "../Button";

import styles from "./styles";

const BUTTON_SIZE = 30;

export default function ActionsHeader(props: {
  onCancel: () => void;
  onAccept: () => void;
  title: string;
  leftIcon?: string;
  rightIcon?: string;
}) {
  return (
    <View style={styles.container}>
      <Button
        size={BUTTON_SIZE}
        icon={props?.leftIcon ?? "close"}
        color="black"
        onPress={props?.onCancel}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Button
        size={BUTTON_SIZE}
        icon={props?.rightIcon ?? "check"}
        color="black"
        onPress={props?.onAccept}
      />
    </View>
  );
}
