import { Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    "DM-Sans": require("../assets/fonts/DM_Sans.ttf"),
  });

  if (!fontLoaded) {
    // You can use a loading spinner here if you want
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={true}>  
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={false}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
