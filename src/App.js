import { useState, useEffect } from 'react';
import './App.css';
import APIKEY from './config';

function App() {
  const [locationInfo, setLocationInfo] = useState({});
  const [locationName, setLocationName] = useState({});

  async function getLocationName(lat, lon) {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      setLocationName(data[0].name);
    }
    catch(error) {
      console.log(`Encountered error: ${error.message}`);
    }
  }

  function getPositionSuccess(pos) {
    console.log("Location retrieved");
    getLocationName(pos.coords.latitude, pos.coords.longitude);
    setLocationInfo(pos.coords);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess);
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <p>{`Latitude : ${locationInfo.latitude}`}</p>
      <p>{`Latitude : ${locationInfo.longitude}`}</p>
      <p>{`Accuracy : ${locationInfo.accuracy} meters`}</p>
      <p>{`Location : ${locationName}`}</p>
    </div>
  );
}

export default App;
