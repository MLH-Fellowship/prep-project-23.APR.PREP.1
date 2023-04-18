import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AutoCity from "./components/AutoCity";
import React  from 'react';
import Essentials from "./components/essentials";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);

  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
  };

  useEffect(() => {
    if (city) {
      fetch(
        //`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below <span role="img" aria-label="emoji">👇</span></h2>
          <AutoCity onSelect={handleSelect} />
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
              </>
            )}
          </div>
          <Essentials today={results?.weather[0]?.main}/>
        </div>
      </>
    );
  }
}

export default App;

