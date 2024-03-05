import React, { useState, useEffect } from 'react';

import {  findCurrentWeatherLatLon } from '../../hooks/useGeocoding';
import { CurrentWeather } from '../../types/geocoding.types';

const WeatherDisplay: React.FC<{ lat: number; lon: number; apiKey: string }> = ({ lat, lon, apiKey }) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
          const data = await findCurrentWeatherLatLon(lat, lon, apiKey);

          if ('statusCode' in data) {
              setError(`Error: ${data.messageError}`);
          } else {
              setWeather(data);
          }
      } catch (error) {
        setError('Failed to fetch weather data');
        }
    };

    fetchWeather();
  }, [lat, lon, apiKey]);

  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h2>Weather in {weather.place}</h2>
      <p>Timezone: {weather.timezone}</p>
      <p>Temperature: {weather.temperature.current}°C, Feels like: {weather.temperature.feelsLike}°C</p>
      <p>Sunrise: {weather.sunrise}, Sunset: {weather.sunset}</p>
      <p>Clouds: {weather.atmosphere.clouds}%, Pressure: {weather.atmosphere.pressure} hPa, Humidity: {weather.atmosphere.humidity}%</p>
      <p>Weather: {weather.weatherDescription.description} <img src={`http://openweathermap.org/img/w/${weather.weatherDescription.icon}.png`} alt="Weather icon" /></p>
    </div>
  );
};

export default WeatherDisplay;
