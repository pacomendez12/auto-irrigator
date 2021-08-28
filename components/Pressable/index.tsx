import React from "react";
import { Pressable, StyleSheetProperties, PressableProps } from "react-native";
import { View } from "../Themed";

export default function CustomPressable(props: {
  style?: StyleSheetProperties;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  hitSlop?: PressableProps["hitSlop"];
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        alignItems: "stretch",
        justifyContent: "center",
        ...props?.style,
      }}
    >
      <Pressable
        onPress={props?.onPress}
        onLongPress={props?.onLongPress}
        disabled={props?.disabled ?? false}
        hitSlop={props?.hitSlop}
        android_ripple={{
          color: "#ddd",
          borderless: true,
        }}
      >
        {props.children}
      </Pressable>
    </View>
  );
}
