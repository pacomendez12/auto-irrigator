import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginHorizontal: 60,
  },
  button: {
    backgroundColor: "#ddd",
    borderRadius: 50,
    width: 120,
  },
  cancelLabel: {
    color: "black",
  },
  acceptLabel: {
    color: "#d40000ff",
  },
});
