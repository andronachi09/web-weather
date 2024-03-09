import { useState } from 'react';
import CityWeather from '../templates/CityWeather';
import Header from '../templates/Header';

export default function MainView() {
	const [longitude, setLongitude] = useState<number>(0);
	const [latitude, setLatitude] = useState<number>(0);
	const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;

	const handleCoordinates = (lat: number, lon: number) => {
		setLongitude(lon);
		setLatitude(lat);
	};

	console.log(longitude, latitude);

	return (
		<div className='w-full h-screen bg-[#1E1F24]'>
			<div className='max-w-[1240px] w-full h-full mx-auto flex flex-col pt-4 gap-2'>
				<Header onCoordinatesSelect={handleCoordinates} />
				<CityWeather lat={latitude} lon={longitude} apiKey={apiKey} />
			</div>
		</div>
	);
}
