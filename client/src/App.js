import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Geolocation from "react-geolocation";
import WeatherDataService from "./services/weather.service.js";
import './App.css';

import Settimana from './components/settimana/settimana.js';
import Clock from './components/clock.js';

function App() {
  const [city, setCity] = useState("Inserisci la città");
  const [currentDay, setCurrentDay] = useState({temperatura: "Loading..."});

  function getCurrentDay() {
    WeatherDataService.getCurrentDay()
  .then(response => {
      setCurrentDay(response.data[0]);
      // console.log(response.data);
      // console.log(currentDay);
  })
  .catch(err => {
      console.error(err);
  })
  }

  useEffect(() =>{
    getCurrentDay();
}, [])

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
          localStorage.setItem('lat', latitude);
          localStorage.setItem('lon', longitude);
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
          <span className="temperatura">{(currentDay.temperatura).toString().slice(0,2)}°C</span>
        </div>

      <div className="mainContainer">
        {/* <div className="gridContainer"> */}
          {/* <div className="glassContainer1">

          </div> */}
          <div className="glassContainer2">
            <Settimana/>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
