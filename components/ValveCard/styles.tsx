import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 45,
  },
  container: {
    alignItems: "center",
    margin: 6,
    padding: 10,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#ececec"
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  deviceNameInput: {
    flexGrow: 1,
    padding: 5,
    paddingLeft: 10,
    marginRight: 10,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 5,
    color: "#2f95dc",
    fontSize: 16,
  },
  timeText: {
    marginBottom: 10,
    color: "gray",
    fontSize: 11,
  },
});
