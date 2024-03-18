import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View>
      <Text>Home page</Text>
      <Link href="/login">Login page</Link>
    </View>
  );
}
