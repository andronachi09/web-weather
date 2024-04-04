import { useContext, useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchContext } from '@/store/searchContext';
import { WeatherContext } from '@/store/weatherContext';

export default function WeatherLocation() {
	const searchContext = useContext(SearchContext);
	const weatherContext = useContext(WeatherContext);
	const [mapKey, setMapKey] = useState<string>(
		`map-${searchContext?.selectedLocation?.lat}-${searchContext?.selectedLocation?.lon}`,
	);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const apiKey: string = import.meta.env.VITE_MAPBOX_API_KEY;

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			setMapKey(
				`map-${searchContext?.selectedLocation?.lat}-${searchContext?.selectedLocation?.lon}-${Date.now()}`,
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
	}, [
		searchContext?.selectedLocation?.lat,
		searchContext?.selectedLocation?.lon,
	]);

	return (
		<>
			{weatherContext?.weather ? (
				<div
					ref={mapContainerRef}
					className='p-6 bg-[#2E2E38] rounded-xl min-h-[350px] w-full h-full'
				>
					<Map
						key={mapKey}
						mapboxAccessToken={apiKey}
						initialViewState={{
							longitude: searchContext?.selectedLocation?.lon,
							latitude: searchContext?.selectedLocation?.lat,
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
