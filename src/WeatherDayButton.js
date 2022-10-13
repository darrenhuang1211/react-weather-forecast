import React from "react";
import styled from "styled-components";

const StyledWeatherButton = styled.div`
   display: inline-block;
   float: left;
   width: 10em;
   text-align: center;

   :hover {
      border-style: solid;
      border-color: 	#0080ff;
      border-radius: 5px;
      cursor: pointer;
   }

   p, b {
      font-size: 1em;
   }
`;

function WeatherDayButton(props) {
   const onClickHandler = () => {
      props.handler(props.dayNum);
   }
   const overviewData = props.weatherData[0];
   const weatherIconURL = `http://openweathermap.org/img/wn/${overviewData.weather[0].icon}@2x.png`
   console.log(props.weatherData);

   return (
      <StyledWeatherButton onClick={onClickHandler}>
         <p>{props.children}</p>
         <img src={weatherIconURL} alt={overviewData.weather}></img>
         <p>{`Humidity: ${overviewData.main.humidity}%`}</p>
      </StyledWeatherButton>
   );
}

export default React.memo(WeatherDayButton);