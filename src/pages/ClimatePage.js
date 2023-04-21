import React, { useState, useEffect } from 'react';
import AirQuality from '../components/climate/AirQuality';
import ClimateGraph from '../components/climate/ClimateGraph';
import AutoCity from '../components/AutoCity';
import '../pages/ClimatePage.css'

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
      <h4>Traveling consciously is more important than ever. We provide historical climate data and live air quality updates, highlighting the impact of climate change on your travel destinations. </h4> 
      <h4> Check out our tips on making sustainable choices while traveling</h4>

      <div className="card-container">
      <div className="card">
        <p>Choose eco-friendly accommodations: Look for hotels, resorts, and vacation rentals that prioritize sustainability, such as those that use renewable energy, recycle, and reduce waste.</p>
      </div>
      <div className="card">
        <p>Use public transportation: Whenever possible, opt for public transportation like buses, trains, and subways instead of renting a car or taking taxis. This reduces emissions and helps you experience local culture.</p>
      </div>
      <div className="card">
        <p>Pack lightly: The more you pack, the more energy is needed to transport your luggage. Travel light and reduce your carbon footprint.</p>
      </div>
      <div className="card">
        <p>Support local businesses: Choose locally-owned restaurants, shops, and tours to support the local economy and reduce the environmental impact of your travels.</p>
      </div>
      <div className="card">
        <p>Bring reusable water bottles and bags: Refillable water bottles and reusable bags reduce plastic waste, which can be harmful to the environment.</p>
      </div>
      <div className="card">
        <p>Respect local customs and wildlife: Research and follow local customs and laws, and avoid activities that exploit wildlife or cause harm to animals. </p>
      </div>
    </div>


     
      <h2>Enter a city below 👇</h2>
      <AutoCity onSelect={handleSelect} />

      {error && <div>Error: {error.message}</div>}

      {isLoaded && coordinates && (
        <div>
          {/* historical data component can go here */}
          <ClimateGraph coordinates={coordinates} />
          <AirQuality coordinates={coordinates} />
        </div>
      )}
    </div>
  );
};

export default ClimatePage;
