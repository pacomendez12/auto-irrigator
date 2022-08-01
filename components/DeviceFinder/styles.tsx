import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        marginVertical: 5
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "rgba(250,250,250,0.8)",
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    deviceItem: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomColor: "#aeaeae",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    emptyListContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bluetoohtEnableContainer: {
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
    }
});
