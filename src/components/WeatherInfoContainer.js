import React from "react";
import WeatherInfoCard from "./WeatherInfoCard";

const WeatherInfoContainer = props => {
  const dailyCards =
    props.weatherInfo &&
    props.weatherInfo.dateInfoList &&
    props.weatherInfo.dateInfoList.map(day => (
      <WeatherInfoCard weatherInfo={day}></WeatherInfoCard>
    ));
  return (
    <React.Fragment>
      <h3 className="mb-4">{props.weatherInfo.city}</h3>
      {dailyCards && (
        <div className="weather-info-container card-deck">{dailyCards}</div>
      )}
      {props.weatherInfo.error && (
        <div className="alert alert-danger" role="alert">
          {props.weatherInfo.error}
        </div>
      )}
    </React.Fragment>
  );
};

export default WeatherInfoContainer;
