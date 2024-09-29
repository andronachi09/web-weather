import { WeatherProvider } from '@/store/weatherContext';
import CityCard from '../molecules/CityCard';

const cities = [
	{ lat: 55.6761, lon: 12.5683, id: '1' },
	{ lat: 34.0522, lon: -118.2437, id: '2' },
	{ lat: 51.5074, lon: -0.1278, id: '3' },
	{ lat: 45.5019, lon: -73.5674, id: '4' },
	{ lat: 22.3193, lon: 114.1694, id: '5' },
	{ lat: -37.8136, lon: 144.9631, id: '6' },
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
