
import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics'; // --- 1. IMPORTAR HAPTICS ---

interface WarningModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function WarningModal({ visible, onClose, onConfirm }: WarningModalProps) {
  
  // --- 2. CREAR FUNCIÓN QUE INCLUYE LA VIBRACIÓN ---
  const handleConfirmPress = () => {
    // Usamos una vibración de impacto 'Medium' para una confirmación más fuerte.
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onConfirm(); // Llama a la función original pasada por props.
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <MaterialIcons name="warning" size={32} color={Colors.secondary} />
            <ThemedText style={styles.modalTitle}>Violators Will Be Prosecuted</ThemedText>
          </View>

          <ThemedText style={styles.modalText}>
          All activity within this app is monitored. Any attempt at fraudulent activity will be investigated and reported to local authorities and may result in criminal charges.
          </ThemedText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.textStyle}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleConfirmPress} // --- 3. USAR LA NUEVA FUNCIÓN ---
              activeOpacity={0.8}
            >
              <ThemedText style={styles.textStyle}>Accept</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ... (los estilos permanecen igual)
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 24,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderTopWidth: 4,
    borderTopColor: Colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Fonts.serif,
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#EAEAEA',
    fontFamily: Fonts.sans,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#3A3A3C',
  },
  buttonConfirm: {
    backgroundColor: Colors.secondary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.sans,
  },
});
