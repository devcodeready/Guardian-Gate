import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native";

export default function AttendanceScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Asistencia</ThemedText>
      <ThemedText>Esta es la pantalla de registro de asistencia.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    }
});