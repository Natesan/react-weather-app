import React from "react";

const Form = props => {
  return (
    <form
      onSubmit={props.getWeather}
      className="m2-3 text-center d-flex justify-content-center"
    >
      <div className="form-group d-flex">
        <input
          type="text"
          placeholder="City"
          name="city"
          className="form-control mx-2"
        ></input>
        <button
          type="submit"
          className={
            props.darkMode && props.darkMode.value
              ? "btn btn-success form-control weather-button"
              : "btn btn-primary form-control weather-button"
          }
        >
          Get Weather
        </button>
      </div>
    </form>
  );
};

export default Form;
