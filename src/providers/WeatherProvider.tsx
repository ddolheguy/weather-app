import { useStoreState } from "@/hooks/useStoreState";
import { CityWeather } from "@/services/api/types/weartherTypes";
import { createContext, PropsWithChildren } from "react";

type WeatherContextType = {
  city?: string;
  setCity: (city: string) => void;
  weather?: CityWeather;
  setWeather: (weather: CityWeather | undefined) => void;
};

export const WeatherContext = createContext<WeatherContextType>({
  city: undefined,
  setCity: () => {},
  weather: undefined,
  setWeather: () => {},
});

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [city, setCity] = useStoreState<string>('city');
  const [weather, setWeather] = useStoreState<CityWeather | undefined>('weather');

  return (
    <WeatherContext.Provider value={{ city, setCity, weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  )
}
