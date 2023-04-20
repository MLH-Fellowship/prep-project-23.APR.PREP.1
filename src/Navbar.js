import React from "react";
import App from "./App";
import "./Navbar.css"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FlightAPI from "./FlightAPI";
import Activities from "./components/dayplanner";


function Navbar() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dayplanner">Day Planner</Link>
            </li>
            <li>
              <Link to="/trip-planner">Trip Planner</Link>
            </li>
            <li>
              <Link to="/climate-change">Climate Change</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/climate-change" element={<App/>} />
          <Route path="/dayplanner" element={<Activities/>}/>
          <Route path="/trip-planner" element={<FlightAPI/>} />
          <Route path="/about-us" element={<App/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navbar;