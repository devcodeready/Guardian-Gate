import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';
import * as Location from 'expo-location';

// --- ARQUITECTURA DE DATOS PARA EL MENÚ ---
// Se añade un nuevo item "Location" con un 'action' en lugar de 'href'
// para manejar eventos que no son de navegación.
const menuItems = [
  { id: 1, title: 'Attendance', icon: 'touch-app', href: '/(main)/attendance' },
  { id: 2, title: 'Location', icon: 'my-location', action: 'getLocation' },
  { id: 3, title: null, icon: null, href: null }, // Placeholder
  { id: 4, title: null, icon: null, href: null }, // Placeholder
  { id: 5, title: null, icon: null, href: null }, // Placeholder
  { id: 6, title: null, icon: null, href: null }, // Placeholder
];

// Cálculo dinámico para un diseño responsive de 2 columnas
const { width } = Dimensions.get('window');
const paddingHorizontal = 24;
const gap = 16;
const numberOfColumns = 2;
const itemSize = (width - (paddingHorizontal * 2) - gap) / numberOfColumns;

export default function MainMenuScreen() {

  // --- LÓGICA DE NEGOCIO ---
  // Función asíncrona dedicada para manejar la obtención de la ubicación.
  // Abstrae la lógica del componente y mejora la legibilidad.
  const handleLocationPress = async () => {
    // 1. Petición de permisos: Se solicita permiso al usuario para acceder a la ubicación
    //    mientras la app está en primer plano.
    const { status } = await Location.requestForegroundPermissionsAsync();

    // 2. Validación de permisos: Si el permiso no es concedido, se notifica al usuario
    //    y se detiene la ejecución.
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'El permiso para acceder a la ubicación fue denegado.');
      return;
    }

    // 3. Obtención de coordenadas: Si hay permiso, se obtiene la posición actual.
    //    El objeto `{}` indica que se usa la configuración por defecto (precisión balanceada).
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // 4. Feedback al usuario: Se muestran las coordenadas en un Alert.
    //    Alert es una solución nativa simple y efectiva para mostrar información temporal.
    Alert.alert('Ubicación Actual', `Latitud: ${latitude.toFixed(4)}\nLongitud: ${longitude.toFixed(4)}`);
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  // Se crea un objeto para mapear las acciones a sus funciones correspondientes.
  // Este patrón (Strategy Pattern) permite escalar fácilmente a más acciones sin
  // sobrecargar el JSX con lógica condicional.
  const actionHandlers: { [key: string]: () => void } = {
    getLocation: handleLocationPress,
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => {
          // Si el item tiene una acción definida, se renderiza un botón con su handler.
          if (item.action) {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={actionHandlers[item.action]}
                activeOpacity={0.7}
              >
                <MaterialIcons name={item.icon as any} size={40} color={Colors.primary} />
                <ThemedText style={styles.gridItemText}>{item.title}</ThemedText>
              </TouchableOpacity>
            );
          }

          // Si el item tiene un 'href', es un botón de navegación.
          if (item.href) {
            return (
              <Link key={item.id} href={item.href as any} asChild>
                <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
                  <MaterialIcons name={item.icon as any} size={40} color={Colors.primary} />
                  <ThemedText style={styles.gridItemText}>{item.title}</ThemedText>
                </TouchableOpacity>
              </Link>
            );
          }

          // Si no, es un placeholder.
          return (
            <View key={item.id} style={[styles.gridItem, styles.placeholderItem]} />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: paddingHorizontal,
    paddingTop: 16, // Espacio superior para la cuadrícula
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
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
    fontFamily: Fonts.sans,
    fontWeight: '600',
    color: Colors.primary,
  },
  // Estilo específico para los placeholders
  placeholderItem: {
    backgroundColor: '#f0f0f0', // Un color más apagado para indicar inactividad
    elevation: 0, // Sin sombra
    shadowOpacity: 0,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
});