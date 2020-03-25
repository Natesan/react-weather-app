import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import Cities from "./components/Cities";
import Form from "./components/Form";
import WeatherInfoContainer from "./components/WeatherInfoContainer";
import "./App.css";

function App() {
  const API_KEY = "6f431031b69e6d15eaa035d6258b46db";

  // list of cities to be rendered be default
  const [cities, setCities] = useState([
    "Mountain View",
    "San Diego",
    "Los Angeles",
    "San Francisco",
    "Plano",
    "Reno",
    "Washington",
    "California",
    "Tucson",
    "Eagle",
    "Fredericksburg"
  ]);

  // state to hold the weather information
  const [weather, setWeather] = useState([]);

  // initialState is set to the selectedCity property when the app is rendered first
  const initialCity = () => window.localStorage.getItem("city");
  const [selectedCity, setSelectedCity] = useState(initialCity);
  // invokes the effect hook only when the selectedCity property is changes and not on every render
  useEffect(() => {
    // when a value is already fetched from the local storage make the API call to fetch the latest weather information
    if (selectedCity) {
      callWeatherAPI(selectedCity);
    }
    window.localStorage.setItem("city", selectedCity);
  }, [selectedCity]);

  async function fetchWeatherData(e) {
    e.preventDefault();
    const city = e.target.city.value;
    await callWeatherAPI(city);
  }

  function onCitySelection(e) {
    setSelectedCity(e);
  }

  async function callWeatherAPI(city) {
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
            data.errorText = `We do not have information about ${city} right now. Please enter another city.`;
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
        setSelectedCity(apiData.city.name);
      } else {
        // Daily Weather Information is not available for the given city
        setWeather({
          city: "",
          dateInfoList: [],
          error: apiData.errorText
        });
        setSelectedCity("");
      }
    } else {
      setWeather({
        city: "",
        dateInfoList: [],
        error: apiData.errorText
      });
      setSelectedCity("");
    }
  }

  return (
    <div className="App container text-center">
      <Title titleText="Weather Now"></Title>
      <Form getWeather={fetchWeatherData}></Form>
      {/* List a group of Cities */}
      <Cities cityList={cities} onSelection={onCitySelection}></Cities>

      {/* Display Weather for the Selected City */}
      {/* or */}
      {/* NTD : Display the weather for a city based on the browser location when there is no selection */}
      <WeatherInfoContainer
        weatherInfo={weather}
        className="container"
      ></WeatherInfoContainer>
    </div>
  );
}

export default App;
