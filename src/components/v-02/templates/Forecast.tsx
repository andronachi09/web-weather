import { CurrentWeather } from '@/types/geocoding.types';
import Button from '../atoms/Button';

type ForecastProps = {
	currentWeather: CurrentWeather;
};

export default function Forecast({ currentWeather }: ForecastProps) {
	return (
		<div className='p-6 rounded-xl bg-[#2E2E38]'>
			<div>
				<div className='flex flex-row justify-between'>
					<div>
						<h1 className='text-3xl text-gray-200 mt-2'>
							Forecast
						</h1>
					</div>
					<div className='flex flex-row p-1 mb-2 bg-[#1e1f24] rounded-3xl'>
						<Button className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8]	hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'>
							3 days
						</Button>
						<Button className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8]	hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'>
							8 days
						</Button>
					</div>
				</div>
				<div>
					{currentWeather.daily.map((day) => (
						<div className='flex flex-row justify-between p-1 mb-2 bg-[#1e1f24] rounded-3xl'>
							<div className='flex flex-row'>
								<img
									key={day.dt}
									src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
									alt={day.summary}
									className='w-16 h-16'
								/>
								<div className='flex flex-row mt-3'>
									<h2 className='text-3xl text-gray-200'>
										{Math.round(day.maxTemp)}°
									</h2>
									<h4 className='text-gray-200 pt-2.5'>
										/{Math.round(day.minTemp)}°
									</h4>
								</div>
							</div>
							<div className='mt-5 mr-2'>
								<h2 className='text-xl text-gray-200'>
									{new Date(day.dt * 1000).toLocaleDateString(
										'en-GB',
										{
											day: '2-digit',
											month: 'short',
											weekday: 'short',
										},
									)}
								</h2>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
