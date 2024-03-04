import { CityType } from "../../types/city.types";
import SearchCityCard  from "./SearchCityCard";

type CitiesListProps = {
    cities: CityType[],
    className: string;
};

export default function SearchCityCardList({ cities = [], className } : CitiesListProps) {
    return (
        <ul className={className}>
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