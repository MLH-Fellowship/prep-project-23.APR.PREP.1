import './Day.css';
import { findMinMaxTemp, dtToDate } from './helpers';

const Day = ({ data }) => {
  const { minTemp, maxTemp } = findMinMaxTemp(data);

  const day = data[0];
  const dayDate = dtToDate(day.dt);
  const currDate = new Date(Date.now());

  const dayWeather = day.weather[0];
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    dayDate.getDay()
  ];

  return (
    <div className="day">
      <div className="day__icon">
        <img
          alt={dayWeather.description}
          src={`https://openweathermap.org/img/wn/${dayWeather.icon}@2x.png`}
        />
      </div>

      <div className="day__text">
        <p className="day__date">
          {dayDate.getDate() === currDate.getDate()
            ? 'Today'
            : `${dayOfWeek} ${dayDate.getDate()}`}
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
