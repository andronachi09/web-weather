import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

type WeatherLocationProps = {
	lat: number;
	lon: number;
};

export default function WeatherLocation({ lat, lon }: WeatherLocationProps) {
	const [mapKey, setMapKey] = useState<string>(`map-${lat}-${lon}`);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setMapKey(`map-${lat}-${lon}-${Date.now()}`);
		});

		if (mapContainerRef.current) {
			resizeObserver.observe(mapContainerRef.current);
		}

		return () => {
			if (resizeObserver && mapContainerRef.current) {
				resizeObserver.unobserve(mapContainerRef.current);
			}
		};
	}, [lat, lon]);

	return (
		<div
			ref={mapContainerRef}
			className='p-6 bg-[#2E2E38] rounded-xl w-full h-full z-0'
		>
			<Map
				key={mapKey}
				mapboxAccessToken='pk.eyJ1IjoiYW5kcm9uYWNoaTA5IiwiYSI6ImNsdHloamZsdjBlY3kya3Bqdmg0emFxY2QifQ.OUve52G6YcYxb1_v_s9_Hw'
				initialViewState={{
					longitude: lon,
					latitude: lat,
					zoom: 12,
				}}
				style={{
					height: '100%',
					width: '100%',
					zIndex: 0,
				}}
				mapStyle='mapbox://styles/mapbox/dark-v11'
				attributionControl={true}
				cursor='cursor'
			/>
		</div>
	);
}
