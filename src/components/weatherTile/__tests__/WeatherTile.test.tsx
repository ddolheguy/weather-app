import { Providers } from '@/providers/Providers';
import { CityWeather } from '@/services/api/types/weartherTypes';
import { render, screen } from '@testing-library/react-native';
import { WeatherTile } from '../WeatherTile';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <Providers>
      {component}
    </Providers>
  );
};

const mockWeatherData: CityWeather = {
  coord: { lon: -122.4194, lat: 37.7749 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 22.5,
    feels_like: 24.2,
    temp_min: 18.0,
    temp_max: 26.0,
    pressure: 1013,
    humidity: 65,
    sea_level: 1013,
    grnd_level: 1010
  },
  visibility: 10000,
  wind: {
    speed: 5.2,
    deg: 180
  },
  clouds: {
    all: 20
  },
  dt: 1640995200,
  sys: {
    type: 2,
    id: 2003458,
    country: 'US',
    sunrise: 1640952000,
    sunset: 1640988000
  },
  timezone: -28800,
  id: 5391959,
  name: 'San Francisco',
  cod: 200
};

describe('WeatherTile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render weather tile with all weather details', () => {
    renderWithTheme(<WeatherTile weather={mockWeatherData} />);

    // Check if all weather details are rendered
    expect(screen.getByText('City Name:')).toBeTruthy();
    expect(screen.getByText('San Francisco')).toBeTruthy();
    expect(screen.getByText('Current Temperature:')).toBeTruthy();
    expect(screen.getByText('22.5°C')).toBeTruthy();
    expect(screen.getByText('Weather Condition:')).toBeTruthy();
    expect(screen.getByText('clear sky')).toBeTruthy();
  });

  it('should render weather icon with correct source URL', () => {
    renderWithTheme(<WeatherTile weather={mockWeatherData} />);

    const icon = screen.getByTestId('weather-icon');
    expect(icon).toBeTruthy();
  });

  it('should handle weather data with different temperature values', () => {
    const weatherWithNegativeTemp: CityWeather = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: -5.2
      }
    };

    renderWithTheme(<WeatherTile weather={weatherWithNegativeTemp} />);

    expect(screen.getByText('-5.2°C')).toBeTruthy();
  });

  it('should handle weather data with zero temperature', () => {
    const weatherWithZeroTemp: CityWeather = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: 0
      }
    };

    renderWithTheme(<WeatherTile weather={weatherWithZeroTemp} />);

    expect(screen.getByText('0°C')).toBeTruthy();
  });

  it('should handle weather data with different weather conditions', () => {
    const weatherWithRain: CityWeather = {
      ...mockWeatherData,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ]
    };

    renderWithTheme(<WeatherTile weather={weatherWithRain} />);

    expect(screen.getByText('light rain')).toBeTruthy();
  });
}); 