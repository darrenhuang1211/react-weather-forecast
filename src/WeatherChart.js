import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

function WeatherChart(props) {
   const weatherData = props.chartData.list;
   const dayWeatherData = weatherData.slice(0, 8);
   
   console.log(dayWeatherData);

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

   return (
      <Line data={data}></Line>
   );
}

export default WeatherChart;