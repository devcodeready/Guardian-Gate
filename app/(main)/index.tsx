import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import * as Location from 'expo-location';
import { useTimer } from '@/context/TimerContext'; // Hook para consumir el estado del temporizador

// --- ARQUITECTURA DE DATOS PARA EL MENÚ ---
// Se ha simplificado para solo contener el título y la acción (navegación o función).
// El icono se reemplaza por el componente del temporizador.
const menuItems = [
  { id: 1, title: 'Check In', href: '/(main)/attendance' },
  { id: 2, title: 'Check Out', action: 'getLocation' },
  { id: 3, title: null, href: null }, // Placeholder
  { id: 4, title: null, href: null }, // Placeholder
  { id: 5, title: null, href: null }, // Placeholder
  { id: 6, title: null, href: null }, // Placeholder
];

// --- CÁLCULOS DE DISEÑO RESPONSIVE ---
const { width } = Dimensions.get('window');
const paddingHorizontal = 24;
const gap = 16;
const numberOfColumns = 2;
const itemSize = (width - (paddingHorizontal * 2) - gap) / numberOfColumns;

// --- FUNCIÓN UTILITARIA ---
// Formatea un número total de segundos al formato "MM:SS".
// padStart(2, '0') asegura que siempre haya dos dígitos (e.g., "05" en lugar de "5").
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function MainMenuScreen() {
  // --- LÓGICA DE ESTADO ---
  // Se consume el estado del temporizador desde el contexto global.
  const { countdown, isTimerActive } = useTimer();

  // --- LÓGICA DE NEGOCIO ---
  const handleLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'El permiso para acceder a la ubicación fue denegado.');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    Alert.alert('Ubicación Actual', `Latitud: ${latitude.toFixed(4)}\nLongitud: ${longitude.toFixed(4)}`);
  };

  const actionHandlers: { [key: string]: () => void } = {
    getLocation: handleLocationPress,
  };

  // --- SUB-COMPONENTE DE RENDERIZADO ---
  // Un componente interno para mostrar el temporizador.
  // Muestra "00:00" si el temporizador no está activo.
  const TimerDisplay = () => (
    <ThemedText style={styles.timerText}>
      {isTimerActive ? formatTime(countdown) : "00:00"}
    </ThemedText>
  );

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => {
          // Si el item no tiene título, es un placeholder.
          if (!item.title) {
            return <View key={item.id} style={[styles.gridItem, styles.placeholderItem]} />;
          }
          
          // Se define el contenido del botón para no repetirlo.
          const buttonContent = (
            <>
              <TimerDisplay /> 
              <ThemedText style={styles.gridItemText}>{item.title}</ThemedText>
            </>
          );

          // Renderiza un botón con acción si 'item.action' existe.
          if (item.action) {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={actionHandlers[item.action]}
                activeOpacity={0.7}
              >
                {buttonContent}
              </TouchableOpacity>
            );
          }
          
          // Renderiza un botón de navegación si 'item.href' existe.
          if (item.href) {
            return (
              <Link key={item.id} href={item.href as any} asChild>
                <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
                  {buttonContent}
                </TouchableOpacity>
              </Link>
            );
          }
          
          return null; // No renderizar nada si el item no tiene ni acción ni href.
        })}
      </View>
    </SafeAreaView>
  );
}

// --- HOJA DE ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: paddingHorizontal,
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
  },
  gridItem: {
    width: itemSize,
    height: itemSize,
    backgroundColor: '#25282a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  timerText: {
    fontFamily: Fonts.sans,
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.secondary, // Naranja para un alto impacto visual
  },
  gridItemText: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    color: Colors.dark.text, // Texto blanco para contraste
  },
  placeholderItem: {
    backgroundColor: 'transparent',
    borderColor: Colors.dark.gray,
    borderStyle: 'dashed',
  },
});