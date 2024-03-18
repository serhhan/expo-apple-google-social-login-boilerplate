import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import useDimension from "@/hooks/useDimension"; // Ensure the hook is correctly imported
import { IconButton } from "@/components/Atoms/Button";

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
  const basePadding = 32;

  const responsivePadding = dWidth < 768 ? basePadding : basePadding * 2;

  // Styles are now a function to incorporate dynamic sizing
  const styles = getStyles(buttonWidth, responsivePadding);

  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <Text style={styles.title}>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
        </>
      )}
      {appleAuthAvailable && (
        <IconButton type="apple" onPress={() => appleLogin()} />
      )}
      <IconButton type="google" onPress={() => googleLogin()} />
    </View>
  );
}

// Convert StyleSheet to a function to incorporate dynamic sizing
function getStyles(buttonWidth: number, responsivePadding: number) {
  return StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
      alignItems: "center",
      justifyContent: "flex-end",
      padding: responsivePadding,
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
