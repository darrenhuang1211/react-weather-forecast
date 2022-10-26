import React, {useState, useCallback} from "react";
import styled from "styled-components";
import { Line } from 'react-chartjs-2';
import WeatherDayButton from './WeatherDayButton';
import WeatherOverview from "./WeatherOverview";
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

const GridContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
   grid-gap: 1em;

   .chartArea {
      grid-column: span 3;
   }
`;

const WeatherButtonFlexbox = styled.div`
   display: flex;
   justify-content: space-evenly;
   flex-wrap: wrap;
   margin: 1em;
`;

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
      buttons.push(
         <WeatherDayButton 
            key={i} 
            weatherData={props.weatherData[i]}
            dayNum={i}
            selected={i === currentDay} 
            handler={dayButtonHandler}
         >
            {props.days[i]}
         </WeatherDayButton>
      )
   }

   const dateFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit"
   }

   const currentDayOverview = {
      time: new Date(dayWeatherData[0].dt * 1000).toLocaleString("en-US", dateFormatOptions),
      temp: dayWeatherData[0].main.temp,
      feelsLike: dayWeatherData[0].main.feels_like,
      humidity: dayWeatherData[0].main.humidity,
      windSpeed: dayWeatherData[0].wind.speed,
      visibility: dayWeatherData[0].visibility,
      weather: dayWeatherData[0].weather[0].main,
      icon: dayWeatherData[0].weather[0].icon
   };
   
   const data = {
      labels: formattedDates,
      datasets: [{
         data: temperatures
      }]
   };

   const options = {
      tension: 0.25,
      responsive: true,
      aspectRatio: 3.5
   };

   return (
      <GridContainer>
         <WeatherOverview className={"overview"} data={currentDayOverview}/>
         <div className="chartArea">
            <Line options={options} data={data}></Line>
            <WeatherButtonFlexbox>
               {buttons}
            </WeatherButtonFlexbox>
         </div>
      </GridContainer>
   );
}

export default WeatherChart;