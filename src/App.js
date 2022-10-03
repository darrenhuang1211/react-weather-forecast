import { useState, useEffect } from 'react';
import './App.css';
import APIKEY from './config';
import WeatherChart from './WeatherChart';

function App() {
  const [locationInfo, setLocationInfo] = useState({});
  const [locationName, setLocationName] = useState({});
  const [weatherData, setWeatherData] = useState({});

  async function getLocationName(lat, lon) {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setLocationName(data[0].name);
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
    }
  }

  async function getWeather(lat, lon) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setWeatherData(data);
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
    }
  }

  function getPositionSuccess(pos) {
    console.log("Location retrieved");
    getLocationName(pos.coords.latitude, pos.coords.longitude);
    getWeather(pos.coords.latitude, pos.coords.longitude);
    setLocationInfo(pos.coords);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess);
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <p>{`Location : ${locationName}`}</p>
      {weatherData.list && <WeatherChart chartData={weatherData}/>}
    </div>
  );
}

export default App;
