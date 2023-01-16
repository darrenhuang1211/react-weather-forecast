import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import APIKEY from './config';
import WeatherDisplay from './components/WeatherDisplay';
import CityTextField from './components/CityTextField';

const StyledTitle = styled.div`
  text-align: left;
  font-size: 32px;
  margin: 0.5em;
`;

const LocationLabel = styled.p`
  text-align: center;
`

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationName, setLocationName] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isAutoDetected, setIsAutoDetected] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //use OpenWeather API to convert coordinates in a location name (i.e. city name)
  async function getLocationName(lat, lon) {
    try {
      const response = await fetch(`${process.env.REACT_APP_OPENWEATHER_URL_GEO}/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
      
      if (!response.ok) {
        throw new Error("Failed to get location name");
      }

      const data = await response.json();
      console.log(`Location: ${data[0].name}`);
      setLocationName(data[0].name);
    }
    catch(error) {
      setErrorMessage(error);
      setHasError(true);
    }
  }

  //use OpenWeather API to convert location name into coordinates
  async function getCoordsFromLocation(location) {
    try {
      const response = await fetch(`${process.env.REACT_APP_OPENWEATHER_URL_GEO}/direct?q=${location}&limit=1&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error("Failed to convert location to coordinates");
      }

      const data = await response.json();
      setLocationName(data[0].name);

      return {lat: data[0].lat, lon: data[0].lon};
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
      setErrorMessage(error);
      setHasError(true);
    }
  }

  //Use OpenWeather API to get 5-day weather data from coordinates
  async function getWeather(lat, lon) {
    try {
      console.log(`Getting weather data for lat: ${lat} lon: ${lon}`);
      const response = await fetch(`${process.env.REACT_APP_OPENWEATHER_URL_DATA}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error("Failed to get weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setIsLoaded(true);
    }
    catch(error) {
      setErrorMessage(error);
      setHasError(true);
    }
  }

  //Called when user manually enters a new city or location
  async function updateCityHandler(newCity) {
    setIsLoaded(false);
    const {lat: newLat, lon: newLon} = await getCoordsFromLocation(newCity);
    getWeather(newLat, newLon);
    setIsAutoDetected(false);
  }

  async function getPositionCallback(pos) {
    const coordinates = pos.coords;
    
    await getLocationName(coordinates.latitude, coordinates.longitude);
    await getWeather(coordinates.latitude, coordinates.longitude);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionCallback);
  }, []);

  let content;

  if (isLoaded) {
    content = (
      <React.Fragment>
        <CityTextField submitHandler={updateCityHandler}/>
        <LocationLabel>{"Location: " + locationName + (isAutoDetected ? " (Auto Detected)" : "")}</LocationLabel>
        <WeatherDisplay chartData={weatherData}/>
      </React.Fragment>
    );
  }
  else {
    content = <p>Loading...</p>;
  }

  if (hasError) {
    content = <p>{`Encountered error: ${errorMessage}.`}</p>
  }

  return (
    <div className="App">
      <StyledTitle>React Weather Forecast App</StyledTitle>
      {content}
    </div>
  );
}

export default App;
