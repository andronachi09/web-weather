import { useEffect, useState } from 'react';
import { GeocodingResponse } from '../../../types/geocoding.types';
import { validateAndSanitizeSearchInput } from '../../../utils/validateSearchInput';
import { findLocationByGeocoding } from '../../../hooks/useGeocoding';
import InputField from '../atoms/InputField';
import ErrorMessage from '../atoms/ErrorMessage';

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
				<button
					onClick={() => setInputText('')}
					type='button'
					className='absolute inset-y-0 right-0 pr-3 flex items-center text-[#1E1F24] hover:text-[#C6E6E8]'
				>
					{/* Replace "X" with an icon or SVG for better styling if preferred */}
					<span className='text-base'>X</span>
				</button>
			)}
			{inputText ? (
				<div className='absolute w-full top-9 bg-white shadow-md max-h-100 overflow-y-auto mt-1 border border-gray-200 rounded-xl'>
					{isLoading ? (
						// Loading state
						<div className='flex justify-center items-center p-4'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
						</div>
					) : error ? (
						// Error state
						<div>{error && <ErrorMessage error={error} />}</div>
					) : locations.length > 0 ? (
						// Results list
						<ul>
							{locations.map((location, index) => (
								<li
									key={index}
									className='p-2 hover:bg-[#C6E6E8] cursor-pointer'
								>
									{location.name}, {location.country}
									{location.state
										? `, ${location.state}`
										: ''}
								</li>
							))}
						</ul>
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
