import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Auth } from "aws-amplify";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function Profile() {
  const alertSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure that you want to sign out?",
      [{ text: "No" }, { text: "Yes", onPress: () => Auth.signOut() }],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Entypo
            style={{ marginLeft: 10 }}
            name="pencil"
            size={20}
            color="white"
          />
          <Text style={styles.secMenuText}> Manage Profiles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
      <View style={styles.secMenuItem}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
        <AntDesign name="bells" size={20} color="white" />
          <Text style={styles.secMenuText}> Notification</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secMenuItem}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
        <AntDesign name="check" size={20} color="white" />
          <Text style={styles.secMenuText}> My List</Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.secMenuItem}>
          <Text style={styles.secMenuText} size={18} top>
            Payment Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secMenuItem}>
          <Text style={styles.secMenuText} size={18}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secMenuItem}>
          <Text style={styles.secMenuText} size={18}>
            Language
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secMenuItem}>
          <Text style={styles.secMenuText} size={18}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secMenuItem}>
          <Text style={styles.secMenuText} size={18}>
            Help
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secMenuItem} onPress={alertSignOut}>
          <Text style={styles.secMenuText} size={20}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    backgroundColor: "black",
    height: "100%",
  },
  profiles: {
    height: "35%",
    backgroundColor: "black",
  },
  menu: {
    marginTop: 20,
    height: "100%",
    backgroundColor: "#1b1b1b",
  },
  secondaryMenu: {},
  secMenuItem: {
    padding: 10,
    paddingHorizontal: 16,
  },
  secMenuText: {
    fontSize: 17,
    color: "white",
  },
});
