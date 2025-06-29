import { useWeatherContext } from '@/hooks/useWeatherContext';
import { act, renderHook } from '@testing-library/react-native';
import axios from 'axios';
import { CityWeather } from '../../types/weartherTypes';
import { useGetCityWeather } from '../useGetCityWeather';

jest.mock('axios');
jest.mock('@/hooks/useWeatherContext');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedUseWeatherContext = useWeatherContext as jest.MockedFunction<typeof useWeatherContext>;

describe('useGetCityWeather', () => {
  const mockSetCity = jest.fn();
  const mockSetWeather = jest.fn();

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

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseWeatherContext.mockReturnValue({
      city: undefined,
      setCity: mockSetCity,
      weather: undefined,
      setWeather: mockSetWeather,
    });
  });

  describe('getWeatherForCity', () => {
    it('should fetch weather data successfully and update context', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();

      await act(async () => {
        await result.current.getWeatherForCity('San Francisco');
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=undefined'
      );

      expect(mockSetCity).toHaveBeenCalledWith('San Francisco');
      expect(mockSetWeather).toHaveBeenCalledWith(mockWeatherData);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    it('should handle API errors and set error state', async () => {
      const mockError = new Error('City not found');
      mockedAxios.get.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('InvalidCity');
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=InvalidCity&appid=undefined'
      );

      expect(mockSetCity).toHaveBeenCalledWith('InvalidCity');
      expect(mockSetWeather).toHaveBeenCalledWith(undefined);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(mockError);
    });

    it('should set loading state correctly during API call', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockedAxios.get.mockReturnValueOnce(promise);

      const { result } = renderHook(() => useGetCityWeather());

      act(() => {
        result.current.getWeatherForCity('San Francisco');
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolvePromise!({ data: mockWeatherData });
        await promise;
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should clear previous weather data and error when starting new request', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      act(() => {
        result.current.getWeatherForCity('InvalidCity');
      });

      // Simulate an error first
      mockedAxios.get.mockRejectedValueOnce(new Error('First error'));
      await act(async () => {
        try {
          await result.current.getWeatherForCity('InvalidCity');
        } catch (error) {
          // Expected error
        }
      });

      expect(result.current.error).toBeDefined();

      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });
      await act(async () => {
        await result.current.getWeatherForCity('San Francisco');
      });

      expect(result.current.error).toBeUndefined();
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      mockedAxios.get.mockRejectedValueOnce(networkError);

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('San Francisco');
      });

      expect(result.current.error).toBe(networkError);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle axios response errors', async () => {
      const axiosError = {
        response: {
          status: 404,
          data: { message: 'City not found' }
        }
      };
      mockedAxios.get.mockRejectedValueOnce(axiosError);

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('NonExistentCity');
      });

      expect(result.current.error).toBe(axiosError);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle empty city name', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('');
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=&appid=undefined'
      );
      expect(mockSetCity).toHaveBeenCalledWith('');
    });

    it('should handle city names with special characters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('São Paulo');
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=undefined'
      );
      expect(mockSetCity).toHaveBeenCalledWith('São Paulo');
    });
  });

  describe('return values', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useGetCityWeather());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
      expect(typeof result.current.getWeatherForCity).toBe('function');
    });

    it('should maintain stable function reference', () => {
      const { result, rerender } = renderHook(() => useGetCityWeather());

      const firstReference = result.current.getWeatherForCity;

      rerender({});

      expect(result.current.getWeatherForCity).toBe(firstReference);
    });
  });

  describe('context integration', () => {
    it('should call context functions with correct parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('New York');
      });

      expect(mockSetCity).toHaveBeenCalledWith('New York');
      expect(mockSetWeather).toHaveBeenCalledWith(mockWeatherData);
    });

    it('should clear weather data when starting new request', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const { result } = renderHook(() => useGetCityWeather());

      await act(async () => {
        await result.current.getWeatherForCity('London');
      });

      expect(mockSetWeather).toHaveBeenNthCalledWith(1, undefined);
      expect(mockSetWeather).toHaveBeenNthCalledWith(2, mockWeatherData);
    });
  });
}); 