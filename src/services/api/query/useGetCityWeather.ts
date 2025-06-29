import { useWeatherContext } from "@/hooks/useWeatherContext";
import axios from "axios";
import { useCallback, useState } from "react";
import { CityWeather } from "../types/weartherTypes";

const getCityWeather = async (city: string) => {
  const { data } = await axios.get<CityWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`);
  return data;
};

export const useGetCityWeather = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { setCity, setWeather } = useWeatherContext();

  const getWeatherForCity = useCallback(async (city: string) => {
    try {
      setIsLoading(true);
      setCity(city);
      setWeather(undefined);
      setError(undefined);

      const data = await getCityWeather(city);
      setWeather(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setCity, setWeather]);

  return {
    isLoading,
    error,
    getWeatherForCity,
  }
};
