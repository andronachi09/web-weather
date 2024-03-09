import { GeocodingResponse } from '../../../types/geocoding.types';
import SearchResult from './SearchResult';

type SearchBarListProps = {
	locations: GeocodingResponse[];
};

export default function SearchBarList({ locations }: SearchBarListProps) {
	return (
		<ul>
			{locations.map(({ name, country, state }, index) => (
				<li
					key={index}
					className='p-2 hover:bg-[#C6E6E8] cursor-pointer'
				>
					<SearchResult name={name} country={country} state={state} />
				</li>
			))}
		</ul>
	);
}
