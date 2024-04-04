import { ReactNode, createContext, useEffect, useState } from 'react';import { findCurrentWeatherLatLon } from '@/hooks/useGeocoding';
import { CurrentWeather } from '@/types/geocoding.types';

type WeatherContextType = {
	weather: CurrentWeather | null;
	setCurrentWeather: (weather: CurrentWeather) => void;
	error: string;
	setError: (error: string) => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

type WeatherProviderProps = {
	children?: ReactNode;
	lat: number;
	lon: number;
	apiKey: string;
};

export const WeatherProvider = ({
	children,
	lat,
	lon,
	apiKey,
}: WeatherProviderProps) => {
	const [weather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (lat == null && lon == null) {
			return;
		}

		const fetchCurrentWeather = async () => {
			try {
				const fetchData = await findCurrentWeatherLatLon(
					lat!,
					lon!,
					apiKey!,
				);
				if ('statusCode' in fetchData) {
					setError(`Error: ${fetchData.messageError}!`);
				} else {
					setCurrentWeather(fetchData);
					setError('');
				}
			} catch (error) {
				setError(`Failed to obtain data: ${error}`);
			}
		};

		fetchCurrentWeather();
	}, [lat, lon, apiKey]);

	return (
		<WeatherContext.Provider
			value={{ weather, setCurrentWeather, error, setError }}
		>
			{children}
		</WeatherContext.Provider>
	);
};
