import './Hour.css';
import { padLeftTwo } from './helpers';

const Hour = ({ hour }) => {
  return (
    <div className="hour">
      <div className="hour__number">
        <p className="hour__number--hour">{`${padLeftTwo(
          hour.date.getHours()
        )}`}</p>
        <p className="hour__number--min">00</p>
      </div>

      <div className="hour__icon">
        <img
          alt={hour.weather[0].description}
          src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
        />
      </div>

      <p className="hour__temp">{Math.round(hour.main.temp)}°</p>
    </div>
  );
};

export default Hour;
