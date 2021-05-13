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
        let fromDate = new Date();
        let toDate = new Date();

        toDate.setDate(toDate.getDate() + 6);
        
        let [addSix, setAddSix] = useState(7);
        let [addTwelve, setAddTwelve] = useState(7);
        let [fromDay, setFromDay] = useState(fromDate);
        let [toDay, setToDay] = useState(toDate);

    function getWeek() {
        WeatherDataService.getWeek(fromDate, toDate,
            localStorage.getItem('lat'),
            localStorage.getItem('lon'))
        .then(response => {
            convertDateToDays(response.data);
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }


    function changeWeek(x) {
        if(x === 1) {
            setAddSix(addSix+=7);
            setAddTwelve(addTwelve+=7);
            setFromDay(fromDate);
            setToDay(toDate);
            fromDate.setDate(fromDate.getDate() + addSix);
            toDate.setDate(toDate.getDate() + addTwelve);
            getWeek();
        }
        else if(x === 0) {
            setAddSix(addSix-=7);
            setAddTwelve(addTwelve-=7);
            setFromDay(fromDate);
            setToDay(toDate);
            fromDate.setDate(fromDate.getDate() + addSix);
            toDate.setDate(toDate.getDate() + addTwelve);
            getWeek();
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
                    <span className="gridButtons">{fromDay.toLocaleDateString('it-IT', {day: 'numeric', month: 'long'}) + " / " + toDay.toLocaleDateString('it-IT', {day: 'numeric', month: 'long'})}</span>
                    <button type="button" onClick={() => changeWeek(1)} className="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                
            <div className="gridWeekContainer m-3">
                {giorni.map((e, index) => (
                <div key={index} className="card">   
                    <div className="card-body">
                        <h5 className="card-title">{e.day}</h5>
                        <h5 className="card-title">{e.date.slice(8,10)}</h5>
                        <img src={sunny} className="card-img" alt={"weather"}/>
                        <h5 className="card-text text-center">{(e.previsione_meteo).charAt(0).toUpperCase() + (e.previsione_meteo).slice(1)}</h5>
                        <div className="card-minMaxTemp mt-3">
                            <span>{e.temperatura_max} <FontAwesomeIcon icon={faTemperatureHigh}/></span>
                            <span>{e.temperatura_min} <FontAwesomeIcon icon={faTemperatureLow}/></span>
                        </div>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faCloudRain}/> {e.prob_pioggia}%</h5>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faTint}/> {e.umidita}%</h5>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faWind}/> {e.velocita_vento}k/ts</h5>
                    </div> 
                </div>
                ))}
            </div>
        </div>
        );
}

export default Settimana;