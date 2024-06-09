import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';import { findCurrentWeatherLatLon } from '@/hooks/useGeocoding';
import { CurrentWeather } from '@/types/geocoding.types';
import { createContext } from 'use-context-selector';
import { debounce } from '@/lib/utils';

type WeatherContextType = {
	weather: CurrentWeather | null;
	setCurrentWeather: (weather: CurrentWeather | null) => void;
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
	lat?: number;
	lon?: number;
};

const CACHE_KEY_PREFIX = 'weather_';
const CACHE_EXPIRATION_MS = 3600000;

const getCacheKey = (lat: number, lon: number) =>
	`${CACHE_KEY_PREFIX}${lat}_${lon}`;

const isCacheExpired = (timestamp: number) => {
	return Date.now() - timestamp > CACHE_EXPIRATION_MS;
};

export const WeatherProvider = ({
	children,
	lat,
	lon,
}: WeatherProviderProps) => {
	const [weather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const memoizedSetCurrentWeather = useCallback(setCurrentWeather, []);
	const memoizedSetError = useCallback(setError, []);
	const memoizedSetIsLoading = useCallback(setIsLoading, []);

	useEffect(() => {
		if (lat == null && lon == null) {
			return;
		}

		const cacheKey = getCacheKey(lat as number, lon as number);
		const cachedData = localStorage.getItem(cacheKey);
		const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

		if (
			cachedData &&
			cachedTimestamp &&
			!isCacheExpired(Number(cachedTimestamp))
		) {
			setCurrentWeather(JSON.parse(cachedData));
			return;
		}

		const fetchCurrentWeather = debounce(async () => {
			setIsLoading(true);
			setError('');
			try {
				const fetchData = await findCurrentWeatherLatLon(
					lat as number,
					lon as number,
				);
				if ('statusCode' in fetchData) {
					setError(`Error: ${fetchData.messageError}!`);
				} else {
					setCurrentWeather(fetchData);
					localStorage.setItem(cacheKey, JSON.stringify(fetchData));
					localStorage.setItem(
						`${cacheKey}_timestamp`,
						Date.now().toString(),
					);
				}
			} catch (error: unknown) {
				setError(`Failed to obtain data: ${error}`);
			} finally {
				setIsLoading(false);
			}
		}, 500);

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
			setCurrentWeather: memoizedSetCurrentWeather,
			error,
			setError: memoizedSetError,
			isLoading,
			setIsLoading: memoizedSetIsLoading,
		}),
		[
			weather,
			error,
			isLoading,
			memoizedSetCurrentWeather,
			memoizedSetError,
			memoizedSetIsLoading,
		],
	);

	return (
		<WeatherContext.Provider value={contextValue}>
			{children}
		</WeatherContext.Provider>
	);
};
