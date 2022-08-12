import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MonoText } from "../StyledText";
import { Text, View } from "../Themed";
import Potentiometer from "../Potentiometer/index";
import { getTimeFromSeconds } from "../../util/time";

import styles from "./styles";

const seconds = [60, 120, 300, 600, 900, 1800, 3600, 5400, 7200, 9000];

interface Valve {
  name: string;
  isOn: boolean;
  irrigationTime: number;
}

export default function ValveCard({
  id,
  valve,
  setValve,
  remainingFromDevice,
}: {
  id: number;
  valve: Valve;
  setValve: (valve: Valve, deviceId: number) => void;
  remainingFromDevice?: number | undefined;
}) {
  const [level, setLevel] = useState(0);
  //const [irrigationTime, setIrrigationTime] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const setIsOn = useCallback(
    (value: boolean) => {
      setValve({ ...valve, isOn: value }, id);
    },
    [valve]
  );

  const setLevelCallback = useCallback(
    (level: number) => {
      setLevel(level);
      setValve({ ...valve, irrigationTime: seconds[level] }, id);
    },
    [valve, id]
  );

  useEffect(() => {
    if (valve?.isOn) {
      const totalTime = seconds[level];

      //setIrrigationTime(totalTime);
      setRemaining(totalTime);
    } else {
      //setIrrigationTime(0);
      setRemaining(0);
    }
  }, [valve?.isOn]);

  useEffect(() => {
    if (remainingFromDevice) {
      setRemaining(remainingFromDevice);
    }
  }, [remainingFromDevice]);

  useEffect(() => {
    if (remaining > 0) {
      const interval = setInterval(() => {
        setRemaining((remSecs) => remSecs - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsOn(false);
    }
  }, [remaining]);

  const onChange = useCallback(
    (text) => {
      setValve({ ...valve, name: text }, id);
    },
    [id]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        {isEditingTitle ? (
          <TextInput
            style={styles.deviceNameInput}
            value={valve?.name}
            onChangeText={onChange}
            autoFocus
          />
        ) : (
          <Text
            style={styles.headerText}
            lightColor="#2f95dc"
            darkColor="white"
          >
            {valve?.name ?? "Válvula"}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setIsEditingTitle((state: boolean) => !state)}
        >
          <MaterialCommunityIcons name="pencil" size={25} color="#2f95dc" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexGrow: 0.3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {valve?.isOn ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                }}
                source={require("../../assets/images/irrigating.gif")}
              />
            ) : (
              <Text
                style={{
                  backgroundColor: "#ffaaaa",
                  padding: 13,
                  borderRadius: 30,
                  color: "#8e2222",
                }}
              >
                Apagado
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Potentiometer
            level={level}
            setLevel={setLevelCallback}
            isOn={valve?.isOn}
            setIsOn={setIsOn}
          />
          <Text style={styles.timeText}>
            {getTimeFromSeconds(valve?.isOn ? remaining : seconds[level])}
          </Text>
          <View opacity={valve?.isOn ? 1 : 0}>
            <Progress.Bar
              progress={
                (valve?.isOn &&
                  valve?.irrigationTime > 0 &&
                  remaining / valve?.irrigationTime) ||
                0
              }
              width={170}
              borderWidth={0}
              height={3}
              unfilledColor="#eee"
              color="#2f95dc"
              animated
            />
          </View>
        </View>
      </View>
    </View>
  );
}
