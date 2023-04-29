import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__left">
        <Link to="/">TravelPrep</Link>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger__box">
          <span className="hamburger__inner"></span>
        </span>
      </button>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          {/* <li className="nav__item">
            <Link to="/day-planner" onClick={toggleMenu}>
              Day Planner
            </Link>
          </li> */}
          <li className="nav__item">
            <Link to="/Dayplanner" onClick={toggleMenu}>
              Day Planner
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/trip-planner" onClick={toggleMenu}>
              Trip Planner
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/climate-change" onClick={toggleMenu}>
              Climate Change
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
