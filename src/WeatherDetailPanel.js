import styled from "styled-components";

const StyledPanel = styled.div`
   background-color: #ddd;
   text-align: center;

   .title {
      color: gray;
   }
`;

function WeatherDetailPanel(props) {
   return (
      <StyledPanel>
         <p className="title">{props.title}</p>
         <p>{props.value}</p>
      </StyledPanel>
   )
}

export default WeatherDetailPanel;