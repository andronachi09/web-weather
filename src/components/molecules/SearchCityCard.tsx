import { ReactNode } from "react";

type CityProps = {
    cityName: string,
    country: string,
    state: string,
    lat?: number,
    lon?: number,
    children?: ReactNode;
};

export default function SearchCityCard({
    cityName,
    country,
    state,
    children
}: CityProps) {
    return (
        <div className="bg-white">
            <div>
                <h4>City name: {cityName}</h4>
                <h4>Country: {country}</h4>
                <h4>State: {state}</h4>
            </div>
            <div>
                { children }
            </div>
        </div>
    );
}