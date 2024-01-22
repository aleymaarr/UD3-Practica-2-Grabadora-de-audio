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
      try {
        const savedRecordings = await AsyncStorage.getItem("savedRecordings");
        if (savedRecordings !== null) {
          setRecordings(JSON.parse(savedRecordings));
        }
      } catch (error) {
        console.error("Error loading recordings:", error);
      }
    };

    loadRecordings();
  }, []);

  async function playSound(uri) {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  }

  {
    recordings.map((recordingLine, index) => (
      <View key={index}>
        <Text>Recording {index + 1}</Text>
        <Button title="Play" onPress={() => playSound(recordingLine.uri)} />
      </View>
    ));
  }

  async function deleteRecording(index) {
    const newRecordings = recordings.filter((_, i) => i !== index);
    await AsyncStorage.setItem(
      "savedRecordings",
      JSON.stringify(newRecordings)
    );
    setRecordings(newRecordings);
  }

  {
    recordings.map((recordingLine, index) => (
      <View key={index}>
        <Text>Recording {index + 1}</Text>
        <Button title="Play" onPress={() => playSound(recordingLine.uri)} />
        <Button title="Delete" onPress={() => deleteRecording(index)} />
      </View>
    ));
  }

  async function deleteAllRecordings() {
    await AsyncStorage.removeItem("savedRecordings");
    setRecordings([]);
  }

  <Button title="Delete All" onPress={deleteAllRecordings} />;

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log("Starting recording..");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
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
      setRecordings((prevRecordings) => [...prevRecordings, { uri }]);
    } catch (error) {
      console.error("Error stopping recording: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordings.map((recordingLine, index) => (
        <View key={index}>
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
