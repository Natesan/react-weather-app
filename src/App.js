import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import Cities from "./components/Cities";
import Form from "./components/Form";
import WeatherInfoContainer from "./components/WeatherInfoContainer";
import "./App.css";
import moment from "moment";

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
  const [error, setError] = useState(null);

  // initialState is set to the selectedCity property when the app is rendered first
  const initialCity = () => window.localStorage.getItem("city");
  const [selectedCity, setSelectedCity] = useState(initialCity);

  // invokes the effect hook only when the selectedCity property is changes and not on every render
  useEffect(() => {
    // when a value is already fetched from the local storage make the API call to fetch the latest weather information
    if (selectedCity) {
      getForecast(selectedCity);
    }
    window.localStorage.setItem("city", selectedCity);
  }, [selectedCity, error]);

  async function fetchWeatherData(e) {
    e.preventDefault();
    const city = e.target.city.value;
    await getForecast(city);
  }

  function onCitySelection(e) {
    setSelectedCity(e);
  }

  async function getForecast(city) {
    let apiData;
    if (city) {
      apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          if (data.cod === "200") {
            const forecastList = [];
            if (Object.entries(data).length) {
              for (let i = 0; i < data.list.length; i += 8) {
                forecastList.push(processDataToWeather(data.list[i + 4], city));
              }
            }
            return forecastList;
          } else {
            resetState(
              `We do not have information about ${city} right now. Please enter another city.`
            );
          }
        });

      if (apiData) {
        // Daily Weather Information is available for the given city
        setWeather({
          city: apiData[0].city,
          list: apiData
        });
        setSelectedCity(apiData[0].city);
        setError(null);
      } else {
        // Daily Weather Information is not available for the given city
        resetState();
      }
    } else {
      resetState(`Please provide the city name`);
    }
  }

  function resetState(errorMessage) {
    setWeather({
      city: "",
      list: []
    });
    setSelectedCity("");
    errorMessage && setError(errorMessage);
  }

  function processDataToWeather(data, city) {
    const processedWeatherRecord = {
      city: city,
      date: data.dt * 1000,
      humidity: data.main.humidity,
      iconId: data.weather[0].id,
      temperature: data.main.temp,
      mainDescription: data.weather[0].main,
      description: data.weather[0].description,
      formattedDescription: `${data.weather[0].main} (${data.weather[0].description})`
    };

    if (data.dt_txt) {
      processedWeatherRecord.dt_txt = moment(data.dt_txt).format(
        "MMMM Do YYYY"
      );
    }

    if (data.weather[0].icon) {
      processedWeatherRecord.icon = data.weather[0].icon;
    }

    if (data.main.temp_min && data.main.temp_max) {
      processedWeatherRecord.max = data.main.temp_max;
      processedWeatherRecord.min = data.main.temp_min;
    }

    return processedWeatherRecord;
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
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
