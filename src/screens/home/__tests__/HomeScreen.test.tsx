import { Providers } from '@/providers/Providers';
import { useGetCityWeather } from '@/services/api';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';

// Mock the hooks
jest.mock('@/services/api');
jest.mock('@/hooks/useWeatherContext', () => ({
  useWeatherContext: jest.fn(() => ({
    city: undefined,
    weather: undefined,
  })),
}));

const mockedUseGetCityWeather = useGetCityWeather as jest.MockedFunction<typeof useGetCityWeather>;

// Mock weather data
const mockWeatherData = {
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
    temp: 293.15,
    feels_like: 292.15,
    temp_min: 290.15,
    temp_max: 295.15,
    pressure: 1013,
    humidity: 65,
    sea_level: 1013,
    grnd_level: 1010
  },
  visibility: 10000,
  wind: {
    speed: 2.1,
    deg: 280
  },
  clouds: {
    all: 20
  },
  dt: 1640995200,
  sys: {
    type: 2,
    id: 2003453,
    country: 'US',
    sunrise: 1640952000,
    sunset: 1640988000
  },
  timezone: -28800,
  id: 5391959,
  name: 'San Francisco',
  cod: 200
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Providers>
      {component}
    </Providers>
  );
};

describe('HomeScreen', () => {
  const mockGetWeatherForCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseGetCityWeather.mockReturnValue({
      getWeatherForCity: mockGetWeatherForCity,
      isLoading: false,
      error: undefined,
    });
  });

  describe('Initial Render', () => {
    it('should render search field and button', () => {
      renderWithProviders(<HomeScreen />);

      expect(screen.getByTestId('search-field')).toBeTruthy();
      expect(screen.getByText('Search')).toBeTruthy();
    });

    it('should not show loading, error, or weather initially', () => {
      renderWithProviders(<HomeScreen />);

      expect(screen.queryByTestId('loading-container')).toBeNull();
      expect(screen.queryByText(/Error:/)).toBeNull();
      expect(screen.queryByTestId('weather-tile-container')).toBeNull();
    });
  });

  describe('Search Functionality', () => {
    it('should enable search button when city name is entered', () => {
      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      fireEvent.changeText(searchField, 'London');

      const searchButton = screen.getByTestId('button');
      expect(searchButton.props.accessibilityState.disabled).toBe(false);
    });

    it('should disable search button when city name is empty', () => {
      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      fireEvent.changeText(searchField, 'London');
      fireEvent.changeText(searchField, '');

      const searchButton = screen.getByTestId('button');
      expect(searchButton.props.accessibilityState.disabled).toBe(true);
    });

    it('should call getWeatherForCity when search button is pressed', async () => {
      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      fireEvent.changeText(searchField, 'London');

      const searchButton = screen.getByTestId('button');
      await act(async () => {
        fireEvent.press(searchButton);
      });

      await waitFor(() => {
        expect(mockGetWeatherForCity).toHaveBeenCalledWith('London');
      });
    });

    it('should not call getWeatherForCity when search button is pressed with empty input', () => {
      renderWithProviders(<HomeScreen />);

      const searchButton = screen.getByTestId('button');
      fireEvent.press(searchButton);

      expect(mockGetWeatherForCity).not.toHaveBeenCalled();
    });

    it('should update filter state when typing in search field', () => {
      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      fireEvent.changeText(searchField, 'Paris');

      expect(searchField.props.value).toBe('Paris');
    });
  });

  describe('Loading State', () => {
    it('should show loading component when isLoading is true', () => {
      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: true,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.getByTestId('loading-container')).toBeTruthy();
    });

    it('should not show weather or error when loading', () => {
      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: true,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.queryByTestId('weather-tile-container')).toBeNull();
      expect(screen.queryByText(/Error:/)).toBeNull();
    });
  });

  describe('Error State', () => {
    it('should display error message when error occurs', () => {
      const mockError = new Error('City not found');
      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: mockError,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.getByText('Error: City not found')).toBeTruthy();
    });

    it('should not show loading or weather when error occurs', () => {
      const mockError = new Error('City not found');
      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: mockError,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.queryByTestId('loading-container')).toBeNull();
      expect(screen.queryByTestId('weather-tile-container')).toBeNull();
    });
  });

  describe('Weather Display', () => {
    it('should display weather tile when weather data is available', () => {
      // Mock the useWeatherContext hook
      const mockUseWeatherContext = require('@/hooks/useWeatherContext').useWeatherContext;
      mockUseWeatherContext.mockReturnValue({
        city: 'San Francisco',
        weather: mockWeatherData,
      });

      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.getByTestId('weather-tile-container')).toBeTruthy();
    });

    it('should not show loading or error when weather is displayed', () => {
      // Mock the useWeatherContext hook
      const mockUseWeatherContext = require('@/hooks/useWeatherContext').useWeatherContext;
      mockUseWeatherContext.mockReturnValue({
        city: 'San Francisco',
        weather: mockWeatherData,
      });

      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      expect(screen.queryByTestId('loading-container')).toBeNull();
      expect(screen.queryByText(/Error:/)).toBeNull();
    });

    it('should initialize filter with current city from context', () => {
      // Mock the useWeatherContext hook
      const mockUseWeatherContext = require('@/hooks/useWeatherContext').useWeatherContext;
      mockUseWeatherContext.mockReturnValue({
        city: 'Tokyo',
        weather: mockWeatherData,
      });

      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      expect(searchField.props.value).toBe('Tokyo');
    });

    it('should initialize filter as empty string when no city in context', () => {
      // Mock the useWeatherContext hook
      const mockUseWeatherContext = require('@/hooks/useWeatherContext').useWeatherContext;
      mockUseWeatherContext.mockReturnValue({
        city: undefined,
        weather: mockWeatherData,
      });

      mockedUseGetCityWeather.mockReturnValue({
        getWeatherForCity: mockGetWeatherForCity,
        isLoading: false,
        error: undefined,
      });

      renderWithProviders(<HomeScreen />);

      const searchField = screen.getByTestId('search-field');
      expect(searchField.props.value).toBe('');
    });
  });
}); 