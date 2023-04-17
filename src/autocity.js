/*
import { useEffect, useState } from "react";
import React, { Component }  from 'react';

function AutoCity({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      setLoading(true);
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_APIKEY}`)
      //fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setSuggestions(result);
          },
          (error) => {
            setLoading(false);
            console.error(error);
          }
        );
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setInputValue(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      {loading && <div>Loading suggestions...</div>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSelect(suggestion)}>
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoCity;
*/

/*
import { useEffect, useState } from "react";
import React from 'react';
import './AutoCity.css';

function AutoCity({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      setLoading(true);
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_APIKEY}`)
      //fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setSuggestions(result);
          },
          (error) => {
            setLoading(false);
            console.error(error);
          }
        );
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setInputValue(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]);
  };

  return (
    <div className="AutoCity">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      {loading && <div>Loading suggestions...</div>}
      {suggestions.length > 0 && (
        <ul style={{ color: 'black' }} className="AutoCity-suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="AutoCity-suggestion"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
        
       
      )}
    </div>
  );
}

export default AutoCity;
*/



import { useEffect, useState } from "react";
import React from 'react';
import './AutoCity.css';

function AutoCity({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false); // new state variable

  useEffect(() => {
    if (inputValue.length > 2 && !selected) { // only fetch if not selected
      setLoading(true);
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_APIKEY}`)
      //fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setSuggestions(result);
          },
          (error) => {
            setLoading(false);
            console.error(error);
          }
        );
    } else {
      setSuggestions([]);
    }
  }, [inputValue, selected]); // include selected in dependencies

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setInputValue(`${suggestion.name}, ${suggestion.country}`);
    setSelected(true); // update selected state
    setSuggestions([]);
  };

  return (
    <div className="AutoCity">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          setSelected(false); // reset selected state on input change
        }}
      />
      {loading && <div>Loading suggestions...</div>}
      {suggestions.length > 0 && (
        <ul style={{ color: 'black' }} className="AutoCity-suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="AutoCity-suggestion"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoCity;
