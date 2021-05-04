import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';

import Settimana from './components/settimana/settimana.js'

function App() {
  return (
    <div>
      <ul className="background">
        <li></li>
        <li className="star2"></li>
      </ul>

      <div className="location">
        <span className="citta">Roma</span>
        <span className="ora">23:30</span>
        <br/>
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
