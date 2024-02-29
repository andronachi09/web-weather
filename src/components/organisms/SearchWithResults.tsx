import { useEffect, useState } from 'react'
import SearchBar from '../molecules/SearchBar'
import SearchCityCardList from '../molecules/SearchCityCardList'
import { findLocationByGeocoding } from '../../hooks/useGeocoding';
import { CityType } from '../../types/city.types';

export default function SearchWithResults() {
    const [cities, setCities] = useState<CityType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchCities = async () => {
            const result = await findLocationByGeocoding(searchTerm, 5, '08630a93ab31ac1ec920ad0e4d0c2e7f');
            console.log(result);
            if ('statusCode' in result) {
                return "error"
            } else {
                setCities(result.map(city => ({
                    cityName: city.name,
                    country: city.country,
                    state: city.state,
                    lat: city.lat,
                    lon: city.lon
                })));
            }
        };

        fetchCities();
    }, [searchTerm]);

    return (
        <div>
            <SearchBar onSearch={setSearchTerm}/>
            <SearchCityCardList cities={cities} />
        </div>
    );
}
