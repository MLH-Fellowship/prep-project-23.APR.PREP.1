/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};


const LineGraph = ({ data }) => {
    let time = data.time;
    let temperature_2m_max = data.temperature_2m_max;
  return (
    
    <LineChart width={800} height={500} data={data}>
      <XAxis dataKey={time} tickFormatter={formatDate} />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey={temperature_2m_max} stroke="#8884d8" />
    </LineChart>
    
  );
};
*/

//each object has keys for the date and the temperature
/*
const LineGraph = ({ data }) => {
    const chartData = Object.keys(data)
      .map((date) => {
        const temperature = data[date].temperature_2m_max;
        return { date, temperature };
      })
  
    return (
      <LineChart width={800} height={500} data={chartData}>
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis dataKey="temperature" />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    );
  };
  
  
  

const ClimateGraph = ({ latitude, longitude }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`
      );
      setData(response.data);
    };

    fetchData();
  }, [latitude, longitude]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <LineGraph data={data.daily} />;
};

export default ClimateGraph;

*/

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const LineGraph = ({ data }) => {
    
  const chartData = Object.keys(data).map((date) => {
    const temperature = data[date].temperature_2m_max;
    return { x: new Date(date).getTime(), y: temperature };
  });
  
  
  let time = data.time;
    let temperature_2m_max = data.temperature_2m_max;
    return {x: time, y: temperature_2m_max};
  
  const options = {
    title: {
      text: "Temperature",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%e %b",
      },
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [
      {
        name: "Temperature",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const ClimateGraph = ({ latitude, longitude }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`
      );
      setData(response.data);
    };

    fetchData();
  }, [latitude, longitude]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <LineGraph data={data.daily} />;
};

export default ClimateGraph;
*/

/*
import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";


const ClimateGraph = ({ coordinates }) => {
    const { lon, lat } = coordinates;
    const [results, setResults] = useState(null);

    useEffect(() => {
        if (lon && lat) {
          fetch(
            `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`
          )
            .then((res) => res.json())
            .then(
              (result) => {
                const dataArray = result?.data.daily;
                const temperatureArray = dataArray?.map((data) => {
                  return {
                    date: data.daily.time,
                    temperature: data.daily.temperature_2m_max,
                  };
                }) ?? [];
                setResults(temperatureArray);
                console.log(temperatureArray);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }, [coordinates]);

      return (
        <div>
          <div>
            <h2>Climate change over past 20 years</h2>
          </div>
    
          {results && (
            <div>
    
              <div className="climate__chart">
              <LineChart width={800} height={500} data={results}>
                <XAxis dataKey="date" />
                <YAxis dataKey="temperature" />
                <CartesianGrid stroke="#ccc" />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                </LineChart>
              </div>
            </div>
          )}
          </div>


   
          
       
      );
    };
    
    export default ClimateGraph;
      */

    /*
    useEffect(() => {
        if (lon && lat) {
          fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`)
          .then((res) => res.json())
          .then(
            (result) => {
                const index = data.list[0].main.aqi;

                */


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
  
  
  
   /* console.log(data.daily);
          const temperatures = data.daily.map((item) => {
            const date = new Date(item.time);
            return {
              date: date.toDateString(),
              temp: item.temperature_2m_max,
            };
          });
          console.log(temperatures);
        })
        .catch((error) => {
          console.log(error);
        });
        */
  /*
  useEffect(() => {
    if (lon && lat) {
      fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const dataArray = result?.daily;
            console.log(result.daily);
            
            const formattedDataArray = Object.entries(dataArray).map((data, index) => {
              return [data.time[index], data.temperature_2m_max[index]];
            });
            
            console.log(formattedDataArray);
            // Output: [[time1, temp1], [time2, temp2], ..., [time105, temp105]]

            setResults(formattedDataArray);
          }
        );
    }
  }, [coordinates]);
*/
  /*
  useEffect(() => {
    if (lon && lat) {
      fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2023-01-01&end_date=2023-04-15&daily=temperature_2m_max&timezone=auto`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const dataArray = result?.daily;
            console.log(result.daily);
            if (dataArray) {
              //const temperatureArray = dataArray.map((data) => {
              //  return {
              //    date: data.time,
              //    temperature: data.temperature_2m_max,
              //  };
              //});
              const temperatureArray = Object.entries(dataArray).map(
                ([date, temperature_2m_max]) => {
                  return {
                    date,
                    temperature_2m_max,
                  };
                }
              );
              setResults(temperatureArray);
              console.log(temperatureArray);
            } else {
              setResults([]);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [coordinates]);
  */

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

