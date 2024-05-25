import { useContext } from 'react';
import { WeatherContext } from '@/store/weatherContext';
import Spinner from '../atoms/Spinner';

function CityCard() {
	const weatherContext = useContext(WeatherContext);

	return (
		<>
			<div className='mt-2 px-3 rounded-xl bg-[#2E2E38]'>
				{weatherContext.isLoading ? (
					<Spinner className='animate-spin rounded-full h-10 w-10 border-b-2 border-grey-100 flex justify-center' />
				) : (
					<div className='flex flex-col'>
						<div className='flex flex-row justify-between'>
							<h2 className='text-2xl text-gray-200 mt-9 ml-4'>
								{weatherContext?.weather?.place}
							</h2>
							<div className=''>
								{weatherContext?.weather?.weatherDescription.map(
									(weather) => (
										<img
											key={weather.id}
											src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
											alt={weather.description}
										/>
									),
								)}
							</div>
						</div>
						<div className='flex flex-row justify-center space-x-10 mb-8'>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1'>
									{Math.round(
										weatherContext?.weather?.temperature
											.current as number,
									)}
									°
								</h2>
								<p className='text-gray-100 m-1'>Temperature</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{
										weatherContext?.weather?.atmosphere
											.humidity
									}
									<p className='text-sm pt-2.5'>%</p>
								</h2>
								<p className='text-gray-100 m-1'>Humidity</p>
							</div>
							<div className='flex flex-col pt-2'>
								<h2 className='text-2xl text-gray-200 m-1 flex flex-row'>
									{weatherContext?.weather?.windspeed}
									<p className='text-sm pt-2.5'>km/h</p>
								</h2>
								<p className='text-gray-100 m-1'>Wind speed</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default CityCard;
