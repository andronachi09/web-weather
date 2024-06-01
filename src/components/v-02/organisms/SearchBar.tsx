import { SearchContext } from '@/store/searchContext';import InputField from '../atoms/InputField';
import ErrorMessage from '../atoms/ErrorMessage';
import SearchBarList from '../molecules/SearchBarMolecules/SearchBarList';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';
import { useContextSelector } from 'use-context-selector';
import { GeocodingResponse } from '@/types/geocoding.types';

export default function SearchBar() {
	const setInputText = useContextSelector(
		SearchContext,
		(state) => state?.setInputText,
	);
	const setLocations = useContextSelector(
		SearchContext,
		(state) => state?.setLocations,
	);
	const inputText = useContextSelector(
		SearchContext,
		(state) => state?.inputText,
	);
	const isLoading = useContextSelector(
		SearchContext,
		(state) => state?.isLoading,
	);
	const locations = useContextSelector(
		SearchContext,
		(state) => state?.locations,
	);

	const error = useContextSelector(SearchContext, (state) => state?.error);

	const handleEmptyLocationsList = () => {
		setInputText?.('');
		setLocations?.([]);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputText?.(e.target.value);
	};

	return (
		<div className='relative m-2 flex justify-center z-50'>
			<div className='flex flex-col lg:flex-row'>
				<InputField
					type='text'
					placeholder=' Search for city or location'
					value={inputText}
					onChange={handleInputChange}
					className='rounded-xl p-2 outline-none w-80 text-base'
				/>
			</div>
			{inputText && (
				<Button
					onClick={() => setInputText?.('')}
					type='button'
					className='absolute inset-y-0 right-0 pr-6 lg:px-3 flex items-center text-[#1E1F24] hover:text-[#C6E6E8]'
				>
					<span className='text-base'>X</span>
				</Button>
			)}
			{inputText ? (
				<div className='absolute w-full top-9 bg-white shadow-md max-h-100 overflow-y-auto mt-1 border border-gray-200 rounded-xl'>
					{isLoading ? (
						<Spinner className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
					) : error ? (
						<ErrorMessage error={error} />
					) : locations!.length > 0 ? (
						<SearchBarList
							locations={locations as GeocodingResponse[]}
							onClose={handleEmptyLocationsList}
						/>
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
