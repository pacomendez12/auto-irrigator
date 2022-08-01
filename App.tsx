import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { INITIAL_STATE, BluetoothContext } from "./BluetoothState";

import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['es'] = {
  monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: 'Hoy'

}

LocaleConfig.defaultLocale = 'es'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [bluetoothState, setBluetoothState] = React.useState(INITIAL_STATE)

  setTimeout(() => {
    setBluetoothState({ isBluetoothEnabled: true, connectedDevice: null })
  }, 2000);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <BluetoothContext.Provider value={bluetoothState}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </BluetoothContext.Provider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
