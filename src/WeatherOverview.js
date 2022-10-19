import styled from "styled-components";
import WeatherDetailPanel from "./WeatherDetailPanel";

const OverviewDisplay = styled.div`
   display: inline-block;
   float: left;
   width: 20em;
   text-align: center;
   margin-left: 0.5em;

   h1 {
      font-weight: 900;
   }
`;

function WeatherOverview(props) {
   console.log(props.data);

   const overviewData = props.data;
   const weatherIconURL = `http://openweathermap.org/img/wn/${overviewData.icon}@4x.png`

   return (
      <OverviewDisplay>
         <p>{overviewData.time}</p>
         <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={weatherIconURL} alt={overviewData.weather}></img>
            <h1>{`${overviewData.temp.toFixed(1)} °C`}</h1>
         </div>
         <h2>{`${overviewData.weather}`}</h2>
         <div style={{display: "flex", flexWrap: "wrap"}}>
            <WeatherDetailPanel title={"Feels like"} value={`${overviewData.feelsLike.toFixed(1)} °C`} />
            <WeatherDetailPanel title={"Humidity"} value={`${overviewData.humidity} %`} />
            <WeatherDetailPanel title={"Wind speed"} value={`${overviewData.windSpeed.toFixed(1)} m/s`} />
            <WeatherDetailPanel title={"Visibility"} value={`${overviewData.visibility / 1000} km`} />
         </div>
      </OverviewDisplay>
   );
}

export default WeatherOverview;