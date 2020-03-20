import React from "react";
import moment from "moment";

const WeatherInfoCard = props => {
  const currentDate = props.weatherInfo.dt_txt;
  return (
    //TODO: Use Fragments
    <div className="card pb-2">
      <div className="card-date card-header">
        {moment(currentDate).format("MMMM Do YYYY")}
      </div>
      <div className="card-desc card-subtitle mb-2 mt-2 text-muted">
        Description : {props.weatherInfo.weather.pop().main}
      </div>
      <div className="card-high card-text">
        High : {props.weatherInfo.main.temp_max}
      </div>
      <div className="card-low card-text">
        Low : {props.weatherInfo.main.temp_min}
      </div>
    </div>
  );
};

export default WeatherInfoCard;
