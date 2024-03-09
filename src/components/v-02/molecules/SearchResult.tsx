type SearchResultProps = {
	name: string;
	country: string;
	state?: string;
};

export default function SearchResult({
	name,
	country,
	state,
}: SearchResultProps) {
	return (
		<div>
			{name}, {country} {state ? `, ${state}` : ''}
		</div>
	);
}
