import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
type WeatherLocationProps = {
	lat: number;
	lon: number;
};

export default function WeatherLocation({ lat, lon }: WeatherLocationProps) {
	const mapKey = lat && lon ? `map-${lat}-${lon}` : 'map-default';
	return (
		<div className='p-6 rounded-xl bg-[#2E2E38]'>
			<Map
				key={mapKey}
				mapboxAccessToken='pk.eyJ1IjoiYW5kcm9uYWNoaTA5IiwiYSI6ImNsdHloamZsdjBlY3kya3Bqdmg0emFxY2QifQ.OUve52G6YcYxb1_v_s9_Hw'
				initialViewState={{
					longitude: lon,
					latitude: lat,
					zoom: 10,
				}}
				style={{ width: 'auto', height: '400px' }}
				mapStyle='mapbox://styles/mapbox/dark-v11'
				attributionControl={false}
			/>
		</div>
	);
}
