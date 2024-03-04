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
                        className="cursor-pointer rounded-xl m-4 bg-white p-5"
                        cityName={city.cityName}
                        state={city.state}
                        country={city.country}
                    />
                </li>
            ))}
        </ul>
    );
}