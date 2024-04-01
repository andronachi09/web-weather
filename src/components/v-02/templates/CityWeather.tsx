import { useEffect, useState } from 'react';import { CurrentWeather } from '../../../types/geocoding.types';
import { findCurrentWeatherLatLon } from '../../../hooks/useGeocoding';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

type CityWeatherProps = {
	lat: number;
	lon: number;
	apiKey: string;
	setWeatherData: (weather: CurrentWeather) => void;
};

export default function CityWeather({
	lat,
	lon,
	apiKey,
	setWeatherData,
}: CityWeatherProps) {
	const [weatherInfo, setWeatherInfo] = useState<CurrentWeather | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (lat == null && lon == null) {
			return;
		}

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
					setWeatherData(fetchData); //for parent component
					setError('');
				}
			} catch (error) {
				setError(`Failed to obtain data: ${error}`);
			}
		};

		fetchCurrentWeather();
	}, [lat, lon, apiKey]);

	return (
		<div>
			{error && <p className='bg-grey-500 text-red-500'>{error}</p>}
			{weatherInfo ? (
				<div className='flex flex-col justify-start p-6 rounded-xl bg-[#2E2E38]'>
					<div className='flex flex-col space-x-5 justify-evenly sm:flex sm:flex-row sm:justify-evenly'>
						<div className='flex flex-row'>
							<div>
								{weatherInfo?.weatherDescription.map(
									(weather) => (
										<img
											key={weather.id}
											src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
											alt={weather.description}
										/>
									),
								)}
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1'>
									{weatherInfo?.place}
								</h2>
								<p className='text-xl text-gray-100 m-1'>
									Timezone: {weatherInfo?.timezone}
								</p>
							</div>
						</div>
						<div className='flex flex-row space-x-5 justify-evenly lg:flex lg:flex-row lg:justify-between'>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1'>
									{Math.round(
										weatherInfo?.temperature
											.current as number,
									)}
									°
								</h2>
								<p className='text-gray-100 m-1'>Temperature</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{weatherInfo?.atmosphere.humidity}
									<p className='text-sm pt-2.5'>%</p>
								</h2>
								<p className='text-gray-100 m-1'>Humidity</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{weatherInfo?.windspeed}
									<p className='text-sm pt-2.5'>km/h</p>
								</h2>
								<p className='text-gray-100 m-1'>Wind speed</p>
							</div>
						</div>
					</div>
					<div className='py-10 flex flex-col justify-center'>
						<Carousel className='mx-6 lg:max-w-3xl'>
							<CarouselContent>
								{weatherInfo?.hourly.map((h, index) => (
									<CarouselItem
										key={index}
										className='basis-1/7'
									>
										<div className='rounded-3xl bg-[#C6E6E8] w-28 p-4 flex flex-col items-center'>
											<h2>{h.time}</h2>
											<img
												src={`https://openweathermap.org/img/wn/${h.icon}@2x.png`}
												alt={'Weather Icon'}
												className='w-16 h-16'
											/>
											<h2>
												{Math.round(h.temperature)}°
											</h2>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className='ml-2' />
							<CarouselNext className='mr-2' />
						</Carousel>
					</div>
				</div>
			) : (
				!error && <h1></h1>
			)}
		</div>
	);
}
