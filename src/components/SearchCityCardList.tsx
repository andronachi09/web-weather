import { useEffect, useState } from "react";

import { findByGeocoding } from "../hooks/useGeocoding";
import SearchCityCard, { CityProps } from "./SearchCityCard";

export default function SearchCityCardList() {
    const [cities, setCities] = useState<CityProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            const result = await findByGeocoding('London', '', 'GB', 10, '08630a93ab31ac1ec920ad0e4d0c2e7f');
            if ('statusCode' in result) {
                setError(result.messageError);
            } else {
                setCities(result.map(city => ({
                    cityName: city.name,
                    lat: city.lat,
                    lon: city.lon
                })));
            }
        };

        fetchCities();
    }, []);

    if (error) return <div>Error: { error }</div>

    return (
        <div>
            <ul>
                {cities.map((city, index) => (
                    <li key={index}>
                        <SearchCityCard
                            cityName={city.cityName}
                            lon={city.lon}
                            lat={city.lat}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}