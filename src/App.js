import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
// figure out a way on how to not manually import each gif
import rain from "./gifs/Rain.gif";
import cloud from "./gifs/Clouds.gif";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: "#fff",
  });

  useEffect(() => {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=5&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then((geo) => geo[0])
      .then((geo) => {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            geo["lat"] +
            "&lon=" +
            geo["lon"] +
            "&units=metric&appid=" +
            process.env.REACT_APP_APIKEY
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
      });
  }, [city]);

  useEffect(() => {
    if (isLoaded && results) {
      setContainerStyle(getContainerStyle(results.weather[0].main));
    }
  }, [isLoaded, results]);

  function getContainerStyle(weather) {
    switch (weather) {
      case "Rain":
        return { backgroundImage: `url(${rain})` };
      case "Clouds":
        return { backgroundImage: `url(${cloud})` };
      default:
        return { backgroundColor: "#fff" };
    }
  }

  /*
  case "Clear":
    TODO
  case "Atmosphere":
    TODO
  case "Snow":
    TODO
  case "Drizzle":
    TODO
  case "Thunderstorm":
    TODO
  */

  
  /* TODO: Adjust overlay based on temperature
  //const temperature = results.main.temp / 10
  const style = {
    background: `linear-gradient(rgba(0,0,0,${temperature}), rgba(0,0,0,${temperature}))`
  };
  */

  // weather condition such as "clear", "rainy", "thunderstorm" is located in results.weather[0].main
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          <div className="container" style={containerStyle}>
            <div className="header">
              <h2>Enter a city below 👇</h2>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
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
                </>
              )}
            </div>
          </div>
      </>
    );
  }
}

export default App;
