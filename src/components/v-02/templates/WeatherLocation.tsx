import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchContext } from '@/store/searchContext';
import { WeatherContext } from '@/store/weatherContext';
import { useContextSelector } from 'use-context-selector';

export default function WeatherLocation() {
	const selectedLocation = useContextSelector(
		SearchContext,
		(state) => state?.selectedLocation,
	);
	const weather = useContextSelector(
		WeatherContext,
		(state) => state.weather,
	);
	const [mapKey, setMapKey] = useState<string>(
		`map-${selectedLocation?.lat}-${selectedLocation?.lon}`,
	);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const apiKey: string = import.meta.env.VITE_MAPBOX_API_KEY;

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			setMapKey(
				`map-${selectedLocation?.lat}-${selectedLocation?.lon}-${Date.now()}`,
			);
		});

		if (mapContainerRef.current) {
			resizeObserver.observe(mapContainerRef.current);
		}

		return () => {
			if (resizeObserver && mapContainerRef.current) {
				resizeObserver.unobserve(mapContainerRef.current);
			}
		};
	}, [selectedLocation?.lat, selectedLocation?.lon]);

	return (
		<>
			{weather ? (
				<div
					ref={mapContainerRef}
					className='p-6 bg-[#2E2E38] rounded-xl min-h-[350px] w-full h-full'
				>
					<Map
						key={mapKey}
						mapboxAccessToken={apiKey}
						initialViewState={{
							longitude: selectedLocation?.lon,
							latitude: selectedLocation?.lat,
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
			) : (
				<></>
			)}
		</>
	);
}
