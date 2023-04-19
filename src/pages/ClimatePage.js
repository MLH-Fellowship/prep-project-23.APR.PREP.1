import React, { useState, useEffect } from 'react';
import AirQuality from '../components/climate/AirQuality';
import AutoCity from '../components/AutoCity';

const ClimatePage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [climatePageCity, setClimatePageCity] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  const handleSelect = (suggestion) => {
    setClimatePageCity(suggestion.name);
  };

  useEffect(() => {
    if (climatePageCity) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${climatePageCity}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setCoordinates(result.coord);
              // you can set another piece of state for whatever you need to pass down to the HistoricalData component
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [climatePageCity]);

  return (
    <div>
      <h1>Climate Change</h1>
      <p>
        Enter a city to learn more about how global warming has affected its
        climate over the past decades. View live data of the air quality.
      </p>
      <h2>Enter a city below 👇</h2>
      <AutoCity onSelect={handleSelect} />

      {error && <div>Error: {error.message}</div>}

      {isLoaded && coordinates && (
        <div>
          {/* historical data component can go here */}
          <AirQuality coordinates={coordinates} />
        </div>
      )}
    </div>
  );
};

export default ClimatePage;
