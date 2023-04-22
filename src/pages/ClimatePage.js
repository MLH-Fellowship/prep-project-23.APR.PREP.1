import React, { useState, useEffect } from 'react';
import AirQuality from '../components/climate/AirQuality';
import ClimateGraph from '../components/climate/ClimateGraph';
import AutoCity from '../components/AutoCity';
import '../pages/ClimatePage.css';

const ClimatePage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      );
      const result = await response.json();

      if (result.cod !== 200) {
        setError(result.message);
      } else {
        setError(null);
        setIsLoaded(true);
        setCoordinates(result.coord);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className="climate">
      <div className="climate__container">
        <div className="climate__intro">
          <h1 className="climate__title">Climate Change</h1>
          <p>
            Traveling consciously is more important than ever. We provide
            historical climate data and live air quality updates, highlighting
            the impact of climate change on your travel destinations.
          </p>
        </div>

        <div className="climate__charts">
          <h2>Enter a city</h2>

          <div className="climate__search">
            <AutoCity onSelect={handleSelect} />
          </div>

          {error && <div>Error: {error}</div>}

          {isLoaded && coordinates && (
            <div className="climate__recharts">
              <div className="climate__recharts--1">
                <ClimateGraph coordinates={coordinates} />
              </div>
              <div className="climate__recharts--2">
                <AirQuality coordinates={coordinates} />
              </div>
            </div>
          )}
        </div>

        <div className="climate__tips">
          <h2>Sustainable Travel Tips</h2>
          <div className="card__container">
            <div className="card">
              <h3>Choose eco-friendly accommodations</h3>
              <p>
                Look for hotels, resorts, and vacation rentals that prioritize
                sustainability, such as those that use renewable energy,
                recycle, and reduce waste.
              </p>
            </div>
            <div className="card">
              <h3>Use public transportation</h3>
              <p>
                Whenever possible, opt for public transportation like buses,
                trains, and subways instead of renting a car or taking taxis.
                This reduces emissions and helps you experience local culture.
              </p>
            </div>
            <div className="card">
              <h3>Pack lightly</h3>
              <p>
                The more you pack, the more energy is needed to transport your
                luggage. Travel light and reduce your carbon footprint.
              </p>
            </div>
            <div className="card">
              <h3>Support local businesses</h3>
              <p>
                Choose locally-owned restaurants, shops, and tours to support
                the local economy and reduce the environmental impact of your
                travels.
              </p>
            </div>
            <div className="card">
              <h3>Bring reusable water bottles and bags</h3>
              <p>
                Refillable water bottles and reusable bags reduce plastic waste,
                which can be harmful to the environment.
              </p>
            </div>
            <div className="card">
              <h3>Respect local customs and wildlife</h3>
              <p>
                Research and follow local customs and laws, and avoid activities
                that exploit wildlife or cause harm to animals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimatePage;
