import LineChart from '@/components/v-02/templates/Chart';

import CityWeather from '../templates/CityWeather';
import Forecast from '../templates/Forecast';
import WeatherLocation from '../templates/WeatherLocation';

function WeatherData() {
	return (
		<>
			<div className=' w-full h-full mx-auto flex flex-col pt-4 gap-2'>
				<div className='flex flex-col gap-2 h-fit lg:flex lg:flex-row'>
					<div className='lg:w-2/3 min-h-[350px]'>
						<CityWeather />
					</div>
					<div className='lg:w-1/3 min-h-[350px]'>
						<WeatherLocation />
					</div>
				</div>
				<div className='flex flex-col gap-2 h-fit lg:flex lg:flex-row pb-5'>
					<div className='lg:w-2/3 lg:min-h-[350px]'>
						<LineChart />
					</div>
					<div className='lg:w-1/3 min-h-[350px]'>
						<Forecast />
					</div>
				</div>
			</div>
		</>
	);
}

export default WeatherData;
