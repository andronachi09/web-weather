import { useEffect, useState } from 'react';

import { findLocationByGeocoding } from '../../../hooks/useGeocoding';

import InputField from '../atoms/InputField';
import ErrorMessage from '../atoms/ErrorMessage';
import SearchBarList from '../molecules/SearchBarList';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';

import { validateAndSanitizeSearchInput } from '../../../utils/validateSearchInput';
import { GeocodingResponse } from '../../../types/geocoding.types';

type SearchBarProps = {
	apiKey: string;
};

export default function SearchBar({ apiKey }: SearchBarProps) {
	const [inputText, setInputText] = useState<string>('');
	const [locations, setLocations] = useState<GeocodingResponse[]>([]);
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
					apiKey,
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
			} catch (error) {
				/* empty */
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
		<div className='relative m-2 flex justify-center'>
			<InputField
				type='text'
				placeholder=' Search for city or location'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				className='rounded-xl p-2 outline-none w-80 text-base'
			/>
			{inputText && (
				<Button
					onClick={() => setInputText('')}
					type='button'
					className='absolute inset-y-0 right-0 px-3 flex items-center text-[#1E1F24] hover:text-[#C6E6E8]'
				>
					<span className='text-base'>X</span>
				</Button>
			)}
			{inputText ? (
				<div className='absolute w-full top-9 bg-white shadow-md max-h-100 overflow-y-auto mt-1 border border-gray-200 rounded-xl'>
					{isLoading ? (
						<Spinner />
					) : error ? (
						<ErrorMessage error={error} />
					) : locations.length > 0 ? (
						<SearchBarList locations={locations} />
					) : (
						''
					)}
				</div>
			) : (
				''
			)}
		</div>
	);
}
