import { ReactNode, createContext, useEffect, useState } from 'react';import { findCurrentWeatherLatLon } from '@/hooks/useGeocoding';
import { CurrentWeather } from '@/types/geocoding.types';

type WeatherContextType = {
	weather: CurrentWeather | null;
	setCurrentWeather: (weather: CurrentWeather) => void;
	error: string;
	setError: (error: string) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

type WeatherProviderProps = {
	children?: ReactNode;
	lat: number;
	lon: number;
};

export const WeatherProvider = ({
	children,
	lat,
	lon,
}: WeatherProviderProps) => {
	const [weather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (lat == null && lon == null) {
			return;
		}

		const fetchCurrentWeather = async () => {
			try {
				setIsLoading(true);
				const fetchData = await findCurrentWeatherLatLon(lat!, lon!);
				if ('statusCode' in fetchData) {
					setError(`Error: ${fetchData.messageError}!`);
				} else {
					setCurrentWeather(fetchData);
					setError('');
				}
			} catch (error) {
				setError(`Failed to obtain data: ${error}`);
			} finally {
				// setTimeout(() => {
				setIsLoading(false);
				// }, 2000);
			}
		};

		fetchCurrentWeather();
	}, [lat, lon]);

	return (
		<WeatherContext.Provider
			value={{
				weather,
				setCurrentWeather,
				error,
				setError,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};
