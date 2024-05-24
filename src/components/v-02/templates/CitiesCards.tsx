import { WeatherProvider } from '@/store/weatherContext';
import CityCard from '../molecules/CityCard';

const cities = [
	{ lat: 40.7128, lon: -74.006, id: '1' },
	{ lat: 34.0522, lon: -118.2437, id: '2' },
	{ lat: 51.5074, lon: -0.1278, id: '3' },
	{ lat: 35.6895, lon: 139.6917, id: '4' },
];

function CitiesCard() {
	return (
		<div className='mt-2 w-full gap-4 lg:grid lg:grid-cols-2 '>
			{cities.map((city) => (
				<WeatherProvider key={city.id} lat={city.lat} lon={city.lon}>
					<CityCard />
				</WeatherProvider>
			))}
		</div>
	);
}

export default CitiesCard;
