import './Day.css';
import { findMinMaxTemp, DateDisplay } from './helpers';

const Day = ({ data, handleChange, todayDate }) => {
  const { minTemp, maxTemp } = findMinMaxTemp(data);

  const day = data[0];
  const dayWeather = day.weather[0];

  return (
    <div onClick={() => handleChange(data)} className="day">
      <div className="day__icon">
        <img
          alt={dayWeather.description}
          src={`https://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`}
        />
      </div>

      <div className="day__text">
        <p className="day__date">
	  {DateDisplay(day, todayDate)}
        </p>

        <p className="day__condition">{dayWeather.description}</p>

        <p className="day__temp">
          <span className="day__temp--max">{Math.round(maxTemp)}°</span>
          <span className="day__temp--min">{Math.round(minTemp)}°</span>
        </p>
      </div>
    </div>
  );
};

export default Day;
