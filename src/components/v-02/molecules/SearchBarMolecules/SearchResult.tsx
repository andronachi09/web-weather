import { SearchContext } from '@/store/searchContext';
import { useContextSelector } from 'use-context-selector';

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
	const setSelectedLocation = useContextSelector(
		SearchContext,
		(state) => state?.setSelectedLocation,
	);

	return (
		<div onClick={() => setSelectedLocation?.({ lat, lon })}>
			<div onClick={() => onClose()}>
				{name}, {country} {state ? `, ${state}` : ''}
			</div>
		</div>
	);
}
