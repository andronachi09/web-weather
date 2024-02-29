import { ReactNode } from "react";

export type CityProps = {
    cityName: string,
    lat: number,
    lon: number,
    children?: ReactNode;
};

export default function SearchCityCard({ cityName, lat, lon, children }: CityProps) {
    return (
        <div>
            <h4>{cityName}</h4>
            <p>Latitude: {lat.toFixed(2)}</p>
            <p>Longitude: {lon.toFixed(2)}</p>
            <div>
                { children }
            </div>
        </div>
    );
}