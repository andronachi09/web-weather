import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { findCurrentWeatherLatLon } from '@/hooks/useGeocoding';
import { CurrentWeather } from '@/types/geocoding.types';

type WeatherContextType = {
	weather: CurrentWeather | null;
	setCurrentWeather: (weather: CurrentWeather) => void;
	error: string;
	setError: (error: string) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

const defaultWeatherContext: WeatherContextType = {
	weather: null,
	setCurrentWeather: () => {},
	error: '',
	setError: () => {},
	isLoading: false,
	setIsLoading: () => {},
};

export const WeatherContext = createContext<WeatherContextType>(
	defaultWeatherContext,
);

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
			setIsLoading(true);
			setError('');
			try {
				const fetchData = await findCurrentWeatherLatLon(lat, lon);
				if ('statusCode' in fetchData) {
					setError(`Error: ${fetchData.messageError}!`);
				} else {
					setCurrentWeather(fetchData);
				}
			} catch (error: unknown) {
				setError(`Failed to obtain data: ${error}`);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCurrentWeather();

		return () => {
			setCurrentWeather(null);
			setError('');
			setIsLoading(false);
		};
	}, [lat, lon]);

	const contextValue = useMemo(
		() => ({
			weather,
			setCurrentWeather,
			error,
			setError,
			isLoading,
			setIsLoading,
		}),
		[weather, error, isLoading],
	);

	return (
		<WeatherContext.Provider value={contextValue}>
			{children}
		</WeatherContext.Provider>
	);
};
