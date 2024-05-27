import React,{useState} from "react";
import { fetchWeather,fetchForecast } from "./weather";

const App =()=> {
const [city, setCity]=useState('');
const [weather, setWeather] = useState(null);
const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    try{
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    setWeather(weatherData);
    setForecast(forecastData);
    }catch(error){
      console.error('Error fetching data:', error);
    }
  };


return(
  <div className="App">
    <header>
    <h1>Weather Forecast Details</h1>
    <input type="text" value={city} on onChange={(e)=> setCity(e.target.value)} placeholder="Enter name of the City" />
    <button onClick={handleSearch}>Search</button>
    </header>

    {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C
          </p>
          <p>Humidity: {weather.main.humidity}%
          </p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

{forecast && (
        <div className="forecast">
          <h2>7-Day Forecast</h2>
          
            {forecast.list.map((list, index) => (
              <li key={index}>
                <p>Date:{list.weather.dt_txt*1000 }</p>
                <p>Temp: {list.main.temp}°C</p>
                <p>Humidity: {list.main.humidity}%</p>
              </li>
            ))}
          
        </div>
)}
    </div>

);

};

export default App;

