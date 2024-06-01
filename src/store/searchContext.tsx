import { ReactNode, useEffect, useState } from 'react';import { createContext } from 'use-context-selector';
import { findLocationByGeocoding } from '@/hooks/useGeocoding';
import { GeocodingResponse } from '@/types/geocoding.types';
import { validateAndSanitizeSearchInput } from '@/utils/validateSearchInput';

type SearchContextType = {
	inputText: string;
	setInputText: (inputText: string) => void;
	locations: GeocodingResponse[];
	setLocations: (Locations: GeocodingResponse[]) => void;
	error: string;
	setError: (error: string) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
	selectedLocation: { lat: number; lon: number } | null;
	setSelectedLocation: (location: { lat: number; lon: number }) => void;
};

const defaultSearchContext: SearchContextType = {
	inputText: '',
	setInputText: () => {},
	locations: [],
	setLocations: () => {},
	error: '',
	setError: () => {},
	isLoading: false,
	setIsLoading: () => {},
	selectedLocation: null,
	setSelectedLocation: () => {},
};

export const SearchContext = createContext<SearchContextType | null>(
	defaultSearchContext,
);

type SearchProviderProps = {
	children?: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const [inputText, setInputText] = useState<string>('');
	const [locations, setLocations] = useState<GeocodingResponse[]>([]);
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedLocation, setSelectedLocation] = useState<{
		lat: number;
		lon: number;
	} | null>(null);

	useEffect(() => {
		const fetchLocations = async () => {
			const { message, isValid } =
				validateAndSanitizeSearchInput(inputText);

			if (!isValid) {
				setError(message);
				setLocations([]);
				setIsLoading(false);
				return;
			}

			try {
				const fetchResponse = await findLocationByGeocoding(
					message,
					10,
				);
				if ('statusCode' in fetchResponse) {
					return error;
				} else if (!fetchResponse || fetchResponse.length === 0) {
					setError('No results have been found');
					setLocations([]);
					setIsLoading(false);
				} else {
					setLocations(fetchResponse);
					setError('');
					setIsLoading(false);
				}
			} catch (error: unknown) {
				setError(`Failed to find results: ${error}`);
			}
		};

		if (inputText) {
			setIsLoading(true);
			const debounce = setTimeout(fetchLocations, 500);
			return () => {
				clearTimeout(debounce);
			};
		} else {
			setLocations([]);
			setError('');
			setIsLoading(false);
		}
	}, [inputText]);

	return (
		<SearchContext.Provider
			value={{
				inputText,
				setInputText,
				locations,
				setLocations,
				error,
				setError,
				isLoading,
				setIsLoading,
				selectedLocation,
				setSelectedLocation,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
