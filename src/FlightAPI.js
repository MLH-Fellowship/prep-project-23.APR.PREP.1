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
          'X-RapidAPI-Key': `${process.env.REACT_APP_SKYSCANNER_API_KEY}`,
          'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
      };
  
      const response = await fetch(`https://skyscanner44.p.rapidapi.com/fly-to-country?destination=${destination}&origin=${source}&departureDate=2023-07-01&returnDate=2023-07-21&currency=INR&locale=en-GB&country=IN`, options);
      console.log(`https://skyscanner44.p.rapidapi.com/fly-to-country?destination=${destination}&origin=${origin}&departureDate=${outboundDate}&returnDate=${inboundDate}&currency=INR&locale=en-GB&country=IN`)
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
      <label> Select Airport   - 
        <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select Source</option>
            <option value="AUH">Abu Dhabi</option>
            <option value="LHR">London</option>
            <option value="JFK">New York</option>
            <option value="SYD">Sydney</option>
        </select>
      </label>
      <label>
        Destination   -
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination</option>
            <option value="IN">India</option>
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
        </select>
      </label>
      <label>
        Outbound Date   -
        <input
            type="date"
            value={outboundDate}
            onChange={(e) => setOutboundDate(e.target.value.split('T')[0])}
        />
      </label>
      <label>
        Inbound Date   -
        <input
            type="date"
            value={inboundDate}
            onChange={(e) => setInboundDate(e.target.value.split('T')[0])}
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
  {Array.isArray(flightPrices.PlacePrices) &&
    flightPrices.PlacePrices.map((flightPrice) => (
      <tr key={flightPrice.Id}>
        <td>{flightPrice.Name}</td>
        <td>{flightPrice.CountryName}</td>
        <td>{flightPrice.DirectPrice}</td>
        <td>{flightPrice.IndirectPrice}</td>
        <td>{flightPrice.HotelPrice}</td>
      </tr>
    ))}
</tbody>
      </table>
    </div>
  );
}

export default FlightAPI;