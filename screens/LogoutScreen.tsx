import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import appColors from "../assets/styles/appColors";
import { LoginContext } from "../contexts/LoginContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { username, toggleIsUserLogged } = useContext(LoginContext);

  const logoutHandle = async () => {
    await AsyncStorage.removeItem("sessionToken");
    toggleIsUserLogged(false);
    console.log("Log out completed");
    Alert.alert("The session has been closed", "Sign in again to the app", [
      {
        text: "Login",
        onPress: () => {
          navigation.navigate("Login");
        },
        style: "default",
      },
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Login");
        },
        style: "default",
      },
    ]);
  };

  const logout = () => {
    Alert.alert(
      `You will be logged out${username}`,
      "You will have to log in to the application to enter",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel",
        },
        {
          text: "Sign off",
          onPress: logoutHandle,
          style: "default",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ ...styles.logoutText, ...styles.warningText }}>
          Close section my application
        </Text>
        <Text style={styles.logoutText}>Bye bye {username}</Text>
      </View>
      <View style={styles.pressableContainer}>
        <Pressable
          style={styles.pressable}
          onPress={logout}
          accessibilityLabel="Button to access the login screen"
        >
          <Text style={styles.buttonText}>Sign off</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: appColors.titleColor,
    fontSize: 26,
    marginLeft: 10,
    width: "90%",
  },
  warningText: {
    color: appColors.warningColor,
    marginTop: 16,
  },
  pressable: {
    backgroundColor: appColors.accentColor,
    borderRadius: 10,
    width: "50%",
    padding: 18,
    alignSelf: "center",
    marginTop: 45,
  },
  buttonText: {
    fontSize: 20,
    color: appColors.secondary,
    textAlign: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  pressableContainer: {},
});
