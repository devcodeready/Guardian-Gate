import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <Stack screenOptions={{
      // 1. Colorimetría del Splash Screen
      headerStyle: {
        backgroundColor: Colors.dark.background, // Fondo negro
      },
      headerTintColor: Colors.secondary, // Títulos y botones en naranja para un alto contraste
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // 2. Título Centrado
      headerTitleAlign: 'center', 
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          // 3. Título y Flecha de Retroceso
          title: 'Guardian Gate', 
          headerBackVisible: false,
        }} 
      />
      <Stack.Screen 
        name="attendance" 
        options={{ 
          title: 'Registro de Asistencia',
          // Nota: Esta pantalla heredará el estilo centrado y los colores del header.
          // La flecha de retroceso aparecerá automáticamente y será de color naranja.
        }} 
      />
    </Stack>
  );
}