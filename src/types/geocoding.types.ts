export type GeocodingResponse = {
    name: string,
    lat: number,
    lon: number;
};

export type CurrentWeatherResponseApi = {
    lat: number,
    lon: number,
    timezone: string,
    current: {
        dt: number,
        sunrise: number,
        sunset: number,
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number,
        clouds: number,
        wind_speed: number,
        currentCloud: number,
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        };
    };
};

export type CurrentWeather = {
    place?: string,
    timezone: string,
    temperature: {
        current: number,
        feelsLike: number;
    },
    sunrise: string,
    sunset: string,
    atmosphere: {
        clouds: number,
        pressure: number,
        humidity: number;
    },
    weatherDescription: {
        id: number,
        main: string,
        description: string,
        icon: string;
    };
};
