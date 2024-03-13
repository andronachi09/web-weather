import { useState } from 'react';
import CityWeather from '../templates/CityWeather';
import Header from '../templates/Header';
import React from 'react';

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
				<CityWeather lat={latitude} lon={longitude} apiKey={apiKey} />
			</div>
		</div>
	);
}
