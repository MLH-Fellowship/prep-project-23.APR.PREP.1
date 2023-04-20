import React from "react";
import App from "./App";
import "./Navbar.css"
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import FlightAPI from "./FlightAPI";
import Activities from "./components/dayplanner";
import DayPlanner from "./components/DayPlanner";


function Navbar() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dayplanner">Day Planner</NavLink>
            </li>
            <li>
              <NavLink to="/trip-planner">Trip Planner</NavLink>
            </li>
            <li>
              <NavLink to="/climate-change">Climate Change</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About us</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/climate-change" element={<App/>} />
          <Route path="/dayplanner" element={<DayPlanner/>}/>
          <Route path="/trip-planner" element={<FlightAPI/>} />
          <Route path="/about-us" element={<App/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navbar;