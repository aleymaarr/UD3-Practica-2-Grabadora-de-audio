import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import appColors from "../assets/styles/appColors";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video, ResizeMode } from "expo-av";

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
    const newRecordings = recordings.filter((item) => item.uri !== uri);
    await AsyncStorage.setItem(
      "savedRecordings",
      JSON.stringify(newRecordings)
    );
    setRecordings(newRecordings);
  }

  {
    recordings.map((recordingLine, index) => (
      <View key={recordingLine.uri}>
        <Text>Recording {index + 1}</Text>
        <Button title="Play" onPress={() => playSound(recordingLine.uri)} />
        <Button
          title="Delete"
          onPress={() => deleteRecording(recordingLine.uri)}
        />
      </View>
    ));
  }

  async function deleteAllRecordings() {
    try {
      await AsyncStorage.removeItem("savedRecordings");
      setRecordings([]);
    } catch (error) {
      console.error("Error deleting all recordings:", error);
    }
  }

  return (
    <View style={styles.startButtonContainer}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording && (
        <Video
          source={require("./assets/styles/animacion.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          style={styles.videoStyle}
        />
      )}
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri}
        renderItem={({ item, index }) => (
          <View style={styles.recordingItem}>
            <Text>Recording {index + 1}</Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Play"
                onPress={() => playSound(item.uri)}
                color="#007bff"
              />
              <Button
                title="Delete"
                onPress={() => deleteRecording(item.uri)}
                color="#dc3545"
              />
            </View>
          </View>
        )}
      />

      <Button title="Delete All" onPress={deleteAllRecordings} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  gifStyle: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
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
  recordingItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
  },
  startButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    width: "80%",
  },
  recordingList: {
    marginTop: 30,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default AudioScreen;
