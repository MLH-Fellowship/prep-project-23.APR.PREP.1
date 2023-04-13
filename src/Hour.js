import './Hour.css'
import { padLeftTwo } from './helpers'

const Hour = ({ hour }) => {
  return (
    <>
      {/* hidden attribute should be set to false on click */}
      <div className="hour">
	<p className="hour__number">{padLeftTwo(hour.date.getHours())}</p>
	<p className="hour__data">
	  <div className="hour__icon">
	    <img
              alt={hour.weather[0].description}
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}/>
	  </div>
	  <p className="hour__temp">
	    <div className="hour__temp-real">
	      {Math.round(hour.main.temp)}°
	    </div>
	  </p>
	</p>
      </div>
    </>
  );
}

export default Hour;
