import Map from 'react-map-gl';import 'mapbox-gl/dist/mapbox-gl.css';
type WeatherLocationProps = {
	lat: number;
	lon: number;
};

export default function WeatherLocation({ lat, lon }: WeatherLocationProps) {
	const mapKey = lat && lon ? `map-${lat}-${lon}` : 'map-default';
	return (
		<div className='p-2 bg-[#2E2E38] rounded-xl w-full h-full'>
			<Map
				key={mapKey}
				mapboxAccessToken='pk.eyJ1IjoiYW5kcm9uYWNoaTA5IiwiYSI6ImNsdHloamZsdjBlY3kya3Bqdmg0emFxY2QifQ.OUve52G6YcYxb1_v_s9_Hw'
				initialViewState={{
					longitude: lon,
					latitude: lat,
					zoom: 12,
				}}
				mapStyle='mapbox://styles/mapbox/dark-v11'
				attributionControl={true}
			/>
		</div>
	);
}
