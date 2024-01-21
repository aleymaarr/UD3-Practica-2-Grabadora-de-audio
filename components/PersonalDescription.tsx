import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import appColors from "../assets/styles/appColors";

const Description = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require("../assets/Alejandro.png")}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.titleStyle}>Description about me</Text>
        <Text style={styles.textStyle}>
          My name is Alejandro Eymar Ballesteros, at the moment I am studying
          2nd CFGS at the Salesianos de la Cuesta.
        </Text>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
    marginTop: 11,
  },
  descriptionContainer: {
    margin: 10,
    marginTop: 25,
    backgroundColor: appColors.accentColor,
    padding: 10,
    borderRadius: 10,
    width: "70%",
  },
  titleStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: appColors.primary,
  },
  textStyle: {
    color: appColors.secondary,
  },
});
