import React from "react";
import WeatherInfoCard from "./WeatherInfoCard";

const WeatherInfoContainer = props => {
  const dailyCards =
    props.weatherInfo &&
    props.weatherInfo.list &&
    props.weatherInfo.list.map(day => (
      <WeatherInfoCard key={day.dt_txt} weatherInfo={day}></WeatherInfoCard>
    ));
  return (
    <React.Fragment>
      <h3 className="mb-4">{props.weatherInfo.city}</h3>
      {dailyCards && (
        <div className="weather-info-container card-deck d-flex flex-wrap justify-content-center align-content-center">
          {dailyCards}
        </div>
      )}
    </React.Fragment>
  );
};

export default WeatherInfoContainer;
