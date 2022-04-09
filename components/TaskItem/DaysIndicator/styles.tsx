import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingBottom: 10
  },
  active: {
    backgroundColor: "#2f95dc",
    color: "white",
  },
  inactive: {
    backgroundColor: "#f2f2f2",
    color: "gray",
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: 'transparent'
  }
});
