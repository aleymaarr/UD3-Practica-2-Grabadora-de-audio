import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Button } from "react-native";
import appColors from "../assets/styles/appColors";
import { Audio } from "expo-av";

const AudioScreen = () => {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recordingOptions = {};

        const newRecording = await Audio.Recording
          .createAsync
          //recordingOptions
          ();
        setRecording(newRecording);
      } else {
        setMessage("Se requiere permiso para acceder al micrófono");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setRecordings((prevRecordings) => [...prevRecordings, { uri }]);
    } catch (error) {
      console.error("Error al detener la grabación: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Detener Grabación" : "Iniciar Grabación"}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordings.map((recordingLine, index) => (
        <View key={index}>
          <Text>Grabación {index + 1}</Text>
          {/* Implementa lógica para reproducir la grabación */}
        </View>
      ))}
      {message && <Text>{message}</Text>}
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

export default AudioScreen;