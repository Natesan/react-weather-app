import React, { useState } from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import WeatherInfoContainer from "./components/WeatherInfoContainer";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);
  const API_KEY = "6f431031b69e6d15eaa035d6258b46db";

  async function fetchWeatherData(e) {
    e.preventDefault();
    const city = e.target.city.value;
    let apiData = {
      errorText: `Please provide the city name`
    };
    if (city) {
      apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.cod === "200") {
            return data;
          } else {
            data.errorText = `We do not have information about ${city}. Please enter another city.`;
            return data;
          }
        });
      const dailyWeatherData =
        apiData.list &&
        apiData.list.filter(reading => reading.dt_txt.includes("18:00:00"));
      if (dailyWeatherData) {
        // Daily Weather Information is available for the given city
        setWeather({
          city: apiData.city.name,
          dateInfoList: dailyWeatherData,
          error: ""
        });
      } else {
        // Daily Weather Information is not available for the given city
        setWeather({
          city: "",
          dateInfoList: [],
          error: apiData.errorText
        });
      }
    } else {
      setWeather({
        city: "",
        dateInfoList: [],
        error: apiData.errorText
      });
    }
  }

  return (
    <div className="App container">
      <Title titleText="Weather Now"></Title>
      <Form getWeather={fetchWeatherData}></Form>
      <WeatherInfoContainer
        weatherInfo={weather}
        className="container"
      ></WeatherInfoContainer>
    </div>
  );
}

export default App;
