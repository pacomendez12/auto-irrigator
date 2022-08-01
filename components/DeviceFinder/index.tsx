import React, { useRef, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Overlay } from "@rneui/themed";
import { View, Text } from "../Themed";

import Pressable from "../Pressable";
import IconButton from "../Button";
import Spinner from "../Spinner";
import styles from "./styles";

interface Device { name: string, address: string, mac: string };

export default function DeviceFinder(props: { isBluetoothEnabled: boolean }) {
    const [devices, setDevices] = useState<Array<Device>>([{ name: "Riego casa", address: "", mac: "1" }, { name: "Otro riego", address: "", mac: "2" }]);
    // const [devices, setDevices] = useState<Array<Device>>([]);
    const [showConnectingModal, setShowConnectingModal] = useState(false);
    const currentDevice = useRef<Device | null>(null);

    if (!props?.isBluetoothEnabled) {
        return <BluetoothEnabler />
    }

    const onDevicePressed = (device: Device, status: boolean) => {
        currentDevice.current = device;
        setShowConnectingModal(status);

        // TODO: remove me, I'm for testing
        setTimeout(() => { setShowConnectingModal(false) }, 20000);
    }

    return <View style={styles.container}>
        <Header />
        <DeviceList devices={devices} onDevicePressed={onDevicePressed} />
        <Overlay isVisible={showConnectingModal}>
            <View style={{ minWidth: "80%", minHeight: "15%", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginBottom: 15 }}>Conectando dispositivo: <Text style={{ fontWeight: "600" }}>{currentDevice.current?.name}</Text></Text>
                <MaterialCommunityIcons name="connection" size={25} color="#bfbfbf" />
            </View>
        </Overlay>
    </View>;
}


function Header() {
    return <View style={styles.header}>
        <Text style={{ color: "#7e7e7e", fontWeight: "600", fontSize: 15 }}>Buscando dispositivo de riego...</Text>
        <Spinner animated={true} />
    </View>
}

function DeviceList({ devices, onDevicePressed }: { devices: Array<Device>, onDevicePressed: (device: Device, status: boolean) => any }) {

    const renderEmptyList = () => {
        return <View style={styles.emptyListContainer}>
            <MaterialCommunityIcons
                name="bluetooth"
                size={80}
                color="#2e78b7"
            />
            <Text style={{ marginTop: 20 }}>No hemos encontrado ningún dispositivo</Text>
        </View>
    }

    const renderDevices = () => {
        if (devices.length > 0) {
            return devices.map(device => {

                return <Pressable key={device.mac}
                    style={{ borderRadius: 20, padding: 5 }}
                    onPress={() => {
                        onDevicePressed(device, true);
                    }}
                    hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
                >
                    <View key={device.mac} style={styles.deviceItem}>
                        <Text>{device.name}</Text>
                        <IconButton icon="bluetooth-connect" color="#2e78b7" size={15} onPress={() => { }} />
                    </View>
                </Pressable >
            })
        }

        return renderEmptyList();
    }

    return <View style={{ alignSelf: "stretch", paddingHorizontal: 10, flex: 1 }}>
        {renderDevices()}
    </View>
}

function BluetoothEnabler() {
    return <View style={styles.bluetoohtEnableContainer}>
        <MaterialCommunityIcons
            name="bluetooth-off"
            size={100}
            color="gray"
        />
        <Text style={{ marginTop: 20, fontWeight: "500", fontSize: 17 }}>{"El Bluetooth está apagado"}</Text>
        <Text style={{ marginTop: 20 }}>{"¿Deseas encenderlo?"}</Text>
        <Button style={{ marginTop: 40 }} mode="outlined" color="#2e78b7" onPress={() => { }}>Encender</Button>
    </View>;
}