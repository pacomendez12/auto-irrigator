import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#1f1f1f",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  switchSelectorContainer: {
    alignSelf: "stretch",
    marginHorizontal: 10
  },
  taskTypeSelector: {
    alignSelf: "stretch",
    paddingBottom: 25,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0"
  }
});
