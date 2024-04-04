import { useContext } from 'react';
import { SearchContext } from '@/store/searchContext';

type SearchResultProps = {
	name: string;
	country: string;
	state?: string;
	lat: number;
	lon: number;
	onClose: () => void;
};

export default function SearchResult({
	name,
	country,
	state,
	lat,
	lon,
	onClose,
}: SearchResultProps) {
	const searchContext = useContext(SearchContext);

	return (
		<div onClick={() => searchContext?.setSelectedLocation({ lat, lon })}>
			<div onClick={() => onClose()}>
				{name}, {country} {state ? `, ${state}` : ''}
			</div>
		</div>
	);
}
