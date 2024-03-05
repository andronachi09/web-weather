import { useEffect, useState } from 'react';

import SearchBar from '../molecules/SearchBar';
import SearchCityCardList from '../molecules/SearchCityCardList';
import { findLocationByGeocoding } from '../../hooks/useGeocoding';
import { CityType } from '../../types/city.types';

type SearchWithResultsProp = {
    className: string;
};

export default function SearchWithResults({ className }: SearchWithResultsProp) {
    const [cities, setCities] = useState<CityType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCities = async () => {
            const result = await findLocationByGeocoding(searchTerm, 10, '08630a93ab31ac1ec920ad0e4d0c2e7f');
            console.log(result);
            if ('statusCode' in result) {
                return error;
            } else if (!result || result.length === 0) {
                setError('No result found.');
                setCities([]);
            } else {
                setCities(result.map(city => ({
                    cityName: city.name,
                    country: city.country,
                    state: city.state,
                    lat: city.lat,
                    lon: city.lon
                })));
                setError('');
            }
        };

        fetchCities();
    }, [searchTerm]);

    return (
        <div className={className}>
            <div>
                <SearchBar
                    onSearch={setSearchTerm}
                    onError={error}
                    className='flex items-center justify-center w-96 rounded-xl bg-white'
                />
            </div>
            <div
                className={`transform transition-all ease-out duration-1000 ${cities.length > 0 ? 'translate-y-0' : 'translate-y-4'}`}
            >
                <div className="flex flex-wrap gap-8 justify-center md:justify-start max-w-max pt-10">
                    <SearchCityCardList
                        className="md:flex md:items-center md:flex-col lg:flex lg:items-center lg:flex-row"
                        cities={cities}
                    />
                </div>
            </div>
        </div>
    );
}
