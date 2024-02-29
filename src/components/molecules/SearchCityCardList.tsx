import { CityType } from "../../types/city.types";
import SearchCityCard  from "./SearchCityCard";

type CitiesListProps = {
    cities: CityType[]
};

export default function SearchCityCardList({ cities = [] } : CitiesListProps) {
    return (
            <ul>
                {cities.map((city, index) => (
                    <li key={index}>
                        <SearchCityCard
                            cityName={city.cityName}
                            state={city.state}
                            country={city.country}
                            lon={city.lon}
                            lat={city.lat}
                        />
                    </li>
                ))}
            </ul>
    );
}