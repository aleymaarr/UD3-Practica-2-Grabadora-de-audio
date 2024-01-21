import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appColors from "../assets/styles/appColors";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>MY APP PHONE</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColors.primary,
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: appColors.titleColor,
    fontSize: 45,
    fontWeight: "bold",
  },
});
