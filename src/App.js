import React, { useEffect, useState } from 'react';
import './App.css';
import GMaps from './Map';
import logo from './mlh-prep.png';
import WeatherOverlay from './components/WeatherOverlay';
import AutoCity from './components/AutoCity';
import Forecast from './Forecast';
import Essentials from './components/essentials';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('');
  const [results, setResults] = useState(null);
  const [cood, setCood] = useState({ lat: 40.7127753, lng: -74.0059728 });
  const [containerStyle, setContainerStyle] = useState({
    backgroundImage: `url(/assets/weather-icons/Clouds.svg)`,
  });

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
              setContainerStyle(getContainerStyle(results.weather[0].main));
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
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div className="container">
          <div className="header">
            <h2>
              Enter a city below{' '}
              <span role="img" aria-label="emoji">
                👇
              </span>
            </h2>
            <AutoCity onSelect={handleSelect} />
          </div>
          <GMaps cood={cood} setCood={setCood} />
          <WeatherOverlay style={containerStyle} />
          <div className="results">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
                <Forecast city={city} />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
