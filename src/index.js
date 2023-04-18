import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import FlightAPI from './FlightAPI';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <FlightAPI />
  </React.StrictMode>,
  document.getElementById('root')
);
