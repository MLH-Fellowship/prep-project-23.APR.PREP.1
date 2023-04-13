import { useState, useEffect } from 'react';
import './Forecast.css';
import Day from './Day';
import { dtToDate } from './helpers';

const Forecast = ({ city }) => {
  const [forecastError, setForecastError] = useState(null);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [forecastResults, setForecastResults] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
        city +
        '&units=metric&appid=' +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result['cod'] !== '200') {
            setForecastLoaded(false);
          } else {
            setForecastLoaded(true);
	    const groupedForecast = regroupForecastResults(result.list);
	    setForecastResults(groupedForecast);
          }
        },
        (error) => {
          setForecastLoaded(true);
          setForecastError(error);
        }
      );
  }, [city]);

  return (
    <div className="forecast">
      <h2 className="forecast__heading">5-Day Forecast</h2>
      {!forecastLoaded && <h2>Forecast loading...</h2>}
      {forecastLoaded && forecastResults && (
        <div className="forecast__cards">
          {forecastResults.map((dayInfo, idx) => (
            <Day key={idx} data={dayInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

/* Take an array with the three-hourly weather forecast for five days
   and return an array of arrays containing that same information
   grouped by day */
function regroupForecastResults(forecastResultsArr) {
  const firstDay = dtToDate(forecastResultsArr[0].dt).getDate();
  const regroupedResults = [];
  for (let i = firstDay; i - firstDay < 5; i++) {
    const dayForecast = forecastResultsArr.filter(
      (d) => dtToDate(d.dt).getDate() === i
    );
    regroupedResults.push(dayForecast);
  }
  return regroupedResults;
}

export default Forecast;
