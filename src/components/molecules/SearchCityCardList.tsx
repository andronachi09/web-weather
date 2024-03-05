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
                    <div>
                        <SearchCityCard
                            className='rounded-xl m-4 bg-white p-5 cursor-pointer hover:scale-110 ease-in duration-300'
                            cityName={city.cityName}
                            state={city.state}
                            country={city.country}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}