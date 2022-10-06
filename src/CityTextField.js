import {useRef} from 'react';

function CityTextField(props) {
   const cityInputRef = useRef();

   const submissionHandler = (event) => {
      event.preventDefault();
      props.submitHandler(cityInputRef.current.value);
   }

   return (
      <form onSubmit={submissionHandler}>
         <label>Your city: </label>
         <input ref={cityInputRef} type="text" defaultValue={props.location}></input>
         <button type="submit">Update</button>
      </form>
   );
}

export default CityTextField;