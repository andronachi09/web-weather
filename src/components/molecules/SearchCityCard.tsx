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
            <div>
                <div className="flex flex-row">
                    <h4>location/country: {cityName}</h4>
                    <h4>, {country}</h4>
                </div>
                <div>
                    {state && <h4>state: {state}</h4>}
                </div>
            </div>
        </div>
    );
}