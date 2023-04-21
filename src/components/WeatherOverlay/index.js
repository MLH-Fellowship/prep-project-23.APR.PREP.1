import React from "react";
import "./style.css"

const WeatherOverlay = ({ style }) => {
    return (
        <>
            <div className="weather-overlay" style={style}>
            </div>
        </>
    )
}

export default WeatherOverlay;