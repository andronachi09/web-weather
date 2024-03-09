type SearchResultProps = {
	name: string;
	country: string;
	state?: string;
	lat: number;
	lon: number;
	onClick: (lat: number, lon: number) => void;
};

export default function SearchResult({
	name,
	country,
	state,
	onClick,
	lat,
	lon,
}: SearchResultProps) {
	return (
		<div onClick={() => onClick(lat, lon)}>
			{name}, {country} {state ? `, ${state}` : ''}
		</div>
	);
}
