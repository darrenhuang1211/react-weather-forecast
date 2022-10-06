import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

function WeatherChart(props) {
   const weatherData = props.chartData.list;
   const sortedWeatherData = [];
   const dayWeatherData = weatherData.slice(0, 8);
   const buttons = [];
   let buttonKey = 0;

   let previousDate = new Date(weatherData[0].dt * 1000);
   let currentDate, currentDateWeather = [];

   buttons.push(<button key={buttonKey}>{previousDate.toDateString()}</button>);

   weatherData.forEach((data) => {
      currentDate = new Date(data.dt * 1000);
      if (currentDate.getDate() !== previousDate.getDate()) {
         console.log(`New day: ${currentDate}`);
         previousDate = currentDate;
         sortedWeatherData.push(currentDateWeather);
         currentDateWeather = [];
         buttonKey++;
         buttons.push(<button key={buttonKey}>{currentDate.toDateString()}</button>)
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

   const formattedDates = dayWeatherData.map((data) => {
      return new Date(data.dt * 1000).toLocaleString("en-US");
   });
   const temperatures = dayWeatherData.map((data) => {
      return data.main.temp;
   });

   const data = {
      labels: formattedDates,
      datasets: [{
         data: temperatures
      }]
   };

   const options = {
      tension: 0.25
   };

   return (
      <React.Fragment>
         <Line options={options} data={data}></Line>
         {buttons}
      </React.Fragment>
   );
}

export default WeatherChart;