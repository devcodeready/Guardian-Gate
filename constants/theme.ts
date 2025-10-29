
import { Platform } from 'react-native';

// Tu paleta de colores con nombres semánticos
const primaryColor = '#00598d';   // Azul corporativo
const accentColor = '#d2c074';    // Dorado/amarillo para detalles
const secondaryColor = '#E27434'; // Naranja para llamadas a la acción o alertas

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8f9fa', // Un blanco ligeramente apagado para un look más suave
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: secondaryColor,
    gray: '#adb5bd', // Gris neutro añadido
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: accentColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: accentColor,
    gray: '#495057', // Gris oscuro añadido
  },
  // Colores adicionales para acceso global
  primary: primaryColor,
  accent: accentColor,
  secondary: secondaryColor,
};

// Tus fuentes definidas
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
