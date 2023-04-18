import React, { useState } from "react";
import "./FlightAPI.css";

function FlightAPI() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [outboundDate, setOutboundDate] = useState("");
  const [inboundDate, setInboundDate] = useState("");
  const [flightPrices, setFlightPrices] = useState([]);

  const handleSearch = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_SKYSCANNER_API_KEY,
          'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
      };
  
      const response = await fetch(`https://skyscanner44.p.rapidapi.com/fly-to-country?destination=SI&origin=MUC&departureDate=2023-07-01&returnDate=2023-07-21&currency=EUR&locale=en-GB&country=UK`, options);
      const data = await response.json();
      console.log(data)
      setFlightPrices(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flight-prices-container">
      <h2>Get Flight Prices</h2>
      <label>
        Source:
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </label>
      <label>
        Outbound Date:
        <input
          type="date"
          value={outboundDate}
          onChange={(e) => setOutboundDate(e.target.value)}
        />
      </label>
      <label>
        Inbound Date:
        <input
          type="date"
          value={inboundDate}
          onChange={(e) => setInboundDate(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Country</th>
            <th>Direct Price</th>
            <th>Indirect Price</th>
            <th>Hotel Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(flightPrices) && flightPrices.map((flightPrice) => (
            <tr key={flightPrice.Id}>
              <td>{flightPrice[0].Name}</td>
              <td>{flightPrice[0].CountryName}</td>
              <td>{flightPrice[0].DirectPrice}</td>
              <td>{flightPrice[0].IndirectPrice}</td>
              <td>{flightPrice[0].HotelPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightAPI;