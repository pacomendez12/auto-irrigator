import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, Easing } from "react-native";

import { View } from "../Themed";

import * as Constants from "../../AppConstants";


export default function Spinner(props: {
    animated: boolean
}) {


    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )).start();

    const spin = spinValue.interpolate({
        inputRange: [0, props?.animated ? 1 : 0],
        outputRange: ['0deg', '360deg']
    })


    return <Animated.View style={{ padding: 10, transform: [{ rotate: spin }] }}>
        <FontAwesome name="spinner" size={20} color="#0066ffff" />

    </Animated.View>

    // return <View style={{padding: 10}}>
    //     <FontAwesome name="spinner" size={20} color="#0066ffff" />
    // </View>;
}
