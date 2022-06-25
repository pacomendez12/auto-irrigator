import React from "react";
import { View, Text } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";

export default function EmptyState(props: {
  title: String;
  message: String;
  icon: { name: String; family?: String; color?: String } | String;
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={props?.icon?.name ?? props?.icon}
        size={120}
        color={props?.icon?.color ?? "#105A8Fcc"}
      />
      <Text style={styles.title}>{props?.title}</Text>
      <Text style={styles.message}>{props?.message}</Text>
    </View>
  );
}
