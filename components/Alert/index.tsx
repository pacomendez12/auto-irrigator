import React, { useRef, useEffect } from "react";
import { Text, View } from "../Themed";
import { Button } from "react-native-paper";
import ActionSheet, { ActionSheetProps } from "react-native-actions-sheet";

import styles from "./styles";

export default function Alert(props: {
  showAlert: boolean;
  onDelete: () => void;
  onHide: () => void;
  title: string;
  message: string;
}) {
  const actionSheetRef = useRef<ActionSheetProps>();

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(props?.showAlert);
  }, [props?.showAlert]);

  const onDelete = () => {
    props?.onDelete();
    props?.onHide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      animated
      closable
      headerAlwaysVisible
      onClose={props?.onHide}
      CustomHeaderComponent={
        <View
          style={styles.header}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>{props?.title}</Text>
        <Text>{props.message}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.cancelLabel}
            uppercase={false}
            onPress={props?.onHide}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.acceptLabel}
            uppercase={false}
            onPress={onDelete}
          >
            Aceptar
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}
