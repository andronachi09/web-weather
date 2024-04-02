import { useState } from 'react';
import Button from '../atoms/Button';
import { CurrentWeather } from '@/types/geocoding.types';
import { ScrollArea } from '@/components/ui/scroll-area';

type ForecastProps = {
	currentWeather: CurrentWeather;
};

export default function Forecast({ currentWeather }: ForecastProps) {
	const [forecastDuration, setForecastDuration] = useState(3);

	const handleThreeDayClick = () => {
		setForecastDuration(3);
	};

	const handleEightDayClick = () => {
		setForecastDuration(8);
	};

	return (
		<div className='p-6 rounded-xl bg-[#2E2E38] h-full'>
			<div className='flex flex-row justify-between'>
				<div>
					<h1 className='text-3xl text-gray-200 mt-1'>Forecast</h1>
				</div>
				<div className='flex flex-row p-1 mb-2 bg-[#1e1f24] rounded-3xl'>
					<Button
						className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8]	hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'
						onClick={handleThreeDayClick}
					>
						3 days
					</Button>
					<Button
						className='text-[#C6E6E8] p-2 rounded-3xl hover:bg-[#C6E6E8]	hover:text-black hover:rounded-3xl transition duration-500 ease-in-out'
						onClick={handleEightDayClick}
					>
						8 days
					</Button>
				</div>
			</div>
			<ScrollArea className='lg:h-96 rounded-md hide-scrollbar pt-3'>
				{currentWeather.daily.slice(0, forecastDuration).map((day) => (
					<>
						<div className='flex flex-row justify-between p-1 mx-3  mb-2 bg-[#1e1f24] rounded-3xl'>
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
					</>
				))}
			</ScrollArea>
		</div>
	);
}
