import React, { useState, useEffect } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const AirQuality = ({ coordinates }) => {
  const { lon, lat } = coordinates;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const [airQualityIndex, setAirQualityIndex] = useState(null);

  const airQualityMap = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  };

  useEffect(() => {
    const fetchAirQuality = async () => {
      if (lon && lat) {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APIKEY}`
        );

        const result = await response.json();
        console.log('result', result);

        if (!('list' in result)) {
          setError('Could not locate data.');
          setIsLoaded(false);
        } else {
          const index = result.list[0].main.aqi;
          setAirQualityIndex(airQualityMap[index]);

          const airQualityObj = result.list[0].components;
          const airQualityArray = Object.entries(airQualityObj).map(
            ([name, value]) => {
              return {
                name,
                value,
              };
            }
          );
          setError(null);
          setIsLoaded(true);
          setResults(airQualityArray);
        }
      }
    };

    fetchAirQuality();
  }, [lon, lat]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {!isLoaded && <h2>Loading...</h2>}
      {isLoaded && results && (
        <div>
          <h2>Air Quality</h2>

          <p>Air Quality Index: {airQualityIndex}</p>

          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            className="air__chart"
          >
            <BarChart width={1000} height={500} data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                name="concentration (μg/m^3)"
                fill="#8884d8"
              />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirQuality;
