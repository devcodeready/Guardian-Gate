import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TimerProvider } from '@/context/TimerContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TimerProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Pantalla de bienvenida, sin encabezado */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          
          {/* Pantalla de login, sin encabezado */}
          <Stack.Screen name="login" options={{ headerShown: false }} />

          {/* Grupo de rutas del menú principal, su propio layout se encargará del encabezado */}
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          
          {/* Puedes remover la pantalla modal si ya no la usas */}
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </TimerProvider>
  );
}