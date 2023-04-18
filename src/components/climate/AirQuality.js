import React, { useState, useEffect } from 'react';

const AirQuality = ({ coordinates }) => {
  console.log(coordinates);
  const { lon, lat } = coordinates;

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (lon && lat) {
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const airQualityObj = result.list[0].components;
            const airQualityArray = Object.entries(airQualityObj).map(
              ([name, value]) => ({
                name,
                value,
              })
            );
            setResults(airQualityArray);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [coordinates]);

  return <div>Work in progress</div>;
};

export default AirQuality;
