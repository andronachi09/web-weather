import { useContext } from 'react';
import { WeatherContext, WeatherProvider } from '@/store/weatherContext';
import { SearchContext } from '@/store/searchContext';

import Header from '../templates/Header';
import Spinner from '../atoms/Spinner';
import CitiesCard from '../templates/CitiesCard';
import WeatherData from '../organisms/WeatherData';

export default function MainView() {
	const searchContext = useContext(SearchContext);

	return (
		<WeatherProvider
			lat={searchContext?.selectedLocation?.lat as number}
			lon={searchContext?.selectedLocation?.lon as number}
		>
			<MainContent />
		</WeatherProvider>
	);
}

function MainContent() {
	const { isLoading, weather } = useContext(WeatherContext) || {};

	return (
		<div className='w-full h-screen'>
			<div className='max-w-[1240px] w-full h-full mx-auto pt-4 gap-2'>
				<Header />
				<>
					{!isLoading && !weather && <CitiesCard />}
					{isLoading ? (
						<Spinner className='animate-spin rounded-full h-10 w-10 border-b-2 border-grey-100 mt-10' />
					) : (
						weather && <WeatherData />
					)}
				</>
			</div>
		</div>
	);
}
