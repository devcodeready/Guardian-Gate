import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.background,
      },
      headerTintColor: Colors.light.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="index" options={{ title: 'Menú Principal' }} />
      <Stack.Screen name="attendance" options={{ title: 'Registro de Asistencia' }} />
    </Stack>
  );
}
