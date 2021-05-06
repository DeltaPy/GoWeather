import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Geolocation from "react-geolocation";
import './App.css';

import Settimana from './components/settimana/settimana.js';
import Clock from './components/clock.js';

function App() {
  const [city, setCity] = useState("Inserisci la città");
  return (
    <div>
      <Geolocation
        render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
        }) => {
        while(typeof latitude !== 'undefined') {
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&zoom=10&format=json&accept-language=it`, {referrer: "about:client"})
          .then(response => response.json())
          .then(data => setCity(data.address.city));
          break;
        }
      }}
      />
      <ul className="background">
        <li></li>
        <li className="star2"></li>
      </ul>
      <div className="location">
        <span className="citta">{city}</span>
        <span className="ora"><Clock/></span>
        <br/>
        {/* <span className="dateToday">{displayDate}</span> */}
        <span className="temperatura">24°<FontAwesomeIcon icon={faSun} /></span>
      </div>

      <div className="mainContainer">
        <div className="gridContainer">
          <div className="glassContainer1">
            


          </div>
          <div className="glassContainer2">
            <Settimana/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
