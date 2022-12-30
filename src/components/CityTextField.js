import {useRef} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
   display: block;
   width: 24em;
   margin: 1em auto;

   label {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin-right: 1em;
   }

   input {
      width: 6em;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 20px;
      padding-left: 0.5em;
      margin-right: 0.5em;
   }

   button {
      border: 1px solid black;
      font-size: 14px;
      padding: 5px 10px;
      color: black;
      background-color: white;
      border-radius: 5px;
      cursor: pointer;
   }

   button:hover,
   button:active {
     background: #b2beb5;
   }
`;

function CityTextField(props) {
   const cityInputRef = useRef();

   const submissionHandler = (event) => {
      event.preventDefault();
      props.submitHandler(cityInputRef.current.value);
   }

   return (
      <StyledForm onSubmit={submissionHandler}>
         <label>Enter city name: </label>
         <input ref={cityInputRef} type="text"></input>
         <button type="submit">Update</button>
      </StyledForm>
   );
}

export default CityTextField;