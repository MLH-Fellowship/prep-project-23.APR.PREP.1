import React from 'react';
import './DayView.css';
import { padLeftTwo, DayName } from './helpers';

const DayView = ({ day, todayDate }) => {
  const renderedHours = day.hours.map((hourInfo, idx) => (
    <div key={idx} className="hour">
      <div className="hour__number">
        <p className="hour__number--hour">{`${padLeftTwo(
          hourInfo.date.getHours()
        )}`}</p>
        <p className="hour__number--min">00</p>
      </div>

      <div className="hour__icon">
        <img
          alt={hourInfo.weather.description}
          src={`https://openweathermap.org/img/wn/${hourInfo.weather.icon}.png`}
        />
      </div>

      <p className="hour__temp">{Math.round(hourInfo.temp.real)}°</p>
    </div>
  ));

  return (
    <div className="view">
      <p className="view__heading">
	{DayName(day, todayDate)}
      </p>

      <div className="view__hours">{renderedHours}</div>
    </div>
  );
};

export default DayView;
