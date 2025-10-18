import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({ style, ...rest }: ThemedInputProps) {
  const color = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'text');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#777' }, 'text');

  return (
    <TextInput
      style={[
        styles.input,
        { 
          color: color, 
          borderColor: borderColor,
        },
        style,
      ]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
  },
});