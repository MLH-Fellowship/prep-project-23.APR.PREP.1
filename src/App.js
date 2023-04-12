import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city
	+ "&units=metric&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== "200") {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>p
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
    onChange={event => setCity(event.target.value)} />
    <div className="Results">
    {!isLoaded && <h2>Loading...</h2>}
    {console.log(results)}
    {isLoaded && results && Results(results, isLoaded)}
        </div>
      </div>
    </>
  }
}


function Results(results, isLoaded) {
  let daysInfo = regroupDaysInfo(results.list);
  return (
    <>
      {daysInfo.map(function(dayInfo){return Day(dayInfo);})}
	<i><p>{results.city.name}, {results.city.country}</p></i>
    </>
  );
}


function Day(dayInfo) {
  // for now get just the first forecast in the dayInfo list,
  // it will have to be updated to give the forecast for every hour
  // that day
  const day = dayInfo[0]; 
  const dayDate = new Date(day.dt * 1000);
  const currDate = new Date(Date.now());
  return (
    <>
      <h3>
	{dayDate.getDate() === currDate.getDate() ? "Today" :
	 dayDate.getDate() === currDate.getDate()+1 ? "Tomorrow" :
	 dayDate.getDate()}
      </h3>
      <p>{dayDate.getHours()}:{padMinutes(dayDate.getMinutes())}</p>
      <h4>{day.weather[0].main}</h4>
      <p>Feels like {day.main.feels_like}°C</p>
    </>
  );
}


function regroupDaysInfo(dayInfoList) {
  const today = new Date(Date.now()).getDate();
  const regroupedInfo = [];
  for (let i = today; i-today < 5; i++) {
    const dayInfo = dayInfoList
      .filter(
	d => (new Date(d.dt * 1000).getDate()) === i
      );
    regroupedInfo.push(dayInfo);
  }
  return regroupedInfo;
}


function padMinutes(min) {
  return (min < 10 ? '0' : '') + min.toString()
}

export default App;
