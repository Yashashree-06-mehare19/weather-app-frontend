import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the city name input
  const [city, setCity] = useState('');
  // State for storing the current weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for storing the 5-day forecast data
  const [forecastData, setForecastData] = useState(null);

  // Function to fetch current weather data
  const fetchWeatherData = async () => {
    // Check if a city was entered
    if (city.trim() === '') {
      return;
    }

    try {
      // Clear forecast data when fetching new current weather
      setForecastData(null);
      
      const response = await fetch(`http://127.0.0.1:5000/api/current-weather?city=${city}`);
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setWeatherData(data);
      
    } catch (error) {
      console.error(error.message);
      // You can set an error state here for the user
    }
  };

  // Function to fetch 5-day forecast data
  const fetchForecastData = async () => {
    if (city.trim() === '') {
      return;
    }

    try {
      // Clear current weather data when fetching new forecast
      setWeatherData(null);

      const response = await fetch(`http://127.0.0.1:5000/api/five-day-forecast?city=${city}`);

      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setForecastData(data);

    } catch (error) {
      console.error(error.message);
      // You can set an error state here for the user
    }
  };

  return (
    <div className="App">
      <h1>My Weather App</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Current Weather</button>
        <button onClick={fetchForecastData}>Get 5-Day Forecast</button>
      </div>

      <div className="weather-data">
        {/* Conditional rendering for current weather data */}
        {weatherData && (
          <div className="weather-info">
            <h2>Current Weather for {weatherData.name}</h2>
            <h3>{weatherData.weather[0].description}</h3>
            <h1>{weatherData.main.temp}°C</h1>
          </div>
        )}

        {/* Conditional rendering for 5-day forecast data */}
        {forecastData && (
          <div className="forecast-info">
            <h2>5-Day Forecast for {forecastData.city.name}</h2>
            <ul>
              {forecastData.list.slice(0, 5).map((forecast, index) => (
                <li key={index}>
                  Date: {new Date(forecast.dt * 1000).toLocaleDateString()}, Temp: {forecast.main.temp}°C, {forecast.weather[0].description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;