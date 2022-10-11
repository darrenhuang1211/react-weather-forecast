import React from "react";

function WeatherDayButton(props) {
   const onClickHandler = () => {
      props.handler(props.dayNum);
   }
   console.log(`Button: ${props.children}`);

   return (
      <button onClick={onClickHandler}>{props.children}</button>
   );
}

export default React.memo(WeatherDayButton);