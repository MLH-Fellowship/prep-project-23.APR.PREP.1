import './Day.css';
import { padMinutes } from './helpers';

const Day = ({ data }) => {
  const day = data[0];
  const dayDate = new Date(day.dt * 1000);
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

        {/* <p className="day__text--time">
          {dayDate.getHours()}:{padMinutes(dayDate.getMinutes())}
        </p> */}

        <p className="day__temp">
          <span className="day__temp--max">
            {Math.round(day.main.feels_like)}°
          </span>
          <span className="day__temp--min">
            {Math.round(day.main.feels_like)}°
          </span>
        </p>
      </div>
    </div>
  );
};

export default Day;
