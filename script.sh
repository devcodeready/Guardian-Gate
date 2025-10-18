#!/bin/bash

# Este script reestructura la aplicación Expo para un flujo de autenticación
# y un menú principal basado en una cuadrícula.

echo "🚀 Iniciando la reestructuración de la aplicación..."

# --- 1. Limpieza de la estructura antigua ---
echo "🗑️  Eliminando la estructura de navegación por pestañas anterior..."
rm -rf app/\(tabs\)
if [ $? -eq 0 ]; then
    echo "✅ Directorio app/(tabs) eliminado con éxito."
else
    echo "⚠️  No se pudo eliminar app/(tabs) o no existía."
fi

# --- 2. Creación de la nueva estructura de directorios ---
echo "📁 Creando nueva estructura de directorios para el menú principal..."
mkdir -p app/\(main\)
echo "✅ Directorio app/(main) creado."

# --- 3. Actualización del archivo de tema ---
echo "🎨 Actualizando la paleta de colores y las fuentes en constants/theme.ts..."
cat << 'EOF' > constants/theme.ts
import { Platform } from 'react-native';

// Tu paleta de colores con nombres semánticos
const primaryColor = '#00598d';   // Azul corporativo
const accentColor = '#d2c074';    // Dorado/amarillo para detalles
const secondaryColor = '#E27434'; // Naranja para llamadas a la acción o alertas

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8f9fa', // Un blanco ligeramente apagado para un look más suave
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: secondaryColor,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: accentColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: accentColor,
  },
  // Colores adicionales para acceso global
  primary: primaryColor,
  accent: accentColor,
  secondary: secondaryColor,
};

// Tus fuentes definidas
export const Fonts = Platform.select({
  default: {
    sans: 'Lato',
    serif: 'Open Sans',
  },
  web: {
    sans: "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'Open Sans', Georgia, 'Times New Roman', serif",
  },
});
EOF
echo "✅ Archivo de tema actualizado."

# --- 4. Creación de la Pantalla de Login ---
echo "🔑 Creando la nueva pantalla de Login en app/index.tsx..."
cat << 'EOF' > app/index.tsx
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!employeeNumber.trim() || pin.length !== 4) {
      Alert.alert('Acceso Denegado', 'Por favor, verifique su número de empleado y PIN.');
      return;
    }
    console.log('Autenticación simulada exitosa para:', { employeeNumber });
    router.replace('/(main)'); 
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.header}>
          <MaterialIcons name="security" size={60} color={Colors.primary} />
          <ThemedText style={styles.title}>Guardian Gate</ThemedText>
          <ThemedText style={styles.subtitle}>Control de Acceso Corporativo</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <ThemedInput
            placeholder="Número de Empleado"
            value={employeeNumber}
            onChangeText={setEmployeeNumber}
            keyboardType="numeric"
            style={{ fontFamily: Fonts.default.sans }}
          />
          <ThemedInput
            placeholder="PIN de Seguridad"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            style={{ fontFamily: Fonts.default.sans }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Ingresar</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.default.serif,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.default.sans,
    color: '#687076',
    marginTop: 4,
  },
  formContainer: {
    gap: 18,
    marginBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.default.sans,
  },
});
EOF
echo "✅ Pantalla de Login creada."

# --- 5. Creación del Layout del Menú Principal ---
echo "🏗️  Creando el layout del menú principal en app/(main)/_layout.tsx..."
cat << 'EOF' > app/\(main\)/_layout.tsx
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
EOF
echo "✅ Layout del menú principal creado."

# --- 6. Creación de la Pantalla del Menú Principal ---
echo "🏠 Creando la pantalla del menú principal en app/(main)/index.tsx..."
cat << 'EOF' > app/\(main\)/index.tsx
import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';

const { width } = Dimensions.get('window');
const itemSize = (width - 48 - 16) / 2; // (Ancho de pantalla - padding horizontal - gap) / numColumnas

export default function MainMenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        <Link href="/(main)/attendance" asChild>
          <TouchableOpacity style={styles.gridItem}>
            <MaterialIcons name="touch-app" size={40} color={Colors.primary} />
            <ThemedText style={styles.gridItemText}>Attendance</ThemedText>
          </TouchableOpacity>
        </Link>
        {/* Aquí se agregarán los otros 5 botones en el futuro */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: itemSize,
    height: itemSize,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridItemText: {
    fontSize: 16,
    fontFamily: Fonts.default.sans,
    fontWeight: '600',
    color: Colors.primary,
  },
});
EOF
echo "✅ Pantalla del menú principal creada."

# --- 7. Creación de la Pantalla de Asistencia (Placeholder) ---
echo "➡️  Creando la pantalla de asistencia en app/(main)/attendance.tsx..."
cat << 'EOF' > app/\(main\)/attendance.tsx
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native";

export default function AttendanceScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Asistencia</ThemedText>
      <ThemedText>Esta es la pantalla de registro de asistencia.</TheThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    }
})
EOF
echo "✅ Pantalla de asistencia creada."

echo -e "\n🎉 ¡Reestructuración completada! 🎉"
echo "Ahora puedes reiniciar el servidor de desarrollo de Expo para ver los cambios."