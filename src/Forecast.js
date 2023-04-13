import { useState, useEffect } from 'react';
import './Forecast.css';
import Day from './Day';

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
            setForecastResults(result);
          }
        },
        (error) => {
          setForecastLoaded(true);
          setForecastError(error);
        }
      );
  }, [city]);

  /* Take an array with the three-hourly weather forecast for five days
     and return an array of arrays containing that same information
     grouped by day */
  function regroupDaysInfo(dayInfoList) {
    const today = new Date(Date.now()).getDate();
    const regroupedInfo = [];
    for (let i = today; i - today < 5; i++) {
      const dayInfo = dayInfoList?.filter(
        (d) => new Date(d.dt * 1000).getDate() === i
      );
      regroupedInfo.push(dayInfo);
    }
    return regroupedInfo;
  }

  let daysInfo = regroupDaysInfo(forecastResults?.list);

  return (
    <div className="forecast">
      <h2 className="forecast__heading">5-Day Forecast</h2>
      {!forecastLoaded && <h2>Forecast loading...</h2>}
      {forecastLoaded && forecastResults && (
        <div className="forecast__cards">
          {daysInfo.map((dayInfo, idx) => (
            <Day key={idx} data={dayInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
