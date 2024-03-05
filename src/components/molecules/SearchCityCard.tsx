import { ReactNode } from "react";

type CityProps = {
    cityName: string,
    country: string,
    state: string,
    lat?: number,
    lon?: number,
    className: string,
    children?: ReactNode;
};

export default function SearchCityCard({
    cityName,
    country,
    state,
    className,
}: CityProps) {

    return (
        <div className={className}>
            <div className="lg:flex lg:flex-col md:flex md:flex-col">
                <h4>location/country:</h4>
                <h4>{cityName}, {country}</h4>
            </div>
            <div>
                {state && <h4>state: {state}</h4>}
            </div>
        </div>
    );
}