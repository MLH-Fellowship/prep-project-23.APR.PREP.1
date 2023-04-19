import React from "react";
import App from "./App";
import "./Navbar.css"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./day-trip";

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
              <Link to="/day-trip">Day Trip</Link>
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
        <Route exact path="/" component={App} />
        <Route path="/day-trip" component={App} />
        <Route path="/climate-change" component={App} />
        <Route path="/trip-planner" component={App} />
        <Route path="/about-us" component={App} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navbar;