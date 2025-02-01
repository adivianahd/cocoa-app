import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemeInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemeInput({ style, lightColor, darkColor, ...otherProps }: ThemeInputProps) {
  const color = useThemeColor({ light: lightColor, dark: '#000' }, 'text');

  return <TextInput
    style={[styles.input, { color }, style]}
    placeholderTextColor={"gray"}
    {...otherProps}
  />;
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  }
});