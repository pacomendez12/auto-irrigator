import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PermissionsAndroid } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import LocationEnabler from "react-native-location-enabler";

const {
  PRIORITIES: { HIGH_ACCURACY, BALANCED_POWER_ACCURACY },
  useLocationSettings,
} = LocationEnabler;

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { INITIAL_STATE, BluetoothContext, BLEManager } from "./BluetoothState";

import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};

LocaleConfig.defaultLocale = "es";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [state, setState] = React.useState(INITIAL_STATE);
  const [gpsEnabled, requestResolution] = useLocationSettings(
    {
      priority: BALANCED_POWER_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */
  );

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permiso de ubicación requerido",
            message: "La aplicación requiere el permiso de ubicación",
            buttonNeutral: "Preguntar después",
            buttonNegative: "Denegar",
            buttonPositive: "Aceptar",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    console.log("in bt effect");

    const subscription = BLEManager.onStateChange((state) => {
      if (state === "PoweredOn") {
        setState((current) => ({
          ...current,
          isBluetoothEnabled: true,
        }));
        //subscription.remove();
        console.log("bluetooth is on");
      } else {
        BLEManager.stopDeviceScan();

        setState((current) => ({
          ...current,
          isBluetoothEnabled: false,
        }));
        console.log("bluetooth is off");
      }
    }, true);
    return () => subscription.remove();
  }, [BLEManager]);

  useEffect(() => {
    setState((current) => ({ ...current, isGpsEnabled: gpsEnabled }));
  }, [gpsEnabled]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <BluetoothContext.Provider value={{ ...state, setState }}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </BluetoothContext.Provider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
