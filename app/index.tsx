import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { WarningModal } from '@/components/ui/WarningModal';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isModalVisible, setModalVisible] = useState(false);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.05, {
        duration: 1500,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const iconSize = width * 0.22;
  const titleFontSize = width * 0.13;
  
  // ¡CAMBIO CLAVE! Usamos 1.2 para un margen de seguridad cómodo en la altura de línea.
  const titleLineHeight = titleFontSize * 1.2; 

  const handleConfirm = () => {
    setModalVisible(false);
    router.push('/login');
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  
  const handleStartPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="security" size={iconSize} color={Colors.secondary} />
            <View style={styles.titleContainer}>
              {/* Aplicando el nuevo titleLineHeight */}
              <ThemedText style={[styles.title, { fontSize: titleFontSize, lineHeight: titleLineHeight }]}>
                Guardian{' '}
              </ThemedText>
              {/* Aplicando el nuevo titleLineHeight */}
              <ThemedText style={[styles.title, { color: Colors.secondary, fontSize: titleFontSize, lineHeight: titleLineHeight }]}>
                Gate
              </ThemedText>
            </View>
          </View>

          <AnimatedTouchableOpacity
            style={[styles.button, animatedStyle]}
            onPress={handleStartPress}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>Start</ThemedText>
          </AnimatedTouchableOpacity>
        </View>
      </SafeAreaView>

      <WarningModal
        visible={isModalVisible}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
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
    // Layout original: Centra todo el contenido
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 80, // Espacio entre el logo/título y el botón
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20, // Espacio entre el escudo y el texto
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