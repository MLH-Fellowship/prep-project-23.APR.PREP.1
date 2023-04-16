import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FlightAPI from './FlightAPI';
import './FlightAPI.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <FlightAPI />
  </React.StrictMode>,
  document.getElementById('root')
);
