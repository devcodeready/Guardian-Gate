import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const iconSize = width * 0.22;
  const titleFontSize = width * 0.13;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Nuevo contenedor que agrupa el logo y el botón en la parte inferior */}
        <View style={styles.bottomContainer}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="security" size={iconSize} color={Colors.secondary} />
            <View style={styles.titleContainer}>
              <ThemedText style={[styles.title, { fontSize: titleFontSize }]}>
                Guardian{' '}
              </ThemedText>
              <ThemedText style={[styles.title, { color: Colors.secondary, fontSize: titleFontSize }]}>
                Gate
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Comenzar</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
    // --- CAMBIO DE ARQUITECTURA CLAVE ---
    // En lugar de 'space-around', usamos 'flex-end' para empujar todo hacia abajo.
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  // Contenedor principal en la parte inferior de la pantalla
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    // Espacio entre el bloque del logo y el botón
    gap: 60,
    // Espacio desde el borde inferior de la pantalla
    paddingBottom: 50, 
  },
  // Contenedor solo para el logo (ícono + texto)
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20, // Espacio entre el ícono y el texto
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: Fonts.serif,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.sans,
  },
});