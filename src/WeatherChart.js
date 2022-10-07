import React, {useState, useCallback} from "react";
import { Line } from 'react-chartjs-2';
import WeatherDayButton from './WeatherDayButton';
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

function WeatherChart(props) {
   const [currentDay, setCurrentDay] = useState(0);
   const dayWeatherData = props.weatherData[currentDay];
   const buttons = [];

   const formattedDates = dayWeatherData.map((data) => {
      return new Date(data.dt * 1000).toLocaleString("en-US");
   });
   const temperatures = dayWeatherData.map((data) => {
      return data.main.temp;
   });

   const dayButtonHandler = useCallback((day) => {
      setCurrentDay(day);
   }, []);

   for (let i=0; i<props.days.length; i++) {
      buttons.push(<WeatherDayButton key={i} dayNum={i} handler={dayButtonHandler}>{props.days[i]}</WeatherDayButton>)
   }
   
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