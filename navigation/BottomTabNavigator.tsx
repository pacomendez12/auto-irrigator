import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/ManualIrrigation";
import TabTwoScreen from "../screens/AutomaticIrrigation";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import Spinner from "../components/Spinner";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Manual"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Manual"
        component={ManualIrrigationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cog" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Automático"
        component={AutomaticIrrigationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const Manual = createStackNavigator<TabOneParamList>();

function ManualIrrigationNavigator() {
  return (
    <Manual.Navigator>
      <Manual.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Manual", headerRight: () => (<Spinner animated={true} />)}}
      />
    </Manual.Navigator>
  );
}

const Automatic = createStackNavigator<TabTwoParamList>();

function AutomaticIrrigationNavigator() {
  return (
    <Automatic.Navigator>
      <Automatic.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Automático" }}
      />
    </Automatic.Navigator>
  );
}
