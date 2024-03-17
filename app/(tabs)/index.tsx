import { Button, StatusBar, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAuth } from "@/hooks/useAuth";

export default function TabOneScreen() {
  const { userInfo, promptAsyncGoogle, promptAsyncApple, appleAuthAvailable } =
    useAuth()!;

  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <Text style={styles.title}>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
        </>
      )}
      {appleAuthAvailable && (
        <Button title="Sign in with Apple" onPress={() => promptAsyncApple()} />
      )}
      <Button title="Sign in with Google" onPress={() => promptAsyncGoogle()} />
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
