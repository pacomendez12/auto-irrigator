import React, { useRef, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Overlay } from "@rneui/themed";
import { View, Text } from "../Themed";
import { BLEManager } from "../../BluetoothState";
import { Device as NativeDevice } from "react-native-ble-plx";
import LocationEnabler from "react-native-location-enabler";

const {
  PRIORITIES: { BALANCED_POWER_ACCURACY },
  useLocationSettings,
} = LocationEnabler;

import Pressable from "../Pressable";
import IconButton from "../Button";
import Spinner from "../Spinner";
import styles from "./styles";
import { ScrollView } from "react-native";

interface Device {
  name: string;
  id: string;
}

export default function DeviceFinder(props: {
  isBluetoothEnabled: boolean;
  isGpsEnabled: boolean;
  setState: (state: any) => any | null;
}) {
  /*const [devices, setDevices] = useState<Array<Device>>([
    { name: "Riego casa", id: "1" },
    { name: "Otro riego", id: "2" },
  ]);*/
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [showConnectingModal, setShowConnectingModal] = useState(false);
  const currentDevice = useRef<NativeDevice | null>(null);
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: BALANCED_POWER_ACCURACY,
      alwaysShow: true,
      needBle: true,
    },
    false
  );

  const onDevicePressed = async (device: Device, status: boolean) => {
    const devices = await BLEManager.devices([device?.id]);

    if (devices.length === 0) return;

    currentDevice.current = devices[0];
    setShowConnectingModal(status);

    currentDevice.current
      .connect({ requestMTU: 500 })
      .then((device) => {
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        console.log(device);
        currentDevice.current?.onDisconnected((error, device) => {
          props?.setState((state) => ({ ...state, connectedDevice: null }));
        });
        props?.setState((state) => ({ ...state, connectedDevice: device }));
      })
      .catch((error) => {
        console.log(error);
      });

    // TODO: remove me, I'm for testing
    /*setTimeout(() => {
      setShowConnectingModal(false);
      currentDevice.current?.cancelConnection();
    }, 5000);*/
  };

  useEffect(() => {
    const scan = () => {
      console.log("will scan devices");

      BLEManager.startDeviceScan(null, null, (error, device) => {
        if (error || !device) {
          // Handle error (scanning will be stopped automatically)
          console.log("error: ", { error });
          BLEManager.stopDeviceScan();
          setTimeout(() => {
            requestResolution();
            scan();
          }, 500);
          return;
        }

        if (device?.name === "RIEGO") {
          setDevices((devices) => {
            if (
              device === null ||
              devices.some((cDevice) => cDevice?.id === device.id)
            ) {
              return devices;
            }
            return [
              ...devices,
              { name: device?.name ?? device.id, id: device.id },
            ];
          });
        }
      });
    };

    if (props?.isBluetoothEnabled) {
      setTimeout(scan, 1000);
    }

    return () => {
      if (props?.isBluetoothEnabled) {
        console.log("stopping BT scan");

        BLEManager.stopDeviceScan();
        setDevices([]);
      }
    };
  }, [BLEManager, props?.isBluetoothEnabled]);

  useEffect(() => {
    BLEManager.stopDeviceScan();
  }, [BLEManager]);

  if (!props?.isBluetoothEnabled) {
    return <BluetoothEnabler gpsEnabler={requestResolution} />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <DeviceList devices={devices} onDevicePressed={onDevicePressed} />
      <Overlay isVisible={showConnectingModal}>
        <View
          style={{
            minWidth: "80%",
            minHeight: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ marginBottom: 15 }}>
            Conectando dispositivo:{" "}
            <Text style={{ fontWeight: "600" }}>
              {currentDevice.current?.name}
            </Text>
          </Text>
          <MaterialCommunityIcons name="connection" size={25} color="#bfbfbf" />
        </View>
      </Overlay>
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={{ color: "#7e7e7e", fontWeight: "600", fontSize: 15 }}>
        Buscando dispositivo de riego...
      </Text>
      <Spinner animated={true} />
    </View>
  );
}

function DeviceList({
  devices,
  onDevicePressed,
}: {
  devices: Array<Device>;
  onDevicePressed: (device: Device, status: boolean) => any;
}) {
  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <MaterialCommunityIcons name="bluetooth" size={80} color="#2e78b7" />
        <Text style={{ marginTop: 20 }}>
          No hemos encontrado ningún dispositivo
        </Text>
      </View>
    );
  };

  const renderDevices = () => {
    if (devices.length > 0) {
      return devices.map((device) => {
        return (
          <Pressable
            key={device.id}
            style={{ borderRadius: 20, padding: 5 }}
            onPress={() => {
              onDevicePressed(device, true);
            }}
            hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          >
            <View key={device.id} style={styles.deviceItem}>
              <Text>{device.name}</Text>
              <IconButton
                icon="bluetooth-connect"
                color="#2e78b7"
                size={15}
                onPress={() => {}}
              />
            </View>
          </Pressable>
        );
      });
    }

    return renderEmptyList();
  };

  return (
    <ScrollView
      style={{ alignSelf: "stretch", paddingHorizontal: 10, flex: 1 }}
    >
      {renderDevices()}
    </ScrollView>
  );
}

function BluetoothEnabler(props) {
  return (
    <View style={styles.bluetoohtEnableContainer}>
      <MaterialCommunityIcons name="bluetooth-off" size={100} color="gray" />
      <Text style={{ marginTop: 20, fontWeight: "500", fontSize: 17 }}>
        {"El Bluetooth está apagado"}
      </Text>
      <Text style={{ marginTop: 20 }}>{"¿Deseas encenderlo?"}</Text>
      <Button
        style={{ marginTop: 40 }}
        mode="outlined"
        color="#2e78b7"
        onPress={() => {
          props?.gpsEnabler();
          BLEManager.enable();
        }}
      >
        Encender
      </Button>
    </View>
  );
}
