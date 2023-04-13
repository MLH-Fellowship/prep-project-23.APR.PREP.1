import { dateToHourMinString } from './helpers'

const Hour = ({ hour }) => {
  return (
    <>
      {/* hidden attribute should be set to false on click */}
      <div className="hour">
	<p className="hour__number">{dateToHourMinString(hour.date)}</p>
	<p className="hour__data">
	  <div className="hour__weather">{hour.weather[0].main}</div>
	  <div className="hour__temp-real">{hour.main.temp}°</div>
	  <div className="hour__temp-feels">{hour.main.feels_like}°</div>
	</p>
      </div>
    </>
  );
}

export default Hour;
