import { Platform } from 'react-native';

// Tu paleta de colores con nombres semánticos
const primaryColor = '#00598d';   // Azul corporativo
const accentColor = '#d2c074';    // Dorado/amarillo para detalles
const secondaryColor = '#E27434'; // Naranja para llamadas a la acción o alertas

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8f9fa',
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: secondaryColor,
    gray: '#adb5bd',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: accentColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: accentColor,
    gray: '#495057',
  },
  // Colores adicionales para acceso global
  primary: primaryColor,
  accent: accentColor,
  secondary: secondaryColor,

  // --- NUEVOS COLORES DE ESTADO ---
  // Se añaden colores semánticos para representar estados de urgencia.
  success: '#28a745', // Verde para indicar seguridad o baja urgencia (30 min)
  warning: '#ffc107', // Amarillo para una advertencia o urgencia media (15 min)
  danger: '#dc3545',   // Rojo para indicar alta urgencia o peligro (5 min)
};

// Tus fuentes definidas (sin cambios)
export const Fonts = Platform.select({
  default: {
    sans: 'Lato',
    serif: 'Open Sans',
  },
  web: {
    sans: "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'Open Sans', Georgia, 'Times New Roman', serif",
  },
});