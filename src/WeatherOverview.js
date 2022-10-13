import styled from "styled-components";

const OverviewDisplay = styled.div`
   display: inline-block;
   float: left;
   width: 20em;
   text-align: center;
   margin-left: 0.5em;
`;

function WeatherOverview(props) {
   console.log(props.data);

   const overviewData = props.data;
   const weatherIconURL = `http://openweathermap.org/img/wn/${overviewData.icon}@2x.png`

   return (
      <OverviewDisplay>
         <h3>{`${overviewData.temp}C`}</h3>
         <img src={weatherIconURL} alt={overviewData.weather}></img>
         <h3>{`${overviewData.weather}`}</h3>
         <p>{`Feels like: ${overviewData.feelsLike}C`}</p>
         <p>{`Humidity: ${overviewData.humidity}%`}</p>
         <p>{`Wind speed: ${overviewData.windSpeed} m/s`}</p>
      </OverviewDisplay>
   );
}

export default WeatherOverview;