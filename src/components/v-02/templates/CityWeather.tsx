import React, { useEffect, useState } from 'react';
import { CurrentWeather } from '../../../types/geocoding.types';
import { findCurrentWeatherLatLon } from '../../../hooks/useGeocoding';

type CityWeatherProps = {
	lat: number;
	lon: number;
	apiKey: string;
};

export default function CityWeather({ lat, lon, apiKey }: CityWeatherProps) {
	const [weatherInfo, setWeatherInfo] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchCurrentWeather = async () => {
			try {
				const fetchData = await findCurrentWeatherLatLon(
					lat!,
					lon!,
					apiKey!,
				);
				if ('statusCode' in fetchData) {
					setError(`Error: ${fetchData.messageError}!`);
				} else {
					setWeatherInfo(fetchData);
					setError('');
				}
			} catch (error) {
				setError(`Failed to obtain data: ${error}`);
			}
		};

		fetchCurrentWeather();
	}, [lat, lon, apiKey]);

	console.log('Weather: ', weatherInfo);

	return (
		<div className='flex flex-col justify-start p-6 rounded-xl bg-[#2E2E38]'>
			<div className='flex flex-row space-x-10'>
				{/* <h1>Icon</h1>
				<h1>City name: {weatherInfo?.place}</h1> */}
			</div>
		</div>
	);
}
