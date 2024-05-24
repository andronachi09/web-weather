import { useContext } from 'react';import SearchBar from '../organisms/SearchBar';
import { getDate } from '../../../utils/getDate';
import { WeatherContext } from '@/store/weatherContext';
import Button from '../atoms/Button';

export default function Header() {
	const date = getDate();
	const weatherContext = useContext(WeatherContext);

	return (
		<div className='bg-[#2E2E38] flex flex-col justify-items-center p-6 rounded-xl md:flex md:flex-row md:justify-between'>
			<div>
				<h1 className='flex justify-center text-2xl text-gray-200 m-2'>
					{date}
				</h1>
				<div className='flex justify-center'>
					{weatherContext.weather ? (
						<Button
							className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8] hover:text-black hover:rounded-3xl transition duration-500 ease-in-out mx-auto mr-6'
							onClick={() =>
								weatherContext.setCurrentWeather(null)
							}
						>
							Clear location
						</Button>
					) : (
						<></>
					)}
				</div>
			</div>
			<SearchBar />
		</div>
	);
}
