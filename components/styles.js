import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  logo: {
    flex: 1,
    height: 120,
    width: 380,
    alignSelf: "center",
    margin: 30,
  },
  //
  // Registration/login Screen
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  //
  //Home Screen
  space: {
    textAlign: "center",
    marginVertical: 120,
  },
  welcome: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 35,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    color: "#FFAC1C",
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  mapWrapper: {
    backgroundColor: "grey",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  //
  // SettingsScreen
  settingsButton: {
    marginRight: 15,
    marginTop: 30,
    height: 35,
    borderRadius: 9,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  changePasswordButton: {
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  //

  //ServicesScreen
  postButton: {},
  //

  //ServicesPostScreen
  multilineInput: {
    height: 148,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
  instructionText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  servicesPostButton: {
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  // Profile Screen
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
  },
  profileDescriptionWrapper: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    width: "100%",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  marginTop10: {
    marginTop: 10,
  },
});
