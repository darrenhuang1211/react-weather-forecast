import React from "react";
import styled from "styled-components";

const StyledWeatherButton = styled.div`
   display: inline-block;
   float: left;
   width: 10em;
   text-align: center;
   border-radius: 5px;
   background-color: ${props => props.selected ? "#5dade2" : "white"};

   :hover {
      border-style: solid;
      border-color: #5dade2;
      cursor: pointer;
   }

   p, b {
      color: ${props => props.selected ? "white" : "black"};
   }

   .time {
      
   }
`;

function WeatherDayButton(props) {
   const onClickHandler = () => {
      props.handler(props.dayNum);
   }
   const overviewData = props.weatherData[0];
   const weatherIconURL = `http://openweathermap.org/img/wn/${overviewData.weather[0].icon}@2x.png`;

   return (
      <StyledWeatherButton {...props} onClick={onClickHandler}>
         <b className={"time"}>{props.children}</b>
         <img src={weatherIconURL} alt={overviewData.weather}></img>
         <p>Humidity</p>
         <p>{`${overviewData.main.humidity}%`}</p>
      </StyledWeatherButton>
   );
}

export default React.memo(WeatherDayButton);