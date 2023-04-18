import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import WeatherOverlay from "./components/WeatherOverlay";
import AutoCity from "./components/AutoCity";
import Forecast from './Forecast';
import React  from 'react';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
  };
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: "#fff",
  });

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city]);

  useEffect(() => {
    if (isLoaded && results) {
      setContainerStyle(getContainerStyle(results.weather[0].main));
    }
  }, [isLoaded, results]);

  function getContainerStyle(weather) {
    return { backgroundImage: `url(/assets/weather-icons/${weather}.svg)` };
  }

  /* TODO: Adjust overlay based on temperature
  //const temperature = results.main.temp / 10
  const style = {
    background: `linear-gradient(rgba(0,0,0,${temperature}), rgba(0,0,0,${temperature}))`
  };
  */

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div className="container">
          <h2>Enter a city below <span role="img" aria-label="emoji">👇</span></h2>
          <AutoCity onSelect={handleSelect} />
          <WeatherOverlay style={containerStyle} />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
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

