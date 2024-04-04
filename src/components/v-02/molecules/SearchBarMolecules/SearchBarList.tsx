import SearchResult from './SearchResult';
import { GeocodingResponse } from '../../../../types/geocoding.types';

type SearchBarListProps = {
	locations: GeocodingResponse[];
	onClose: () => void;
};

export default function SearchBarList({
	locations,
	onClose,
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
						onClose={onClose}
					/>
				</li>
			))}
		</ul>
	);
}
