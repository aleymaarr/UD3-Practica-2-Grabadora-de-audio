import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import appColors from "../assets/styles/appColors";

const QrScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mi GitHub</Text>
      <Text style={{ ...styles.text, ...styles.usernameText }}>
        {" "}
        github.com/aleymaarr
      </Text>
      <QRCode
        value="https://github.com/aleymaarr"
        color="white"
        backgroundColor="black"
      />
    </View>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    fontSize: 20,
    color: appColors.textColor,
  },
  usernameText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
