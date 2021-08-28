import * as React from "react";
import { View } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Pressable from "../Pressable";

export default function Button(props: {
  icon: string;
  color: string;
  size: number;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Pressable
          style={{ borderRadius: 20, padding: 5 }}
          onPress={props?.onPress}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        >
          <MaterialCommunityIcons
            name={props?.icon}
            size={props?.size}
            color={props?.color}
          />
        </Pressable>
      </View>
    </View>
  );
}
