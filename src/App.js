import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the city name input
  const [city, setCity] = useState('');
  // NEW: State for storing the weather data
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (e) => {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Check if a city was entered
    if (city.trim() === '') {
      return;
    }

    try {
      // This is the fetch request to YOUR Flask backend API
      const response = await fetch(`http://127.0.0.1:5000/api/current-weather?city=${city}`);
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      // Update the weatherData state with the fetched data
      setWeatherData(data);
      
    } catch (error) {
      console.error(error.message);
      // You can set an error state here for the user
    }
  };

  return (
    <div className="App">
      <h1>My Weather App</h1>
      <form onSubmit={fetchWeatherData}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      <div className="weather-data">
        {weatherData && (
  <div className="weather-info">
    <h2>{weatherData.name}</h2>
    <h3>{weatherData.weather[0].description}</h3>
    <h1>{weatherData.main.temp}°C</h1>
  </div>
)}
      </div>
    </div>
  );
}

export default App;