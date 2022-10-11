import {useRef} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
   display: flex;
   align-items: left;
   margin-bottom: 0.5rem;
   margin-left: 0.5rem;

   label {
      font-weight: bold;
      margin-right: 1rem;
   }

   input {
      width: 8rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      font: inherit;
      padding-left: 0.5rem;
      margin-right: 0.5rem;
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
         <input ref={cityInputRef} type="text" defaultValue={props.location}></input>
         <button type="submit">Update</button>
      </StyledForm>
   );
}

export default CityTextField;