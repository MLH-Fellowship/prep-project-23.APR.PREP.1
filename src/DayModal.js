import './DayModal.css';
import { padLeftTwo, dayOfWeek } from './helpers';

const DayModal = ({ data }) => {
  const day = data[0].date;

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
    <div className="modal">
      <p className="modal__heading">
        {dayOfWeek(day)} {day.getDate()}
      </p>

      <div className="modal__hours">{renderedHours}</div>
    </div>
  );
};

export default DayModal;
