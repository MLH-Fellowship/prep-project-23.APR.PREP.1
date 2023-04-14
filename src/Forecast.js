import { useState, useEffect } from 'react';
import './Forecast.css';
import Day from './Day';
import DayView from './DayView';
import { dtToDate } from './helpers';

const Forecast = ({ city }) => {
  const [forecastError, setForecastError] = useState(null);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [forecastResults, setForecastResults] = useState(null);
  const [forecastView, setForecastView] = useState(null);

  const handleChangeView = (data) => {
    setForecastView(data);
  };

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
            setForecastView(groupedForecast[0]); // set detailed view to first available day
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
        <div>
          <div className="forecast__cards">
            {forecastResults.map((dayInfo, idx) => (
              <Day onClick={handleChangeView} key={idx} data={dayInfo} />
            ))}
          </div>
          {forecastView && <DayView data={forecastView} />}
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
  const regroupedByDay = [];

  forecastResultsArr.forEach((d) => (d.date = dtToDate(d.dt)));

  for (let i = firstDay; i - firstDay < 5; i++) {
    const dayForecast = forecastResultsArr.filter(
      (d) => d.date.getDate() === i
    );
    regroupedByDay.push(dayForecast);
  }

  return regroupedByDay;
}

export default Forecast;
