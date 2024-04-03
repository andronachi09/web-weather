type SearchResultProps = {
	name: string;
	country: string;
	state?: string;
	lat: number;
	lon: number;
	onClick: (lat: number, lon: number) => void;
	onClose: () => void;
};

export default function SearchResult({
	name,
	country,
	state,
	onClick,
	lat,
	lon,
	onClose,
}: SearchResultProps) {
	return (
		<div onClick={() => onClick(lat, lon)}>
			<div onClick={() => onClose()}>
				{name}, {country} {state ? `, ${state}` : ''}
			</div>
		</div>
	);
}
