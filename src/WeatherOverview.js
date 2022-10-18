import styled from "styled-components";

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
         <p>{`Feels like: ${overviewData.feelsLike.toFixed(1)} °C`}</p>
         <p>{`Humidity: ${overviewData.humidity}%`}</p>
         <p>{`Wind speed: ${overviewData.windSpeed.toFixed(1)} m/s`}</p>
      </OverviewDisplay>
   );
}

export default WeatherOverview;