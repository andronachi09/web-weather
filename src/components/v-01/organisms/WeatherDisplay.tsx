import { useState, useEffect } from 'react';
import { findCurrentWeatherLatLon } from '../../../hooks/useGeocoding';
import { CurrentWeather } from '../../../types/geocoding.types';

type WeatherDisplayType = {
	lat: number;
	lon: number;
};

export default function WeatherDisplay({ lat, lon }: WeatherDisplayType) {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
		null,
	);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const fetchedData = await findCurrentWeatherLatLon(lat, lon);
				if ('statusCode' in fetchedData) {
					setError(`Error: ${fetchedData.messageError}`);
				} else {
					setCurrentWeather(fetchedData);
				}
			} catch (error) {
				setError('Failed to fetch weather data');
			}
		};
		fetchWeather();
	}, [lat, lon]);

	if (error) return <div>Error.</div>;
	if (!currentWeather) return <div>Loading...</div>;

	return (
		<div>
			<h2>Weather in {currentWeather.place}</h2>
			<p>Timezone: {currentWeather.timezone}</p>
			<p>
				Temperature: {currentWeather.temperature.current}°C, Feels like:{' '}
				{currentWeather.temperature.feelsLike}°C
			</p>
			<p>
				Sunrise: {currentWeather.sunrise}, Sunset:{' '}
				{currentWeather.sunset}
			</p>
			<p>
				Clouds: {currentWeather.atmosphere.clouds}%, Pressure:{' '}
				{currentWeather.atmosphere.pressure} hPa, Humidity:{' '}
				{currentWeather.atmosphere.humidity}%
			</p>
			<div>
				{currentWeather.daily.map((day, index) => (
					<div key={index}>
						<p>{day.maxTemp}</p>
						<p>{day.minTemp}</p>
						<p>{day.summary}</p>
					</div>
				))}
			</div>
		</div>
	);
}
