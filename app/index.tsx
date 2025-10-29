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
import * as Haptics from 'expo-haptics'; // --- 1. IMPORTAR HAPTICS ---
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
  const titleLineHeight = titleFontSize * 1.1;

  const handleConfirm = () => {
    setModalVisible(false);
    router.push('/login');
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  
  // --- 2. CREAR FUNCIÓN QUE INCLUYE LA VIBRACIÓN ---
  const handleStartPress = () => {
    // Proporciona una vibración ligera para indicar que la acción fue registrada.
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
              <ThemedText style={[styles.title, { fontSize: titleFontSize, lineHeight: titleLineHeight }]}>
                Guardian{' '}
              </ThemedText>
              <ThemedText style={[styles.title, { color: Colors.secondary, fontSize: titleFontSize, lineHeight: titleLineHeight }]}>
                Gate
              </ThemedText>
            </View>
          </View>

          <AnimatedTouchableOpacity
            style={[styles.button, animatedStyle]}
            onPress={handleStartPress} // --- 3. USAR LA NUEVA FUNCIÓN ---
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

// ... (los estilos permanecen igual)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 80,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20,
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