import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loading = () => {
  const theme = useTheme();
  return (
    <View style={styles.container} testID="loading-container">
      <ActivityIndicator 
        size="large" 
        color={theme.colors.text} 
        testID="activity-indicator"
        accessibilityRole="progressbar"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});