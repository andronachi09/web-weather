import { useEffect, useState } from 'react';
import SearchBar from '../molecules/SearchBar';
import SearchCityCardList from '../molecules/SearchCityCardList';
import { findLocationByGeocoding } from '../../../hooks/useGeocoding';
import { CityType } from '../../../types/city.types';

type SearchWithResultsProp = {
	className: string;
};

export default function SearchWithResults({
	className,
}: SearchWithResultsProp) {
	const [cities, setCities] = useState<CityType[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchCities = async () => {
			const result = await findLocationByGeocoding(searchTerm, 10);
			if ('statusCode' in result) {
				return error;
			} else if (!result || result.length === 0) {
				setError('No result found.');
				setCities([]);
			} else {
				setCities(
					result.map((city) => ({
						cityName: city.name,
						country: city.country,
						state: city.state,
						lat: city.lat,
						lon: city.lon,
					})),
				);
				setError('');
			}
		};

		fetchCities();
	}, [searchTerm, error, setError]);

	return (
		<div className={className}>
			<div>
				<SearchBar
					onSearch={setSearchTerm}
					onError={error}
					className='flex items-center justify-center w-96 rounded-xl bg-white'
				/>
			</div>
			<div
				className={`transform transition-all ease-out duration-1000 ${cities.length > 0 ? 'translate-y-0' : 'translate-y-4'}`}
			>
				<div className='flex flex-col justify-center pt-10'>
					<SearchCityCardList
						className='md:flex md:flex-col md:justify-center  lg:flex lg:flex-row lg:justify-center '
						cities={cities}
					/>
				</div>
			</div>
		</div>
	);
}
