import { useTheme } from "@/hooks/useTheme";
import { makeStyles } from "@/theme/make-styles";
import { Text, View } from "react-native";

interface WeatherDetailProps {
  capitalize?: boolean;
  label: string;
  value: string;
}

export const WeatherDetail = ({ capitalize, label, value }: WeatherDetailProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      <Text style={[styles.value, capitalize && styles.capitalize]}>
        {value}
      </Text>
    </View>
  );
}


const useStyles = makeStyles(({ colors }) => ({
  container: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 16,
  },
  value: {
    color: colors.highlight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));