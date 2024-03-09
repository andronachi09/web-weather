import { GeocodingResponse } from '../../../types/geocoding.types';
import SearchResult from './SearchResult';

type SearchBarListProps = {
	locations: GeocodingResponse[];
	onCoordinatesSelect: (lat: number, lon: number) => void;
};

export default function SearchBarList({
	locations,
	onCoordinatesSelect,
}: SearchBarListProps) {
	return (
		<ul>
			{locations.map(({ name, country, state, lat, lon }, index) => (
				<li
					key={index}
					className='p-2 hover:bg-[#C6E6E8] cursor-pointer'
				>
					<SearchResult
						key={index}
						name={name}
						country={country}
						state={state}
						lat={lat}
						lon={lon}
						onClick={onCoordinatesSelect}
					/>
				</li>
			))}
		</ul>
	);
}
