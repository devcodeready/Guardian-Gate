import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import * as Location from 'expo-location';
import { useTimer } from '@/context/TimerContext';

// --- ARQUITECTURA DE DATOS ACTUALIZADA ---
// Los títulos de los botones intermedios e inferiores se establecen como strings vacíos ('')
// para ocultar las etiquetas sin afectar la estructura del layout.
const menuItems = [
  { id: 1, title: 'Check In', href: '/(main)/attendance', timerType: 'main' },
  { id: 2, title: 'Check Out', action: 'getLocation', timerType: 'main' },
  { id: 3, title: '', action: null, timerType: 'middle' },
  { id: 4, title: '', action: null, timerType: 'middle' },
  { id: 5, title: '', action: null, timerType: 'bottom' },
  { id: 6, title: '', action: null, timerType: 'bottom' },
];

const { width } = Dimensions.get('window');
const paddingHorizontal = 24;
const gap = 16;
const numberOfColumns = 2;
const itemSize = (width - (paddingHorizontal * 2) - gap) / numberOfColumns;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function MainMenuScreen() {
  const { mainTimer, middleTimer, bottomTimer } = useTimer();
  const handleLocationPress = async () => { /* ... (lógica sin cambios) ... */ };
  const actionHandlers: { [key: string]: () => void } = { getLocation: handleLocationPress };

  // --- SUB-COMPONENTE DE RENDERIZADO MEJORADO ---
  // Ahora acepta un prop 'color' para aplicar estilos dinámicamente.
  const TimerDisplay = ({ timerState, color }: { timerState: { countdown: number, isActive: boolean }, color: string }) => (
    <ThemedText style={[styles.timerText, { color: color }]}>
      {timerState.isActive ? formatTime(timerState.countdown) : "00:00"}
    </ThemedText>
  );

  const getTimerState = (timerType: string) => {
    switch (timerType) {
      case 'main': return mainTimer;
      case 'middle': return middleTimer;
      case 'bottom': return bottomTimer;
      default: return { countdown: 0, isActive: false };
    }
  };

  // --- NUEVA FUNCIÓN AUXILIAR PARA EL COLOR ---
  // Devuelve el color apropiado basado en el 'timerType'.
  // Esto mantiene la lógica de negocio fuera del JSX, haciéndolo más limpio.
  const getTimerColor = (timerType: string) => {
    switch (timerType) {
      case 'main': return Colors.success; // Verde para 30 min
      case 'middle': return Colors.warning; // Amarillo para 15 min
      case 'bottom': return Colors.danger;   // Rojo para 5 min
      default: return Colors.secondary; // Un color por defecto seguro
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => {
          const timerState = getTimerState(item.timerType);
          const timerColor = getTimerColor(item.timerType); // Se obtiene el color dinámico

          const buttonContent = (
            <>
              {/* Se pasa el color dinámico al componente TimerDisplay */}
              <TimerDisplay timerState={timerState} color={timerColor} />
              
              {/* --- RENDERIZADO CONDICIONAL DE LA ETIQUETA --- */}
              {/* El componente ThemedText solo se renderiza si 'item.title' no es un string vacío. */}
              {/* Esto elimina el texto y previene espacios no deseados. */}
              {item.title ? (
                <ThemedText style={styles.gridItemText}>{item.title}</ThemedText>
              ) : null}
            </>
          );

          // ... (la lógica de renderizado de Link y TouchableOpacity no cambia)
          if (item.action) {
            return <TouchableOpacity key={item.id} style={styles.gridItem} onPress={actionHandlers[item.action]} activeOpacity={0.7}>{buttonContent}</TouchableOpacity>;
          }
          if (item.href) {
            return <Link key={item.id} href={item.href as any} asChild><TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>{buttonContent}</TouchableOpacity></Link>;
          }
          return <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>{buttonContent}</TouchableOpacity>;
        })}
      </View>
    </SafeAreaView>
  );
}

// --- HOJA DE ESTILOS (ACTUALIZADA) ---
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
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center',
    gap: 4, // Se reduce el espacio por si acaso, aunque no debería aplicar sin la segunda etiqueta
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  timerText: {
    fontFamily: Fonts.sans,
    fontSize: 32,
    fontWeight: 'bold',
    // El color se define ahora dinámicamente en el componente
  },
  gridItemText: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});