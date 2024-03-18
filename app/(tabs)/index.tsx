import { Button, StatusBar, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LoginScreen() {
  const {
    userInfo,
    promptAsyncGoogle: googleLogin,
    appleLogin,
    appleAuthAvailable,
  } = useAuth()!;

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
  googleButton: {
    display: "flex",
    justifyContent: "center",
    width: 200,
    height: 44,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  appleButton: {
    display: "flex",
    justifyContent: "center",
    width: 200,
    height: 44,
    backgroundColor: "black",
  },
  appleButtonText: {
    color: "white",
  },
});
