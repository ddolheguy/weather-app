import { useTheme } from "@/hooks/useTheme";
import { makeStyles } from "@/theme/make-styles";
import { PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Button = ({ children, ...props }: PropsWithChildren<TouchableOpacityProps>) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity {...props} accessibilityState={{ disabled: props.disabled }} style={styles.button} testID="button">
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  )
}

const useStyles = makeStyles(({ colors }) => ({
  button: {
    backgroundColor: colors.inverseBackground,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    color: colors.textInverse,
    textAlign: 'center',
  },
}));