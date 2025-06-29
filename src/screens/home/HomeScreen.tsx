import { Button } from '@/components/button';
import { Loading } from '@/components/loading';
import { SearchField } from '@/components/searchField';
import { WeatherTile } from '@/components/weatherTile';
import { useTheme } from '@/hooks/useTheme';
import { useWeatherContext } from '@/hooks/useWeatherContext';
import { useGetCityWeather } from '@/services/api';
import { makeStyles } from '@/theme/make-styles';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export function HomeScreen() {
  const theme = useTheme();
  const styles = useStyles(theme);

  const { city, weather } = useWeatherContext();
  const { getWeatherForCity, isLoading, error } = useGetCityWeather();

  const [filter, setFilter] = useState(city ?? '');

  const handleSearch = async () => {
    if (filter) {
      await getWeatherForCity(filter);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchField
            title="Search by City name"
            value={filter}
            onChangeText={setFilter}
          />
          <Button disabled={!filter} onPress={handleSearch}>
            Search
          </Button>
        </View>

        <View style={styles.weatherContainer}>
          {isLoading && <Loading />}
          {error && <Text style={styles.error}>Error: {error.message}</Text>}
          {weather && <WeatherTile weather={weather} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  weatherContainer: {
    flex: 1,
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  error: {
    color: colors.error,
    fontSize: 16,
  },
}));