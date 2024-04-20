# Web Weather Application
## A web application used to search current weather in any desired locations

## Project status

The application's front-end development is finalized. Users can search for any location, and see the different weather stats like:
precipitation, temperature, forecast etc.

## Project Screenshot

![alt text](image.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `yarn` installed globally on your machine.

Installation:<br>
`yarn install`

After installation create a .env file. In this file add `VITE_WEATHER_API_KEY`and `VITE_MAPBOX_API_KEY`:<br>
The key for `VITE_WEATHER_API_KEY` can be found [here](https://openweathermap.org/api).<br>
The key for `VITE_MAPBOX_API_KEY`can be found [here](https://www.mapbox.com/).

To start the application locally:<br>
`yarn dev`

To access the app on your local machine a link will be provided in the console.

## Reflection

This project represents an example that integrates different technologies for creating a responsive web application for real-time
weather data visualization. For fetching the real-time weather data, the Weather API was utilized. For map view, Mapbox API was
used, which offers users an interactive map view. UI inspiration: https://dribbble.com/shots/21505269-Weather-Dashbard-App.
