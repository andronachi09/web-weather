import { WeatherContext, WeatherProvider } from '@/store/weatherContext';import { SearchContext } from '@/store/searchContext';

import Header from '../templates/Header';
import Spinner from '../atoms/Spinner';
import CitiesCard from '../templates/CitiesCard';
import WeatherData from '../organisms/WeatherData';
import { useContextSelector } from 'use-context-selector';

export default function MainView() {
	const selectedLocation = useContextSelector(
		SearchContext,
		(state) => state?.selectedLocation,
	);

	return (
		<WeatherProvider
			lat={selectedLocation?.lat as number}
			lon={selectedLocation?.lon as number}
		>
			<MainContent />
		</WeatherProvider>
	);
}

function MainContent() {
	const isLoading = useContextSelector(
		WeatherContext,
		(state) => state.isLoading,
	);
	const weather = useContextSelector(
		WeatherContext,
		(state) => state.weather,
	);

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
