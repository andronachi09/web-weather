import { useEffect, useState } from 'react'
import SearchBar from '../molecules/SearchBar'
import SearchCityCardList from '../molecules/SearchCityCardList'
import { findLocationByGeocoding } from '../../hooks/useGeocoding';
import { CityType } from '../../types/city.types';

type SearchWithResultsProp = {
    className: string;
};

export default function SearchWithResults({ className }: SearchWithResultsProp) {
    const [cities, setCities] = useState<CityType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (searchTerm === '') {
            setCities([]);
            return;
        }

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
        <div className={className}>
            <SearchBar
                onSearch={setSearchTerm}
                className='flex items-center justify-center w-96 rounded bg-white'
            />
            <div
                className={`transform transition-all ease-out duration-1000 ${cities.length > 0 ? 'translate-y-0' : 'translate-y-4'}`}
            >
                <SearchCityCardList
                    className='grid-flow-row gap-20 py-10'
                    cities={cities}
                />
            </div>
        </div>
    );
}
