import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import App from './App';
import DayPlanner from './components/dayplanner/Dayplanner';
import FlightAPI from './components/FlightAPI';
import ClimatePage from './pages/ClimatePage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/Dayplanner" Component={DayPlanner}/>
        <Route path="/climate-change" Component={ClimatePage} />
        <Route path="/trip-planner" Component={FlightAPI} />
        <Route path="/about-us" Component={App} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
