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
	const apiKey: string = import.meta.env.VITE_MAPBOX_API_KEY;

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
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
			className='p-6 bg-[#2E2E38] rounded-xl min-h-[350px] w-full h-full'
		>
			<Map
				key={mapKey}
				mapboxAccessToken={apiKey}
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
