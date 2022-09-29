import { useState, useEffect } from 'react';
import './App.css';

function App() {
  //API key: f26631ce955fdec3c98ba993cf7ee069
  const [locationInfo, setLocationInfo] = useState({});

  function success(pos) {
    console.log("Location retrieved");
    setLocationInfo(pos.coords);
  
    //console.log('Your current position is:');
    //console.log(`Latitude : ${crd.latitude}`);
    //console.log(`Longitude: ${crd.longitude}`);
    //console.log(`More or less ${crd.accuracy} meters.`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <p>{`Latitude : ${locationInfo.latitude}`}</p>
      <p>{`Latitude : ${locationInfo.longitude}`}</p>
      <p>{`Accuracy : ${locationInfo.accuracy} meters`}</p>
    </div>
  );
}

export default App;
