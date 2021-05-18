import React, { useState, useEffect } from "react";
import WeatherDataService from "../../services/weather.service";
import {
  faArrowRight,
  faArrowLeft,
  faTemperatureLow,
  faTemperatureHigh,
  faWind,
  faTint,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Weather ICONS
import clearSky from "../../images/icons/clearSky.png";
import fewClouds from "../../images/icons/fewClouds.png";
import scatteredClouds from "../../images/icons/scatteredClouds.png";
import brokenClouds from "../../images/icons/brokenClouds.png";
import mist from "../../images/icons/mist.png";
import rain from "../../images/icons/rain.png";
import showerRain from "../../images/icons/showerRain.png";
import snow from "../../images/icons/snow.png";
import thunderstorm from "../../images/icons/thunderstorm.png";

import "./settimana.css";

function Settimana(props) {
  const [giorni, setGiorni] = useState([]);

  let fromDate = new Date();
  let toDate = new Date();

  toDate.setDate(toDate.getDate() + 6);

  let [addSix, setAddSix] = useState(0);
  let [addTwelve, setAddTwelve] = useState(0);
  let [fromDay, setFromDay] = useState(fromDate);
  let [toDay, setToDay] = useState(toDate);

  function getWeek() {
    WeatherDataService.getWeek(
      fromDate,
      toDate,
      localStorage.getItem("lat"),
      localStorage.getItem("lon")
    )
      .then((response) => {
        convertDateToDays(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function changeWeek(x) {
    if (x === 1) {
      setAddSix((addSix += 7));
      setAddTwelve((addTwelve += 7));
      setFromDay(fromDate);
      setToDay(toDate);
      fromDate.setDate(fromDate.getDate() + addSix);
      toDate.setDate(toDate.getDate() + addTwelve);
      getWeek();
    } else if (x === 0) {
      setAddSix((addSix -= 7));
      setAddTwelve((addTwelve -= 7));
      setFromDay(fromDate);
      setToDay(toDate);
      fromDate.setDate(fromDate.getDate() + addSix);
      toDate.setDate(toDate.getDate() + addTwelve);
      getWeek();
    }
  }

  function convertDateToDays(data) {
    const days = Object.keys(data).map((key) => data[key]);
    days.map((day) => {
      let date = new Date(day.date);
      day.day =
        date
          .toLocaleString("it-IT", { weekday: "long" })
          .charAt(0)
          .toUpperCase() +
        date.toLocaleString("it-IT", { weekday: "long" }).slice(1);
      return null;
    });
    assignIcon(data);
  }

  function assignIcon(data) {
    data.map((mappedData) => {
      if (mappedData.codice_previsione === 800) {
        mappedData.weatherIcon = clearSky;
      } else if (mappedData.codice_previsione === 801) {
        mappedData.weatherIcon = fewClouds;
      } else if (mappedData.codice_previsione === 802) {
        mappedData.weatherIcon = scatteredClouds;
      } else if (
        mappedData.codice_previsione === 803 ||
        mappedData.codice_previsione === 804
      ) {
        mappedData.weatherIcon = brokenClouds;
      } else if (
        mappedData.codice_previsione >= 500 &&
        mappedData.codice_previsione <= 504
      ) {
        mappedData.weatherIcon = rain;
      } else if (
        mappedData.codice_previsione >= 300 &&
        mappedData.codice_previsione <= 321
      ) {
        mappedData.weatherIcon = showerRain;
      } else if (
        mappedData.codice_previsione >= 200 &&
        mappedData.codice_previsione <= 232
      ) {
        mappedData.weatherIcon = thunderstorm;
      } else if (mappedData.codice_previsione === 511) {
        mappedData.weatherIcon = snow;
      } else if (
        mappedData.codice_previsione >= 520 &&
        mappedData.codice_previsione <= 531
      ) {
        mappedData.weatherIcon = showerRain;
      } else if (
        mappedData.codice_previsione >= 600 &&
        mappedData.codice_previsione <= 622
      ) {
        mappedData.weatherIcon = snow;
      } else if (
        mappedData.codice_previsione >= 701 &&
        mappedData.codice_previsione <= 781
      ) {
        mappedData.weatherIcon = mist;
      }
      return null;
    });
    // console.log(giorni);
    setGiorni(data);
  }

  useEffect(() => {
    getWeek();
  }, []);

  return (
    <div className="gridGiorni">
      <div className="gridButtonsContainer btn-group">
        <button
          type="button"
          onClick={() => changeWeek(0)}
          className="btn btn-primary gridButtons"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="gridButtons">
          {fromDay.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
          }) +
            " / " +
            toDay.toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
            })}
        </span>
        <button
          type="button"
          onClick={() => changeWeek(1)}
          className="btn btn-primary gridButtons"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className="gridWeekContainer m-3">
        {giorni.map((e, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h5 className="card-title">{e.day}</h5>
              <h5 className="card-title">{e.date.slice(8, 10)}</h5>
              <img src={e.weatherIcon} className="card-img" alt={"weather"} />
              <h5 className="card-text prev">
                {e.previsione_meteo.charAt(0).toUpperCase() +
                  e.previsione_meteo.slice(1)}
              </h5>
              <div className="card-minMaxTemp mt-3">
                <span>
                  {e.temperatura_max.toString().slice(0, 2)}{" "}
                  <FontAwesomeIcon icon={faTemperatureHigh} />
                </span>
                <span>
                  {e.temperatura_min.toString().slice(0, 2)}{" "}
                  <FontAwesomeIcon icon={faTemperatureLow} />
                </span>
              </div>
              <h5 className="card-text mt-2">
                <FontAwesomeIcon icon={faTint} /> {e.umidita} %
              </h5>
              <h5 className="card-text mt-2">
                <FontAwesomeIcon icon={faCloudRain} />{" "}
                {e.prob_pioggia.toString().slice(0, 3)} Mm
              </h5>
              <h5 className="card-text mt-2">
                <FontAwesomeIcon icon={faWind} />{" "}
                {e.velocita_vento.toString().slice(0, 3)} M/s
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settimana;
