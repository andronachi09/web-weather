import axios, { AxiosRequestConfig } from "axios";
import { CurrentWeather, CurrentWeatherResponseApi, GeocodingResponse } from "../types/geocoding.types";
import { ErrorResponse } from "../types/error.types";

export async function findLocationByGeocoding(cityName: string, limit: number): Promise<GeocodingResponse[] | ErrorResponse> {
    const config: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_API_LOCATIONS,
		params: {
			q: `${cityName}`,
			limit,
		},
	};

    try {
        const response = await axios.get<GeocodingResponse[]>(config.baseURL as string, config);
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
): Promise<ErrorResponse | CurrentWeather> {
    const config: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_API_CURRENT_WEATHER,
		params: {
			lat,
			lon,
		},
	};

    try {
        const response = await axios.get<CurrentWeatherResponseApi>(config.url!, config);
        const data = response.data;

        const transformData: CurrentWeather = {
            place: data.placeName,
            timezone: data.timezone,
            temperature: {
                current: data.current.temp,
                feelsLike: data.current.feels_like
            },
            windspeed: data.current.wind_speed,
            sunrise: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: data.timezone }).format(new Date(data.current.sunrise * 1000)),
            sunset: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: data.timezone }).format(new Date(data.current.sunset * 1000)),
            atmosphere: {
                clouds: data.current.clouds,
                pressure: data.current.pressure,
                humidity: data.current.humidity
            },
            weatherDescription: data.current.weather.map(curr => ({
                id: curr.id,
                main: curr.main,
                description: curr.description,
                icon: curr.icon
            })),
            daily: data.daily.map(day => ({
                dt: day.dt,
                maxTemp: day.temp.max,
                minTemp: day.temp.min,
                humidity: day.humidity,
                uvi: day.uvi,
                pressure: day.pressure,
                summary: day.summary,
                icon: day.weather.map((d) => d.icon)
            })),
            hourly: data.hourly.map(hour => ({
                time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', timeZone: data.timezone}).format(new Date(hour.dt * 1000)),
                temperature: hour.temp,
                icon: hour.weather.map((d) => d.icon)
            }))
        };

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