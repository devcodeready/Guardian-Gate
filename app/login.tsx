import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
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
            style={{ fontFamily: Fonts.sans }}
          />
          <ThemedInput
            placeholder="PIN de Seguridad"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            style={{ fontFamily: Fonts.sans }}
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
    fontFamily: Fonts.serif,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.sans,
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
    fontFamily: Fonts.sans,
  },
});