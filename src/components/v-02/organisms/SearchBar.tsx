import { useContext } from 'react';
import { SearchContext } from '@/store/searchContext';

import InputField from '../atoms/InputField';
import ErrorMessage from '../atoms/ErrorMessage';
import SearchBarList from '../molecules/SearchBarMolecules/SearchBarList';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';

export default function SearchBar() {
	const searchContext = useContext(SearchContext);

	const handleEmptyLocationsList = () => {
		searchContext?.setInputText('');
		searchContext?.setLocations([]);
	};

	return (
		<div className='relative m-2 flex justify-center z-50'>
			<InputField
				type='text'
				placeholder=' Search for city or location'
				value={searchContext?.inputText}
				onChange={(e) => searchContext?.setInputText(e.target.value)}
				className='rounded-xl p-2 outline-none w-80 text-base'
			/>
			{searchContext?.inputText && (
				<Button
					onClick={() => searchContext?.setInputText('')}
					type='button'
					className='absolute inset-y-0 right-0 pr-6 lg:px-3 flex items-center text-[#1E1F24] hover:text-[#C6E6E8]'
				>
					<span className='text-base'>X</span>
				</Button>
			)}
			{searchContext?.inputText ? (
				<div className='absolute w-full top-9 bg-white shadow-md max-h-100 overflow-y-auto mt-1 border border-gray-200 rounded-xl'>
					{searchContext.isLoading ? (
						<Spinner className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
					) : searchContext?.error ? (
						<ErrorMessage error={searchContext?.error} />
					) : searchContext?.locations.length > 0 ? (
						<SearchBarList
							locations={searchContext?.locations}
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
