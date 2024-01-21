import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import appColors from "./assets/styles/appColors";
import Header from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./components/CustomDrawer";
import LoginProvider from "./providers/LoginProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginProvider>
        <Header />
        <NavigationContainer>
          <CustomDrawer />
        </NavigationContainer>
        <StatusBar style="auto" />
      </LoginProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.secondary,
  },
});
