import React from "react";

const Form = props => {
  return (
    <form onSubmit={props.getWeather} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          placeholder="City"
          name="city"
          className="form-control"
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Get Weather
      </button>
    </form>
  );
};

export default Form;
