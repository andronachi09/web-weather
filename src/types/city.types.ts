import { ReactNode } from "react";

export type CityType = {
    cityName?: string,
    country?: string,
    state?: string,
    lat: number,
    lon: number,
    children?: ReactNode;
};