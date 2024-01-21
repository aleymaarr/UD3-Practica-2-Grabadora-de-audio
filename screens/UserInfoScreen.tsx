import { StyleSheet, Text, View } from "react-native";
import Description from "../components/PersonalDescription";
import HobbiesList from "../components/PersonalHobbiesList";

const UserInfoScreen = () => {
  return (
    <>
      <Description></Description>
      <HobbiesList></HobbiesList>
    </>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({});
