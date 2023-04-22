import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AutoCity from './components/AutoCity';
import WeatherOverlay from './components/WeatherOverlay';
import Forecast from './components/forecast/Forecast';
import Essentials from './components/essentials';
import GMaps from './components/Map';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('Mumbai');
  const [results, setResults] = useState(null);
  const [containerStyle, setContainerStyle] = useState({});
  const [cood, setCood] = useState({ lat: 40.7127753, lng: -74.0059728 });

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
    getCityLocation(suggestion.name);
  };

  const getCityLocation = (city) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GMAPS}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setCood(jsonData.results[0].geometry.location);
      });
  };

  const getContainerStyle = (weather) => {
    return { backgroundImage: `url(/assets/weather-icons/${weather}.svg)` };
  };

  useEffect(() => {
    if (city) {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&units=metric' +
          '&appid=' +
          process.env.REACT_APP_APIKEY
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setResults(result);
              setContainerStyle(getContainerStyle(result.weather[0].main));
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="weather__container">
        {/* Column 1 */}
        <div className="weather__col--1">
          <div className="weather__search">
            <p className="weather__search--prompt">Enter a city</p>
            <AutoCity onSelect={handleSelect} />
          </div>
          <GMaps cood={cood} setCood={setCood} />
          <div className="weather__placeholder weather__placeholder--2">
            Playlist
            <br />
            Coming Soon
          </div>
        </div>

        {/* Column 2 */}
        <div>
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <div className="weather__col--2">
              <div className="results__main">
                <WeatherOverlay style={containerStyle} />
                <div>
                  <h2>{results.weather[0].main}</h2>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </div>
              </div>

              <div className="weather__essentials">
                <Essentials today={results?.weather[0].main} />
              </div>

              <div>
                <Forecast city={city} />
              </div>
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div className="weather__col--3">
          <div className="weather__cta weather__cta--day">
            <p>Plan your day with fun activities!</p>
            <Link to="/day-planner">
              <button>Day Planner</button>
            </Link>
          </div>

          <div className="weather__cta weather__cta--trip">
            <p>Start planning your next trip with our flight finder!</p>
            <Link to="/trip-planner">
              <button>Trip Planner</button>
            </Link>
          </div>

          <div className="weather__cta weather__cta--climate">
            <p>Learn how climate change can affect your travels.</p>
            <Link to="/climate-change">
              <button>Climate Change</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
