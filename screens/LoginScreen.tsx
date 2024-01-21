import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import appColors from "../assets/styles/appColors";
import { LoginContext } from "../contexts/LoginContext";

const LoginScreen = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { toggleIsUserLogged, setUsername } = useContext(LoginContext);

  const usernameHandle = (username: string) => {
    setUsernameInput(username);
  };

  const passwordHandle = (password: string) => {
    setPasswordInput(password);
  };

  const showFailedLoginAlert = () => {
    Alert.alert("Failed to login", "Username or password incorrect", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.17:8888/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toggleIsUserLogged();
        setUsername(usernameInput);
        console.log("Login completed");
        setLoginError(false);
      } else {
        showFailedLoginAlert();
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      showFailedLoginAlert();
      setLoginError(true);
    }
  };

  const login = () => {
    handleLogin();
    /*
    const userData = {
      username: "Alejandro",
      password: "2002",
    };

    if (
      usernameInput === userData.username &&
      passwordInput === userData.password
    ) {
      toggleIsUserLogged();
      setUsername(usernameInput);
      console.log("Login completed");
      setLoginError(false);
    } else {
      console.log("Login failed");
      showFailedLoginAlert();
      setLoginError(true);
    }
    */
  };

  return (
    <View style={styles.loginContainer}>
      <Text
        style={
          loginError ? { ...styles.label, ...styles.labelError } : styles.label
        }
      >
        User Name:
      </Text>
      <TextInput
        placeholder="UserName"
        style={
          loginError ? { ...styles.input, ...styles.inputError } : styles.input
        }
        onChangeText={usernameHandle}
      />
      <Text
        style={
          loginError ? { ...styles.label, ...styles.labelError } : styles.label
        }
      >
        Password:
      </Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={
          loginError ? { ...styles.input, ...styles.inputError } : styles.input
        }
        onChangeText={passwordHandle}
      />
      <Pressable
        style={styles.pressable}
        onPress={login}
        accessibilityLabel="Login"
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 44,
    fontSize: 18,
    color: appColors.textColor,
    fontWeight: "bold",
  },
  labelError: {
    color: appColors.errorColor,
  },
  input: {
    borderColor: appColors.accentColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "80%",
    fontSize: 18,
  },
  inputError: {
    borderColor: appColors.errorColor,
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
    alignSelf: "center",
  },
});
