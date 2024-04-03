import { useState } from 'react';
import CityWeather from '../templates/CityWeather';
import Header from '../templates/Header';
import WeatherLocation from '../templates/WeatherLocation';
import LineChart from '@/components/v-02/templates/Chart';
import Forecast from '../templates/Forecast';
import { WeatherProvider } from '@/store/weatherContext';

export default function MainView() {
	const [longitude, setLongitude] = useState<number | null>(null);
	const [latitude, setLatitude] = useState<number | null>(null);
	const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;

	const handleCoordinates = (lat: number, lon: number) => {
		setLongitude(lon);
		setLatitude(lat);
	};

	return (
		<>
			<WeatherProvider lat={latitude} lon={longitude} apiKey={apiKey}>
				<div className='w-full h-screen'>
					<div className='max-w-[1240px] w-full h-full mx-auto flex flex-col pt-4 gap-2'>
						<Header onCoordinatesSelect={handleCoordinates} />
						<div className='flex flex-col gap-2 h-fit lg:flex lg:flex-row'>
							<div className='lg:w-2/3 min-h-[350px]'>
								<CityWeather />
							</div>
							<div className='lg:w-1/3 min-h-[350px]'>
								<WeatherLocation
									lat={latitude!}
									lon={longitude!}
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2 h-fit lg:flex lg:flex-row pb-5'>
							<div className='lg:w-2/3 lg:min-h-[350px]'>
								<LineChart />
							</div>
							<div className='lg:w-1/3 min-h-[350px]'>
								<Forecast />
							</div>
						</div>
					</div>
				</div>
			</WeatherProvider>
		</>
	);
}
