import { useTheme } from "@/hooks/useTheme";
import { CityWeather } from "@/services/api/types/weartherTypes";
import { makeStyles } from "@/theme/make-styles";
import { Image } from "expo-image";
import { View } from "react-native";
import { WeatherDetail } from "./WeatherDetail";

interface WeatherTileProps {
  weather: CityWeather;
}

export const WeatherTile = ({ weather }: WeatherTileProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container} testID="weather-tile-container">
      <View style={styles.detailsContainer} testID="weather-details-container">
        <WeatherDetail label="City Name:" value={weather.name} />
        <WeatherDetail label="Current Temperature:" value={`${weather.main.temp}°C`} />
        <WeatherDetail label="Weather Condition:" value={weather.weather[0].description} capitalize />
      </View>
      <Image 
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} 
        style={styles.icon} 
        contentFit="contain" 
        testID="weather-icon"
      />
    </View>
  )
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
    gap: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    gap: 16,
    paddingTop: 24,
  },
  icon: {
    width: 100,
    height: 100,
  },
}));