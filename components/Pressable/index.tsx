import React from "react";
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { View } from "../Themed";

export default function CustomPressable(props: {
  style?: ViewStyle;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | null | undefined;
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
