function WeatherOverview(props) {
   console.log(props.data);

   const overviewData = props.data;

   return (
      <div>
         <h3>{`${overviewData.temp}C`}</h3>
         <h3>{`${overviewData.weather}`}</h3>
         <p>{`Feels like: ${overviewData.feelsLike}C`}</p>
         <p>{`Humidity: ${overviewData.humidity}%`}</p>
         <p>{`Wind speed: ${overviewData.windSpeed} m/s`}</p>
      </div>
   );
}

export default WeatherOverview;