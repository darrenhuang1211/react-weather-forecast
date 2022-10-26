import {useRef} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
   display: block;
   width: 20em;
   margin: 1em auto;

   label {
      text-align: center;
      font-weight: bold;
      margin-right: 1em;
   }

   input {
      width: 6em;
      border-radius: 5px;
      border: 1px solid #ccc;
      font: inherit;
      padding-left: 0.5em;
      margin-right: 0.5em;
   }

   button {
      font: inherit;
      border: 1px solid black;
      color: black;
      background: white;
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
         <label>Your city: </label>
         <input ref={cityInputRef} type="text"></input>
         <button type="submit">Update</button>
      </StyledForm>
   );
}

export default CityTextField;