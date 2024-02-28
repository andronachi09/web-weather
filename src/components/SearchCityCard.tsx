export type CityProps = {
    cityName: string,
    lat: number,
    lon: number;
};

export default function SearchCityCard({ cityName, lat, lon }: CityProps) {
    return (
        <div>
            <h4>{cityName}</h4>
            <p>Latitude: {lat.toFixed(2)}</p>
            <p>Longitude: {lon.toFixed(2)}</p>
        </div>
    );
}