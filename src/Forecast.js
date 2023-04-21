import { useState, useEffect } from 'react';
import React from 'react';
import './Forecast.css';
import Day from './Day';
import DayView from './DayView';
import { dtToDate } from './helpers';

const Forecast = ({ city }) => {
  const [forecastError, setForecastError] = useState(null);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [forecastResults, setForecastResults] = useState(null);
  const [forecastView, setForecastView] = useState(null);
  const todayDate = new Date(Date.now());

  //  const basename = process.env.REACT_APP_URL;
  //  const uri = basename + '/api/proxy?api=forecast&q=' + city +
  //              '&units=metric';
  const uri =
    'https://api.openweathermap.org/data/2.5/forecast?&q=' +
    city +
    '&units=metric&appid=' +
    process.env.REACT_APP_APIKEY;

  const handleChangeView = (data) => {
    setForecastView(data);
  };

  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result['cod'] !== '200') {
            setForecastLoaded(false);
          } else {
            setForecastLoaded(true);
            result.list.forEach(
              (r) => (r.date = dtToDate(r.dt, result.city.timezone))
            );
            const groupedForecast = regroupForecastResults(result.list);
            let days = groupedForecast.map((f) => makeDay(f));
            setForecastResults(days);
            setForecastView(days[0]); // set detailed view to first available day
          }
        },
        (error) => {
          setForecastLoaded(true);
          setForecastError(error);
        }
      );
  }, [city, uri]);

  return (
    <div className="forecast">
      {!forecastLoaded && <h2>Forecast loading...</h2>}
      {forecastLoaded && forecastResults && (
        <div>
          <div className="forecast__cards">
            {forecastResults.map((dayInfo, idx) => (
              <Day
                handleChange={handleChangeView}
                key={idx}
                day={dayInfo}
                todayDate={todayDate}
              />
            ))}
          </div>
          {forecastView && <DayView day={forecastView} todayDate={todayDate} />}
        </div>
      )}
    </div>
  );
};

/* Take an array with the three-hourly weather forecast for five days
   and return an array of arrays containing that same information
   grouped by day */
function regroupForecastResults(forecastResultsArr) {
  const firstDay = forecastResultsArr[0].date.getDate();
  const regroupedByDay = [];

  for (let i = firstDay; i - firstDay < 5; i++) {
    const dayForecast = forecastResultsArr.filter(
      (d) => d.date.getDate() === i
    );
    regroupedByDay.push(dayForecast);
  }

  return regroupedByDay;
}

function makeDay(dayForecast) {
  const hours = [];
  dayForecast.forEach((h) =>
    hours.push({
      date: h.date,
      weather: h.weather[0],
      temp: { real: h.main.temp, feels: h.main.feels_like },
      wind: h.wind,
      humidity: h.main.humidity,
      pressure: h.main.pressure,
    })
  );

  const weather = dominantWeather(hours);
  const temps = hours.map((h) => h.temp.real);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const day = {
    date: dayForecast[0].date,
    weather: weather,
    hours: hours,
    temp: { min: minTemp, max: maxTemp },
  };
  return day;
}

function dominantWeather(hours) {
  const ws = hours.map((h) => h.weather);
  // from more extreme events to less
  let w =
    ws.find((w) => w.id === 781) || // tornado
    ws.find((w) => w.id === 504) || // extreme rain
    ws.find((w) => w.id === 212) || // heavy thunderstorm
    ws.find((w) => w.id === 602) || // heavy snow
    ws.find((w) => w.id === 511) || // freezing rain
    ws.find((w) => w.id === 202) || // thunderstorm + heavy rain
    ws.find((w) => w.id === 503) || // very heavy rain
    ws.find((w) => w.id === 731) || // sand/dust whirls
    ws.find((w) => w.id === 711) || // smoke
    ws.find((w) => w.id === 762) || // volcanic ash
    ws.find((w) => w.id === 502) || // heavy rain
    ws.find((w) => w.id === 751) || // sand
    ws.find((w) => w.id === 314) || // heavy shower rain and drizzle
    ws.find((w) => w.id === 622) || // heavy shower snow
    ws.find((w) => w.id === 201) || // thunderstorm + rain
    ws.find((w) => w.id === 232) || // thunderstorm + heavy drizzle
    ws.find((w) => w.id === 211) || // thunderstorm
    ws.find((w) => w.id === 522) || // heavy shower rain
    ws.find((w) => w.id === 601) || // snow
    ws.find((w) => w.id === 611) || // sleet
    ws.find((w) => w.id === 231) || // thunderstorm + drizzle
    ws.find((w) => w.id === 200) || // thunderstorm + light rain
    ws.find((w) => w.id === 230) || // thunderstorm + light drizzle
    ws.find((w) => w.id === 615) || // light rain + snow
    ws.find((w) => w.id === 621) || // shower snow
    ws.find((w) => w.id === 613) || // shower sleet
    ws.find((w) => w.id === 771) || // squalls
    ws.find((w) => w.id === 221) || // ragged thunderstorm
    ws.find((w) => w.id === 620) || // light shower snow
    ws.find((w) => w.id === 612) || // light shower sleet
    ws.find((w) => w.id === 501) || // moderate rain
    ws.find((w) => w.id === 302) || // heavy drizzle
    ws.find((w) => w.id === 312) || // intense drizzle rain
    ws.find((w) => w.id === 521) || // shower rain
    ws.find((w) => w.id === 313) || // shower rain and drizzle
    ws.find((w) => w.id === 531) || // ragged shower rain
    ws.find((w) => w.id === 600) || // light snow
    ws.find((w) => w.id === 500) || // light rain
    ws.find((w) => w.id === 210) || // light thunderstorm
    ws.find((w) => w.id === 311) || // drizzle rain
    ws.find((w) => w.id === 301) || // drizzle
    ws.find((w) => w.id === 310) || // light drizzle rain
    ws.find((w) => w.id === 321) || // shower drizzle
    ws.find((w) => w.id === 300) || // light drizzle
    ws.find((w) => w.id === 761) || // dust
    ws.find((w) => w.id === 741) || // fog
    ws.find((w) => w.id === 701) || // mist
    ws.find((w) => w.id === 721) || // haze
    false;
  if (w) return w;

  const overcast = ws.filter((w) => w.id === 804); // overcast clouds
  const broken = ws.filter((w) => w.id === 803); // broken clouds
  const scattered = ws.filter((w) => w.id === 802); // scattered clouds
  const few = ws.filter((w) => w.id === 801); // few clouds
  const clear = ws.filter((w) => w.id === 800); // clear
  const possibl = [overcast, broken, scattered, few, clear];

  let wArr =
    possibl.find((arr) => arr.length >= ws.length / 2) ||
    possibl.find((arr) => arr.length > 0) ||
    false;

  if (wArr) {
    return wArr[0];
  } else {
    // should never happen if we have really checked for all
    // possible weathers in the API
    throw new Error(`Can't determine the dominant weather in ${ws}`);
  }
}

export default Forecast;
