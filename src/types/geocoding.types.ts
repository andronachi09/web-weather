export type GeocodingResponse = {
    name: string,
    country: string,
    state: string,
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
        weather: [{
            id: number,
            main: string,
            description: string,
            icon: string;
        }];
    };
    daily: [{
        dt: number
        humidity: number
        uvi: number
        pressure: number
        temp: {
            min: number,
            max: number;
        },
        summary: string;
    }];
    hourly: [{
        dt: number,
        temp: number;
        weather: [{
            id: number,
            main: string,
            description: string,
            icon: string;
        }]
    }]
};

export type CurrentWeather = {
    place?: string,
    timezone: string,
    temperature: {
        current: number,
        feelsLike: number;
    },
    windspeed: number,
    sunrise: string,
    sunset: string,
    atmosphere: {
        clouds: number,
        pressure: number,
        humidity: number;
    },
    weatherDescription: Array<{
        id: number,
        main: string,
        description: string,
        icon: string;
    }>;
    daily: Array<{
        dt: number,
        maxTemp: number,
        minTemp: number,
        humidity: number,
        uvi: number,
        pressure: number,
        summary: string;
    }>
    hourly: Array<{
        time: string,
        temperature: number,
        icon: string[];
    }>
};
