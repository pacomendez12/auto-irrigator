import React from "react";
import { View } from "../../Themed";
import ActionsHeader from "../../ActionsHeader";

export default function Header(props: {
  onCancel: () => void;
  onAccept: () => void;
}) {
    return (<View
      style={{
        flexDirection: "column",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        minHeight: 90
      }}
    >
      <View
        style={{
          backgroundColor: "#bbb",
          height: 6,
          borderRadius: 3,
          width: 25,
          marginVertical: 10,
        }}
      />
      <ActionsHeader
        onCancel={props?.onCancel}
        onAccept={props?.onAccept}
        title="Editar tarea"
      />
    </View>
  );
}
