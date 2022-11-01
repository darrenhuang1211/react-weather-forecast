# React Weather Forecast App
*Updated Oct 2022*

![Example screenshot](public/example.png)

This is a single page application which displays the 5-day weather forecast of a specific location (detected by system or entered by user). For the day selected, it shows detailed weather data on the left and generates a line chart for the temperature. Hosted here: https://weather-app-c84d64.netlify.app/

## Uses

- Built with React and styled-components 
- [Chart.js](https://www.chartjs.org/) library for line chart
- [OpenWeather API](https://openweathermap.org/api) for the weather forecast data and for converting location names to coordinates
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) for detecting user location
- [Netlify](https://www.netlify.com/) for deployment.
- [DevProjects](https://www.codementor.io/projects/web/weather-forecast-website-atx32lz7zb) for the project idea

## How it works

On initial startup, the app detects your location and displays its weather forecast data. Note that you may need to give the browser permissions first. You can also enter a location of your choice in the input field and view its weather forecast. 

The free plan of OpenWeather's API provides weather data for the next 5 days, with 3-hour step. It defaults to showing data for the current day, but you can click the panels below the chart to select other days. Below are some specifics of how this app behaves:

- The forecast starts at the next closest 3-hour step from the current time, and stops at exactly 5 days later. It adapts to your time zone. 
- The line chart always shows 24 hours-worth of data. It starts from 2am of each day and ends at 11pm. The exceptions are the first and last days:
   - For the first day, it starts at the next closest 3-hour step from the current time, and stops 24 hours later. 
   - For the last day, it starts at 24 hours before the final 3-hour step. 
   - Because of this, there might be some repeated weather data in the second and second-to-last days.
- Currently, the weather details on the left always shows data from the first 3-hour step of the selected day.