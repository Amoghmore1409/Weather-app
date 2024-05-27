import React, { useState } from 'react';
import axios from 'axios';


const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const apiKey = 'Your api key here';

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    const fetchForecast = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
            );
            const filteredForecast = response.data.list.filter((reading) => 
              reading.dt_txt.includes('12:00:00')
        );
        setForecast(filteredForecast);
        } catch (error) {
            console.error('Error fetching the forecast data:', error);
        }
    };

    const handleSearch = () => {
        fetchWeather();
        fetchForecast();
    }
    return (
        <div className="weather-app">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
  
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
  
        {forecast.length > 0 && (
          <div className="forecast">
            <h2>5-Day Forecast</h2>
            <div className="forecast-container">
              {forecast.map((day) => (
                <div key={day.dt} className="forecast-item">
                  <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                  <p>{day.weather[0].description}</p>
                  <p>Temp: {day.main.temp}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> 
    );
};

export default WeatherApp;