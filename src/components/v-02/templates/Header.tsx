import { useState } from 'react';
import { getDate } from '../../../utils/getDate';
import SearchBar from '../organisms/SearchBar';

type HeaderProps = {
	onCoordinatesSelect: (lat: number, lon: number) => void;
};

export default function Header({ onCoordinatesSelect }: HeaderProps) {
	const [date, setDate] = useState<string>(getDate());

	return (
		<div className='bg-[#2E2E38] flex flex-col justify-items-center p-6 rounded-xl md:flex md:flex-row md:justify-between'>
			<h1 className='flex justify-center text-2xl text-gray-200 m-2'>
				{date}
			</h1>
			<SearchBar
				apiKey={import.meta.env.VITE_WEATHER_API_KEY}
				onCoordinatesSelect={onCoordinatesSelect}
			/>
		</div>
	);
}
