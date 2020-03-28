import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import Cities from "./components/Cities";
import Form from "./components/Form";
import WeatherInfoContainer from "./components/WeatherInfoContainer";
import Loader from "react-loader-spinner";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import moment from "moment";

// Overarching parent component
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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          if (data.cod === "200") {
            const forecastList = [];
            let forecastMap = new Map();
            if (Object.entries(data).length) {
              for (let i = 0; i < data.list.length; i++) {
                var weatherRecord = {
                  date: data.list[i].dt_txt.split(" ")[0],
                  time: data.list[i].dt_txt.split(" ")[1],
                  dt_txt: moment(data.list[i].dt_txt).format("MMMM Do YYYY"),
                  max: data.list[i].main.temp_max,
                  min: data.list[i].main.temp_min,
                  city: city,
                  dateTimestamp: data.list[i].dt * 1000,
                  humidity: data.list[i].main.humidity,
                  iconId: data.list[i].weather[0].id,
                  icon: data.list[i].weather[0].icon,
                  temperature: data.list[i].main.temp,
                  mainDescription: data.list[i].weather[0].main,
                  description: data.list[i].weather[0].description,
                  formattedDescription: `${data.list[i].weather[0].main} (${data.list[i].weather[0].description})`
                };
                forecastMap = processWeatherData(forecastMap, weatherRecord);
              }

              for (let dailyForecast of forecastMap.values()) {
                forecastList.push(dailyForecast);
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
    setLoading(false);
    errorMessage && setError(errorMessage);
  }

  function processWeatherData(forecastMap, day) {
    if (!forecastMap.has(day.date) && day.time != "00:00:00") {
      // Not considering 00:00:00 hours since it doesn't provide realistic values to the user interest
      day.maxTime = day.time;
      day.minTime = day.time;
      forecastMap.set(day.date, day);
    } else if (forecastMap.has(day.date)) {
      let dateDetails = forecastMap.get(day.date);

      if (dateDetails.max <= day.max) {
        dateDetails.max = day.max;
        dateDetails.maxTime = day.time;
      }
      if (dateDetails.min >= day.min) {
        dateDetails.min = day.min;
        dateDetails.minTime = day.time;
      }
      forecastMap.set(day.date, dateDetails);
    }
    return forecastMap;
  }

  return (
    <div className="App container text-center">
      <Title titleText="Weather Now"></Title>
      <Form getWeather={fetchWeatherData}></Form>
      {/* List a group of Cities */}
      <Cities cityList={cities} onSelection={onCitySelection}></Cities>
      {loading && (
        <Loader
          type="Grid"
          className="loading-indicator"
          color="#007bff"
          height={100}
          width={100}
          // timeout={10000} //3 secs
        />
      )}
      {/* Display Weather for the Selected City */}
      {/* or */}
      {/* NTD : Display the weather for a city based on the browser location when there is no selection */}
      {!loading && (
        <WeatherInfoContainer
          weatherInfo={weather}
          className="container"
        ></WeatherInfoContainer>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
