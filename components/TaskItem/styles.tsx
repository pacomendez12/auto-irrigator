import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 100,
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 0.5,
    backgroundColor: "transparent",
  },
  containerLeft: {
    flex: 1,
    flexGrow: 10,
    backgroundColor: "transparent",
  },
  hourAndIndicator: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  containerRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 2,
    paddingRight: 15,
    minHeight: 60,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  hourText: {
    fontSize: 25,
    backgroundColor: "transparent",
  },
  occurrencesText: {
    color: "gray",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  daysContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
