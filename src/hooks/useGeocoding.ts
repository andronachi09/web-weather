import axios, { AxiosRequestConfig } from "axios";

type GeocodingResponse = {
    name: string,
    lat: number,
    lon: number;
};

type GeocodingErrorResponse = {
    statusCode: number,
    messageError: string;
};

export async function findByGeocoding(
    cityName: string,
    stateCode: string,
    countryCode: string,
    limit: number,
    apiKey: string
): Promise<GeocodingResponse[] | GeocodingErrorResponse> {
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