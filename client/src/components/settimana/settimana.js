import React, { useState, useEffect } from 'react';
import WeatherDataService from "../../services/weather.service";
import { faArrowRight, faArrowLeft,
        faTemperatureLow, faTemperatureHigh,
         faWind, faTint, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sunny from "../../images/icons/sun.png";

import './settimana.css';

function Settimana(props) {
        const [giorni, setGiorni] = useState([]);
        
        const date = new Date();
        const day = date.toLocaleDateString('it-IT', {day: 'numeric'});
        const month = date.toLocaleDateString('it-IT', {month: 'long'});

        const [fromDay, setFromDay] = useState(day);
        const [toDay, setToDay] = useState(parseInt(day) + 6);

    function getWeek(fromDay, toDay) {
        WeatherDataService.getWeek(fromDay, toDay)
        // WeatherDataService.getAll()
        .then(response => {
            convertDateToDays(response.data);
            console.log(response);
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    function changeWeek(x) {
        if(x === 1) {
            setFromDay(parseInt(fromDay) + 6);
            setToDay(parseInt(toDay) + 12);

            WeatherDataService.getWeek(fromDay, toDay);

            console.log("From Day: " + fromDay);
            console.log("To Day: " + toDay);
        }
        else if(x === 0) {
            setFromDay(parseInt(fromDay) - 6);
            setToDay(parseInt(toDay) - 12);
            WeatherDataService.getWeek(fromDay, toDay);
            console.log("From Day: " + fromDay);
            console.log("To Day: " + toDay);
        }
    }

    function convertDateToDays(data) {
        const days = Object.keys(data).map(key => data[key]);
        days.map((day) => {
            let date = new Date(day.date);
            day.day = date.toLocaleString('it-IT', {weekday: 'long'}).charAt(0).toUpperCase() + 
            date.toLocaleString('it-IT', {weekday: 'long'}).slice(1);
        });
        setGiorni(data);
    }

    useEffect(() =>{
        getWeek();
    }, [])


        return (
            <div className="gridGiorni">
                <div className="gridButtonsContainer btn-group">
                    <button type="button" onClick={() => changeWeek(0)} className="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <span className="gridButtons">{fromDay + " " + month + " / " + toDay + " " + month}</span>
                    <button type="button" onClick={() => changeWeek(1)} className="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                
            <div className="gridWeekContainer m-3">
                {giorni.map((e, index) => (
                <div key={index} className="card">   
                    <div className="card-body">
                        <h5 className="card-title">{e.day}</h5>
                        <h5 className="card-title">{e.date.slice(8,10)}</h5>
                        <img src={sunny} className="card-img" alt={"weather"}/>
                        <div className="card-minMaxTemp mt-3">
                            <span>{e.temperatura} <FontAwesomeIcon icon={faTemperatureHigh}/></span>
                            <span>16 <FontAwesomeIcon icon={faTemperatureLow}/></span>
                        </div>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faCloudRain}/> {e.prob_prep}%</h5>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faTint}/> 10%</h5>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faWind}/> 10 m/s</h5>
                    </div> 
                </div>
                ))}
            </div>
        </div>
        );
}

export default Settimana;