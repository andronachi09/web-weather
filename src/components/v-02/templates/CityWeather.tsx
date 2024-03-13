import React from 'react';

type CityWeatherProps = {
	lat: number;
	lon: number;
	apiKey: string;
};

export default function CityWeather({ lat, lon, apiKey }: CityWeatherProps) {
	return (
		<div className='flex flex-col justify-start p-6 rounded-xl bg-[#2E2E38]'>
			<div className='flex flex-row space-x-10'>
				<h1>Icon</h1>
				<h1>
					City name: {lat} and {lon}
				</h1>
			</div>
		</div>
	);
}
