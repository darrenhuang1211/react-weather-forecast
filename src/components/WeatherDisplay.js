import React from 'react';
import WeatherChart from './WeatherChart';

function WeatherDisplay(props) {
   const weatherData = props.chartData.list;
   const sortedWeatherData = [];
   const days = [];

   let previousDate = new Date(weatherData[0].dt * 1000);
   let currentDate, currentDateWeather = [];

   days.push(previousDate.toDateString());

   weatherData.forEach((data) => {
      currentDate = new Date(data.dt * 1000);
      if (currentDate.getDate() !== previousDate.getDate()) {
         previousDate = currentDate;
         sortedWeatherData.push(currentDateWeather);
         currentDateWeather = [];
         days.push(currentDate.toDateString())
      }
      currentDateWeather.push(data);
   });
   sortedWeatherData.push(currentDateWeather);

   let length = sortedWeatherData.length;

   if (sortedWeatherData[0].length < 8) {
      sortedWeatherData[0] = sortedWeatherData[0].concat(sortedWeatherData[1].slice(0, 8 - sortedWeatherData[0].length));
   }
   if (sortedWeatherData[length-1].length < 8) {
      sortedWeatherData[length-1] = sortedWeatherData[length-2].slice(sortedWeatherData[length-1].length - 8).concat(sortedWeatherData[length-1]);
   }

   console.log(sortedWeatherData);

   return (
      <WeatherChart weatherData={sortedWeatherData} days={days}></WeatherChart>
   );
}

export default WeatherDisplay;