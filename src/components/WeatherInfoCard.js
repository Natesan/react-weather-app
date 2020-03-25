import React from "react";

const WeatherInfoCard = props => {
  return (
    <div className="card pb-2">
      <div className="card-date card-header">{props.weatherInfo.dt_txt}</div>
      <div className="card-desc card-subtitle mb-2 mt-2 text-muted">
        {props.weatherInfo.formattedDescription}
      </div>
      <div className="card-high card-text">High : {props.weatherInfo.max}</div>
      <div className="card-low card-text">Low : {props.weatherInfo.min}</div>
    </div>
  );
};

export default WeatherInfoCard;
