import { useContext } from 'react';import { WeatherContext } from '@/store/weatherContext';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

export default function CityWeather() {
	const weather = useContext(WeatherContext);

	return (
		<div>
			{weather?.error && (
				<p className='bg-grey-500 text-red-500'>{weather.error}</p>
			)}
			{weather?.weather ? (
				<div className='flex flex-col justify-start p-6 rounded-xl bg-[#2E2E38]'>
					<div className='flex flex-col space-x-5 justify-evenly sm:flex sm:flex-row sm:justify-evenly'>
						<div className='flex flex-row'>
							<div>
								{weather.weather?.weatherDescription.map(
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
									{weather.weather?.place}
								</h2>
								<p className='text-xl text-gray-100 m-1'>
									Timezone: {weather.weather?.timezone}
								</p>
							</div>
						</div>
						<div className='flex flex-row space-x-5 justify-evenly lg:flex lg:flex-row lg:justify-between'>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1'>
									{Math.round(
										weather.weather?.temperature
											.current as number,
									)}
									°
								</h2>
								<p className='text-gray-100 m-1'>Temperature</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{weather.weather?.atmosphere.humidity}
									<p className='text-sm pt-2.5'>%</p>
								</h2>
								<p className='text-gray-100 m-1'>Humidity</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{weather.weather?.windspeed}
									<p className='text-sm pt-2.5'>km/h</p>
								</h2>
								<p className='text-gray-100 m-1'>Wind speed</p>
							</div>
						</div>
					</div>
					<div className='py-10 flex flex-col justify-center'>
						<Carousel className='px-10 lg:max-w-3xl'>
							<CarouselContent>
								{weather.weather?.hourly.map((h, index) => (
									<CarouselItem
										key={index}
										className='basis-1/11'
									>
										<div className='rounded-3xl bg-[#C6E6E8] w-24 p-4 flex flex-col items-center'>
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
							<CarouselPrevious className='ml-10' />
							<CarouselNext className='mr-10' />
						</Carousel>
					</div>
				</div>
			) : (
				!weather?.error && <h1></h1>
			)}
		</div>
	);
}
