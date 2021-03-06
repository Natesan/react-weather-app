import React from "react";

const WeatherInfoCard = props => {
  return (
    <div
      className={
        props.darkMode && props.darkMode.value
          ? "weather-card card border-success text-dark pb-2 my-2"
          : "weather-card card border-dark pb-2 my-2"
      }
    >
      <div className="card-date card-header">{props.weatherInfo.dt_txt}</div>
      <div
        className={
          props.darkMode && props.darkMode.value
            ? "card-desc card-subtitle mb-2 mt-2"
            : "card-desc card-subtitle mb-2 mt-2 text-muted"
        }
      >
        {props.weatherInfo.formattedDescription}
      </div>
      <div className="card-text mt-1">Temperature (in Celsius)</div>
      <div className="card-high card-text">High : {props.weatherInfo.max}</div>
      <div className="card-low card-text">Low : {props.weatherInfo.min}</div>
    </div>
  );
};

export default WeatherInfoCard;
