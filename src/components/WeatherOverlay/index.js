import React from 'react';
import './style.css';

const WeatherOverlay = ({ style }) => {
  return (
    <div>
      <div className="weather-overlay" style={style}></div>
    </div>
  );
};

export default WeatherOverlay;
