import './DayView.css';
import { padLeftTwo, dayOfWeek } from './helpers';

const DayView = ({ data, todayDate }) => {
  const day = data[0];

  const renderedHours = data.map((hourInfo, idx) => (
    <div key={idx} className="hour">
      <div className="hour__number">
        <p className="hour__number--hour">{`${padLeftTwo(
          hourInfo.date.getHours()
        )}`}</p>
        <p className="hour__number--min">00</p>
      </div>

      <div className="hour__icon">
        <img
          alt={hourInfo.weather[0].description}
          src={`https://openweathermap.org/img/wn/${hourInfo.weather[0].icon}.png`}
        />
      </div>

      <p className="hour__temp">{Math.round(hourInfo.main.temp)}°</p>
    </div>
  ));

  return (
    <div className="view">
      <p className="view__heading">
        {dayOfWeek(day.date)} {day.date.getDate()}
      </p>

      <div className="view__hours">{renderedHours}</div>
    </div>
  );
};

export default DayView;
