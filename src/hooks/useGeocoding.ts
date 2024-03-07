import axios, { AxiosRequestConfig } from "axios";

import { CurrentWeather, CurrentWeatherResponseApi, GeocodingResponse } from "../types/geocoding.types";
import { ErrorResponse } from "../types/error.types";

export async function findLocationByGeocoding(
    cityName: string,
    limit: number,
    apiKey: string
): Promise<GeocodingResponse[] | ErrorResponse> {
    const config: AxiosRequestConfig = {
        baseURL: `http://api.openweathermap.org/geo/1.0/direct`,
        params: {
            q: `${cityName}`,
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

export async function findCurrentWeatherLatLon(
    lat: number,
    lon: number,
    apiKey: string
): Promise<ErrorResponse | CurrentWeather> {
    //fetching place name by reverse geocoding
    const reverseGeocodingConfig: AxiosRequestConfig = {
        baseURL: `http://api.openweathermap.org/geo/1.0/reverse`,
        params: {
            lat,
            lon,
            limit: 1,
            appid: apiKey
        },
    };

    let placeName = `${lat}, ${lon}`;

    try {
        const geoResponse = await axios.get<GeocodingResponse[]>(reverseGeocodingConfig.url!, reverseGeocodingConfig);
        if (geoResponse.data && geoResponse.data.length > 0) {
            placeName = geoResponse.data[0].name;
        }
    } catch (geoError) {
        console.error("Error fetching location name:", geoError);
    }

    const config: AxiosRequestConfig = {
        baseURL: `https://api.openweathermap.org/data/3.0/onecall`,
        params: {
            lat,
            lon,
            exclude: 'minutely, alerts',
            appid: apiKey,
            units: 'metric'
        },
    };

    try {
        const response = await axios.get<CurrentWeatherResponseApi>(config.url!, config);
        const data = response.data;

        const transformData: CurrentWeather = {
            place: placeName,
            timezone: data.timezone,
            temperature: {
                current: data.current.temp,
                feelsLike: data.current.feels_like
            },
            sunrise: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: data.timezone }).format(new Date(data.current.sunrise * 1000)),
            sunset: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: data.timezone }).format(new Date(data.current.sunset * 1000)),
            atmosphere: {
                clouds: data.current.clouds,
                pressure: data.current.pressure,
                humidity: data.current.humidity
            },
            weatherDescription: {
                id: data.current.weather.id,
                main: data.current.weather.main,
                description: data.current.weather.description,
                icon: data.current.weather.description
            },
            daily: data.daily.map(day => ({
                maxTemp: day.temp.max,
                minTemp: day.temp.min,
                summary: day.summary
            })),
            hourly: data.hourly.map(hour => ({
                time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: data.timezone}).format(new Date(hour.dt * 1000)),
                temperature: hour.temp
            }))
        };

        console.log("Transform data:", transformData);
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