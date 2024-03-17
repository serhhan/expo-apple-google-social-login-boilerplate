import { Button, StatusBar, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

export default function TabOneScreen() {
  const { userInfo, promptAsync } = useAuth()!;

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
