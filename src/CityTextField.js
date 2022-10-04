function CityTextField(props) {
   return (
      <form onSubmit={props.submitHandler}>
         <label>Your city: </label>
         <input type="text" defaultValue={props.location}></input>
         <button type="submit">Update</button>
      </form>
   );
}

export default CityTextField;