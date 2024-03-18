import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";
import useDimension from "@/hooks/useDimension"; // Ensure the hook is correctly imported

export default function LoginScreen() {
  const {
    userInfo,
    promptAsyncGoogle: googleLogin,
    appleLogin,
    appleAuthAvailable,
  } = useAuth()!;

  const { dWidth } = useDimension(); // Destructure to get width

  // Dynamically adjust button width based on screen width
  const buttonWidth = dWidth * 0.8; // Adjust the percentage as needed

  // Styles are now a function to incorporate dynamic sizing
  const styles = getStyles(buttonWidth);

  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <Text style={styles.title}>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
        </>
      )}
      {appleAuthAvailable && (
        <FontAwesome5.Button
          name="apple"
          onPress={() => appleLogin()}
          style={styles.appleButton}
          iconStyle={{ fontSize: 24 }}
        >
          <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </FontAwesome5.Button>
      )}
      <FontAwesome5.Button
        name="google"
        onPress={() => googleLogin()}
        iconStyle={{ color: "black" }}
        style={styles.googleButton}
      >
        <Text>Continue with Google</Text>
      </FontAwesome5.Button>
    </View>
  );
}

// Convert StyleSheet to a function to incorporate dynamic sizing
function getStyles(buttonWidth: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    googleButton: {
      justifyContent: "center",
      width: buttonWidth,
      height: 44,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
    },
    appleButton: {
      justifyContent: "center",
      width: buttonWidth,
      height: 44,
      backgroundColor: "black",
      borderRadius: 5,
    },
    appleButtonText: {
      color: "white",
    },
  });
}
