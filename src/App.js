import React, { useState, useEffect } from 'react';
import './App.css';
import APIKEY from './config';
import WeatherChart from './WeatherChart';
import CityTextField from './CityTextField';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
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
      console.log(`Location: ${data[0].name}`);
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
      console.log("Weather data retrieved");
      setWeatherData(data);
      setIsLoaded(true);
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
    }
  }

  function getPositionSuccess(pos) {
    console.log("Position retrieved");
    getLocationName(pos.coords.latitude, pos.coords.longitude);
    getWeather(pos.coords.latitude, pos.coords.longitude);
    setLocationInfo(pos.coords);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess);
  }, []);

  function updateCityHandler(event) {
    event.preventDefault();
    console.log(`Update city`);
  }

  let content = <p>Loading...</p>;

  if (isLoaded) {
    content = (
      <React.Fragment>
        <CityTextField location={locationName} submitHandler={updateCityHandler}/>
        <WeatherChart chartData={weatherData}/>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      {content}
    </div>
  );
}

export default App;
