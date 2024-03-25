import { useState } from 'react';
import CityWeather from '../templates/CityWeather';
import Header from '../templates/Header';
import WeatherLocation from '../templates/WeatherLocation';

export default function MainView() {
	const [longitude, setLongitude] = useState<number | null>(null);
	const [latitude, setLatitude] = useState<number | null>(null);
	const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;

	const handleCoordinates = (lat: number, lon: number) => {
		setLongitude(lon);
		setLatitude(lat);
	};

	return (
		<div className='w-full h-screen bg-[#1E1F24]'>
			<div className='max-w-[1240px] w-full h-full mx-auto flex flex-col pt-4 gap-2'>
				<Header onCoordinatesSelect={handleCoordinates} />
				{latitude && longitude && (
					<div className='flex flex-col gap-2  h-fit lg:flex lg:flex-row'>
						<div className='w-full lg:w-2/3 min-h-[350px]'>
							<CityWeather
								lat={latitude!}
								lon={longitude!}
								apiKey={apiKey}
							/>
						</div>
						<div className='w-full lg:w-1/3 min-h-[350px]'>
							<WeatherLocation lat={latitude!} lon={longitude!} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
