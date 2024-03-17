import { Button, StatusBar, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import * as AppleAuthentication from "expo-apple-authentication";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const { userInfo, promptAsync } = useAuth()!;
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credential);
    } catch (e) {
      console.log(e);
    }
  };

  const getAppleAuthContent = () => {
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={login}
      />
    );
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.title}>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
        </>
      ) : (
        <Text>No user info available</Text>
      )}
      {appleAuthAvailable ? (
        getAppleAuthContent()
      ) : (
        <Text>Apple auth unavailable</Text>
      )}
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
