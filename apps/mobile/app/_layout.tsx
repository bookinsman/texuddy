import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Texuddy' }} />
      <Stack.Screen name="kid" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="parent" options={{ title: 'Parent Portal' }} />
    </Stack>
  );
}

