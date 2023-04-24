


import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

const ClimateGraph = ({ coordinates }) => {
  const { lon, lat } = coordinates;
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (lon && lat) {
      const startDate = '2010-01-01';
      const endDate = '2023-01-01';
      const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max&timezone=auto`;
  
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const dailyData = data.daily;
          const result = dailyData.time.map((time, index) => ({
            time,
            temperature_2m_max: dailyData.temperature_2m_max[index]
          }));
          console.log(result);
          setResults(result);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [coordinates]);
  
  
  
   

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

    <div>
      <div>
        <h2>Maximum temperature in Celsius from 2010</h2>
      </div>
      {results && (
        <div className="climate__chart-container">
          <LineChart width={1000} height={500} data={results}>
            <XAxis dataKey="time" tickCount={20} />
            <YAxis />
            
            <Line type="monotone" dataKey="temperature_2m_max" stroke="#8884d8" dot={false} />
          </LineChart>
        </div>
      )}
    </div>
    </div>
  );
      };

export default ClimateGraph;

