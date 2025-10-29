import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
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
      Alert.alert('Access Denied', 'Please check your employee number and PIN.');
      return;
    }
    console.log('Authentication simulated successful for:', { employeeNumber });
    router.replace('/(main)');
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <MaterialIcons name="security" size={60} color={Colors.secondary} />
            <ThemedText style={styles.title}>Login</ThemedText>
            <ThemedText style={styles.subtitle}>Enter your employee number and PIN</ThemedText>
          </View>

          <View style={styles.formContainer}>
            <ThemedInput
              placeholder="Employee Number"
              value={employeeNumber}
              onChangeText={setEmployeeNumber}
              keyboardType="numeric"
              style={{ fontFamily: Fonts.sans }}
            />
            <ThemedInput
              placeholder="Security PIN"
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
            <ThemedText style={styles.buttonText}>Authenticate</ThemedText>
          </TouchableOpacity>
        </ScrollView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    // Añade un padding vertical para asegurar que nunca toque los bordes
    paddingVertical: 20, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.serif,
    fontWeight: 'bold',
    color: Colors.secondary,
    lineHeight: 24, // <-- ¡AQUÍ ESTÁ LA MAGIA!
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    color: '#687076',
    textAlign: 'center',
  },
  formContainer: {
    gap: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.secondary,
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