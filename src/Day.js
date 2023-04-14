import './Day.css';
import { findMinMaxTemp, DayName } from './helpers';

const Day = ({ day, handleChange, todayDate }) => {
  const { minTemp, maxTemp } = findMinMaxTemp(day);

  return (
    <div onClick={() => handleChange(day)} className="day">
      <div className="day__icon">
        <img
          alt={day.weather.description}
          src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
        />
      </div>

      <div className="day__text">
        <p className="day__date">
	  {DayName(day, todayDate)}
        </p>

        <p className="day__condition">{day.weather.description}</p>

        <p className="day__temp">
          <span className="day__temp--max">{Math.round(maxTemp)}°</span>
          <span className="day__temp--min">{Math.round(minTemp)}°</span>
        </p>
      </div>
    </div>
  );
};

export default Day;
