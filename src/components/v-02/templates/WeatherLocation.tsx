import Map from 'react-map-gl';

type WeatherLocationProps = {
	lat: number;
	lon: number;
};

export default function WeatherLocation({ lat, lon }: WeatherLocationProps) {
	const mapKey = lat && lon ? `map-${lat}-${lon}` : 'map-default';
	return (
		<div>
			<Map
				key={mapKey}
				mapboxAccessToken='pk.eyJ1IjoiYW5kcm9uYWNoaTA5IiwiYSI6ImNsdHloamZsdjBlY3kya3Bqdmg0emFxY2QifQ.OUve52G6YcYxb1_v_s9_Hw'
				initialViewState={{
					longitude: lon,
					latitude: lat,
					zoom: 14,
				}}
				style={{ width: 600, height: 400 }}
				mapStyle='mapbox://styles/mapbox/dark-v11'
			/>
		</div>
	);
}
