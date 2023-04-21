import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AutoCity from "./components/AutoCity";
import Forecast from './Forecast';
import React  from 'react';
import Essentials from "./components/essentials";
import { Link } from "react-router-dom";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);

  const basename = process.env.REACT_APP_URL;
  const uri = basename + '/api/proxy?api=weather&q=' + city +
	      '&units=metric';
  
  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
  };

  useEffect(() => {
    if (city) {
      fetch(uri)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              localStorage.setItem('weatherCondition',result)
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city, uri]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <div className="container">
        <div className="header">
          <h2>Enter a city below <span role="img" aria-label="emoji">👇</span></h2>
          <AutoCity onSelect={handleSelect} />
          <div className="google-maps"></div>
        </div>

        <div className="weather-forecast">
          <div className="results">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && (<>
              <h1>{results.weather[0].main}</h1>
              <p>Feels like {results.main.feels_like}°C</p>
              <i><p>{results.name}, {results.sys.country}</p></i>
            </>)}
          </div>
          <Essentials today={results?.weather[0].main}/>
          <Forecast city={city} />
        </div>

        <div className="planners">
            <div className="dayplanner">
                  <h2>Plan your day with some Fun activities!</h2>
                  <Link to='/Dayplanner'>day planner</Link>
                  {/* <button onClick={() => window.location.href = '/dayplanner?results=' + results}>Day Planner</button> */}
                  {/* <Link to={`/dayplanner?weather=${JSON.stringify(results)}`}>Day planner</Link> */}
            </div>

            <div className="trip-planner">
                <h1>Want to start a Trip?</h1>
                <h3>Try our <Link to='/trip-planner'>Trip planner</Link></h3>
            </div>
        </div>
      </div>
    </>
  }
}

export default App;

