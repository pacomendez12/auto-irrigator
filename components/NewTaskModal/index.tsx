import React, { useRef, useState, useEffect } from "react";
import ActionSheet, { ActionSheetProps } from "react-native-actions-sheet";
import SwitchSelector from "react-native-switch-selector";

import { View, Text } from "../Themed";
import Header from "./Header";

import styles from "./styles";

const ONE_TIME_EVENT = 0x0;
const REPEAT_WEEK = 0x1;
const REPEAT_BIWEEK = 0x2;
const REPEAT_MONTH = 0x3;

const options = [
  { label: "Una vez", value: ONE_TIME_EVENT },
  { label: "Semanal", value: REPEAT_WEEK },
  { label: "Quincenal", value: REPEAT_BIWEEK },
  { label: "Mensual", value: REPEAT_MONTH },
];

export default function NewTaskModal(props: {
  showModal: boolean;
  onHide: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetProps>();
  const [type, setType] = useState<number>(ONE_TIME_EVENT);

  useEffect(() => {
    actionSheetRef.current.setModalVisible(props?.showModal);
  }, [props?.showModal]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      bounceOnOpen
      CustomHeaderComponent={
        <Header onAccept={() => {}} onCancel={props?.onHide} />
      }
      onClose={props?.onHide}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            color: "#1f1f1f",
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 10,
          }}
        >
          Tipo de tarea
        </Text>
        <View
          style={{
            alignSelf: "stretch",
          }}
        >
          <SwitchSelector
            options={options}
            initial={0}
            buttonColor="#2f95dc"
            onPress={(value: number) => setType(value)}
          />
        </View>
      </View>
    </ActionSheet>
  );
}
