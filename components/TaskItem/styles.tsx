import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80,
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 0.5,
    backgroundColor: "transparent",
    paddingVertical: 10,
  },
  containerLeft: {
    flex: 1,
    flexGrow: 11,
    backgroundColor: "transparent",
  },
  hourAndIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  durationText: {
    color: "green",
    maxWidth: 80,
    textAlign: "center",
    borderBottomColor: "green",
    borderBottomWidth: 0.5,
  },
  dates: {
    width: 120,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  containerRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 9,
    paddingRight: 15,
    minHeight: 60,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  timeContainer: {
    alignItems: "center",
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
    flexDirection: "column",
    marginTop: 10,
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
});
