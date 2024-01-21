import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";
import appColors from "../assets/styles/appColors";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.17:8888/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada.");
      } else if (response.status === 400) {
        Alert.alert(
          "Registro Fallido",
          "El usuario ya existe o los datos son inválidos."
        );
      } else {
        Alert.alert("Error", "Ha ocurrido un error inesperado.");
      }
    } catch (error) {
      Alert.alert("Error de Conexión", "No se pudo conectar al servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Check in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  button: {
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

export default RegisterScreen;
