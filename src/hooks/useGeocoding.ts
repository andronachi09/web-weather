import axios, { AxiosRequestConfig } from "axios";

type GeocodingResponse = {
    name: string,
    lat: number,
    lon: number;
};

type CurrentWeatherResponseApi = {
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

type ErrorResponse = {
    statusCode: number,
    messageError: string;
};

export async function findByGeocoding(
    cityName: string,
    stateCode: string,
    countryCode: string,
    limit: number,
    apiKey: string
): Promise<GeocodingResponse[] | ErrorResponse> {
    const config: AxiosRequestConfig = {
        baseURL: `http://api.openweathermap.org/geo/1.0/direct`,
        params: {
            q: `${cityName}, ${stateCode}, ${countryCode}`,
            limit,
            appid: apiKey
        },
    };

    try {
        const response = await axios.get<GeocodingResponse[]>(config.url!, config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                statusCode: error.response.status,
                messageError: error.message
            };
        }
        return {
            statusCode: 500,
            messageError: 'An unknown error occurred!'
        };
    }
}

export async function findCurrentWeather(
    lat: number,
    lon: number,
    apiKey: string
): Promise< ErrorResponse | CurrentWeather> {
    const config: AxiosRequestConfig = {
        baseURL: `https://api.openweathermap.org/data/3.0/onecall`,
        params: {
            lat,
            lon,
            exclude: 'minutely,hourly,daily, alerts',
            appid: apiKey,
            units: 'metric'
        },
    };

    try {
        const response = await axios.get<CurrentWeatherResponseApi>(config.url!, config);
        const data = response.data;

        const transformData: CurrentWeather = {
            place: `${data.lat} ${data.lon}`,
            timezone: data.timezone,
            temperature: {
                current: data.current.temp,
                feelsLike: data.current.feels_like
            },
            sunrise: new Date(data.current.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.current.sunset * 1000).toLocaleTimeString(),
            atmosphere: {
                clouds: data.current.currentCloud,
                pressure: data.current.pressure,
                humidity: data.current.humidity
            },
            weatherDescription: {
                id: data.current.weather.id,
                main: data.current.weather.main,
                description: data.current.weather.description,
                icon: data.current.weather.description
            }
        }

        return transformData;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                statusCode: error.request.status,
                messageError: error.message
            };
        }
        return {
            statusCode: 500,
            messageError: 'An unknown error ocurred!'
        };
    }
}