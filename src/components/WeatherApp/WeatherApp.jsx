import React, { useState } from "react";
import "./Weatherapp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

function WeatherApp() {
  const api_key = "34d548f2367e789227fb9cc38da4d272"
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    try {
      const element = document.querySelector(".cityInput");
      if (element.value === "") {
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

      const response = await fetch(url);
      const data = await response.json();

      const humidity = document.querySelector(".humidity-percent");
      const wind = document.querySelector(".wind-rate");
      const temperature = document.querySelector(".weather-temp");
      const location = document.querySelector(".weather-location");

      humidity.innerHTML = data.main.humidity + "%";
      wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature.innerHTML = Math.floor(data.main.temp) + "°C";
      location.innerHTML = data.name;

      setWeatherIcon(data.weather[0].icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const setWeatherIcon = (iconCode) => {
    // Create a mapping between icon codes and image files
    const iconMapping = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": drizzle_icon,
      "03n": drizzle_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    };

    setWicon(iconMapping[iconCode] || clear_icon);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"
        onKeyDown ={handleSearchKeyPress} />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
