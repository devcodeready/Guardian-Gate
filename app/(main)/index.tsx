import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';

// --- ARQUITECTURA DE DATOS PARA EL MENÚ ---
// Definimos los elementos del menú en un array. Esto hace que el código sea escalable.
// Para activar un nuevo botón, solo necesitas cambiar un objeto 'placeholder' aquí.
const menuItems = [
  { id: 1, title: 'Attendance', icon: 'touch-app', href: '/(main)/attendance' },
  { id: 2, title: null, icon: null, href: null }, // Placeholder
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => {
          // Si el item tiene un 'href', es un botón activo.
          if (item.href) {
            return (
              <Link key={item.id} href={item.href as any} asChild>
                <TouchableOpacity style={styles.gridItem}>
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