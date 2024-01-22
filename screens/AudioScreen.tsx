import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import appColors from "../assets/styles/appColors";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AudioScreen = () => {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRecordings = async () => {
      const savedRecordings = await AsyncStorage.getItem("savedRecordings");
      if (savedRecordings) {
        setRecordings(JSON.parse(savedRecordings));
      }
    };

    loadRecordings();
  }, []);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log("Starting recording..");
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
        console.log("Recording started");
      } else {
        setMessage("Permission required to access microphone");
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
      const newRecordings = [...recordings, { uri }];
      setRecordings(newRecordings);
      await AsyncStorage.setItem(
        "savedRecordings",
        JSON.stringify(newRecordings)
      );
    } catch (error) {
      console.error("Error stopping recording: ", error);
    }
  }

  async function playSound(uri) {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  }

  async function deleteRecording(uri) {
    const newRecordings = recordings.filter(
      (recordingItem) => recordingItem.uri !== uri
    );
    await AsyncStorage.setItem(
      "savedRecordings",
      JSON.stringify(newRecordings)
    );
    setRecordings(newRecordings);
  }

  async function deleteAllRecordings() {
    await AsyncStorage.removeItem("savedRecordings");
    setRecordings([]);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordings.map((recordingLine, index) => (
        <View key={recordingLine.uri}>
          <Text>Recording {index + 1}</Text>
          <Button title="Play" onPress={() => playSound(recordingLine.uri)} />
          <Button
            title="Delete"
            onPress={() => deleteRecording(recordingLine.uri)}
          />
        </View>
      ))}
      <Button title="Delete All" onPress={deleteAllRecordings} />
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
