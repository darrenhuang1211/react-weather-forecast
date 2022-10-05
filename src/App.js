import React, { useState, useEffect } from 'react';
import './App.css';
import APIKEY from './config';
import WeatherChart from './WeatherChart';
import CityTextField from './CityTextField';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
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

  async function getCoordsFromLocation(location) {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setLocationName(data[0].name);
      console.log(`New location: ${data[0].name}`);
      console.log(`New coordinates: Lat: ${data[0].lat} Lon: ${data[0].lon}`);

      return [data[0].lat, data[0].lon];
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
    }
  }

  async function getWeather(lat, lon) {
    try {
      console.log(`Getting weather data for lat: ${lat} lon: ${lon}`);
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
    const coordinates = pos.coords;
    console.log(`Coordinates: Lat: ${coordinates.latitude} Lon: ${coordinates.longitude}`);
    getLocationName(coordinates.latitude, coordinates.longitude);
    getWeather(coordinates.latitude, coordinates.longitude);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess);
  }, []);

  async function updateCityHandler(newCity) {
    setIsLoaded(false);
    const [newLat, newLon] = await getCoordsFromLocation(newCity);
    getWeather(newLat, newLon);
  }

  let content;

  if (isLoaded) {
    content = (
      <React.Fragment>
        <CityTextField location={locationName} submitHandler={updateCityHandler}/>
        <WeatherChart chartData={weatherData}/>
      </React.Fragment>
    );
  }
  else {
    content = <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      {content}
    </div>
  );
}

export default App;
