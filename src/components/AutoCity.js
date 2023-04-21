import { useEffect, useState } from "react";
import React from 'react';
import './AutoCity.css';

function AutoCity({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false); // new state variable

  const basename = process.env.REACT_APP_URL;

  useEffect(() => {
    if (inputValue.length > 2 && !selected) { // only fetch if not selected
      const uri = basename + '/api/proxy?api=geo&endpoint=direct&q='
		+ inputValue + "&limit=5";
      setLoading(true);
      fetch(uri)
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
  }, [inputValue, selected, basename]); // include selected in dependencies

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
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
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
