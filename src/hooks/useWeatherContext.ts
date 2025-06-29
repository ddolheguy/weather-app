import { WeatherContext } from '@/providers/WeatherProvider';
import { useContext } from 'react';

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
}
