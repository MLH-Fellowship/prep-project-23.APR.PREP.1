import './Day.css';

import { padMinutes } from './helpers';

const Day = ({ data }) => {
  const day = data[0];
  const dayDate = new Date(day.dt * 1000);
  const currDate = new Date(Date.now());

  return (
    <div className="day">
      <h3>
        {dayDate.getDate() === currDate.getDate()
          ? 'Today'
          : dayDate.getDate() === currDate.getDate() + 1
          ? 'Tomorrow'
          : dayDate.getDate()}
      </h3>
      <p>
        {dayDate.getHours()}:{padMinutes(dayDate.getMinutes())}
      </p>
      <h4>{day.weather[0].main}</h4>
      <p>Feels like {day.main.feels_like}°C</p>
    </div>
  );
};

export default Day;
