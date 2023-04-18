import React, { useState, useEffect } from 'react';
import AirQuality from '../components/climate/AirQuality';
import AutoCity from '../components/AutoCity';

const ClimatePage = () => {
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
            setCoordinates(result.coord);
            // you can set another piece of state for whatever you need to pass down to the HistoricalData component
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [climatePageCity]);

  return (
    <div>
      <AutoCity onSelect={handleSelect} />
      {/* historical data component can go here */}
      <AirQuality coordinates={coordinates} />
    </div>
  );
};

export default ClimatePage;
