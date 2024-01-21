import { StyleSheet } from "react-native";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import appColors from "../assets/styles/appColors";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PortfolioScreen from "../screens/PersonalPortfolioScreen";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import LogoutScreen from "../screens/LogoutScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: appColors.primary,
    },
    headerTintColor: appColors.titleColor,
    drawerItemStyle: {
      width: "90%",
    },
    drawerStyle: {
      backgroundColor: appColors.secondary,
    },
    drawerActiveTintColor: appColors.titleColor,
    drawerActiveBackgroundColor: appColors.primary,
    drawerInactiveTintColor: appColors.textColor,
    drawerInactiveBackgroundColor: appColors.secondary,
    drawerType: "slide",
  };

  const { isUserLogged } = useContext(LoginContext);

  return isUserLogged ? (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={drawerNavigatorScreenOptions}
    >
      <Drawer.Screen
        name="Inicio"
        component={WelcomeScreen}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Drawer.Navigator>
  ) : (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={drawerNavigatorScreenOptions}
    >
      <Drawer.Screen
        name="Inicio"
        component={WelcomeScreen}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ title: "Portfolio" }}
      />
      <Drawer.Screen
        name="Sign off"
        component={LogoutScreen}
        options={{ title: "Sign off" }}
      />
    </Drawer.Navigator>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
