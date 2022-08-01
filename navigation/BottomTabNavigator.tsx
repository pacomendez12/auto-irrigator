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
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ]
      }}
    >
      <BottomTab.Screen
        name="Manual"
        component={ManualIrrigationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cog" color={color} />
          ),
          headerTitle: "Manual",
          // headerRight: () => (<Spinner animated={true} />)
        }}
      />
      <BottomTab.Screen
        name="Automático"
        component={AutomaticIrrigationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
          headerTitle: "Automático",
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

function ManualIrrigationNavigator(state: any) {
  return (
    <Manual.Navigator>
      <Manual.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ header: () => null }}
      />
    </Manual.Navigator>
  );
}

const Automatic = createStackNavigator<TabTwoParamList>();

function AutomaticIrrigationNavigator(state: any) {
  return (
    <Automatic.Navigator>
      <Automatic.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ header: () => null }}
      />
    </Automatic.Navigator>
  );
}
