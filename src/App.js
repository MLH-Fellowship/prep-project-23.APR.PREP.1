import { useEffect, useState } from "react";
import './App.css';
import GMaps from './Map' 
import logo from "./mlh-prep.png";
import AutoCity from "./components/AutoCity";
import Forecast from './Forecast';
import React  from 'react';
import Essentials from "./components/essentials";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [cood, setCood] = useState({lat: 40.7127753, lng: -74.0059728})
  console.log(cood, "COORDINATE STATE")

  function getCityLocation(city) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GMAPS}`)
      .then((response) => {
          return response.json();
      }).then(jsonData => {
        setCood(jsonData.results[0].geometry.location); 
      })
  }


  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])
  const basename = process.env.REACT_APP_URL;
  const uri = basename + '/api/proxy?api=weather&q=' + city +
	      '&units=metric';
  const handleSelect = (suggestion) => {
    setCity(suggestion.name);
    getCityLocation(suggestion.name)
  };

  useEffect(() => {
    if (city) {
      fetch(uri)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] === 200) {
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
  }, [city, uri]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div className="container">
        <div className="header">
          <h2>Enter a city below <span role="img" aria-label="emoji">👇</span></h2>
          <AutoCity onSelect={handleSelect} />
        </div>
        <div className="maps">
        <GMaps
          cood={cood}
          setCood={setCood}
        />
        </div>
        <div className="results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && (<>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
            <Forecast city={city} />
          </>)}
        </div>
      </div>
      <Essentials today={results?.weather[0].main}/>
    </>
  }
}

export default App;

