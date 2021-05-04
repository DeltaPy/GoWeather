import React, { Component } from 'react';
import WeatherDataService from "../../services/weather.service";
import { faArrowRight, faArrowLeft, faTemperatureLow, faTemperatureHigh, faWind, faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sunny from "../../images/icons/sun.png";

import './settimana.css';

export default class Settimana extends Component {
    constructor(props) {
        super(props);
        this.getGiorni = this.getGiorni.bind(this);

        this.state = {
            giorni: []
        };
    }

    componentDidMount() {
        this.getGiorni();
    }

    getGiorni() {
        WeatherDataService.getAll()
        .then(response => {
            this.setState({
                giorni: response.data
            });
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    weatherIcon() {

    }

    render() {
        const { giorni } = this.state;

        return (
            <div className="gridGiorni">
                <div className="gridButtonsContainer btn-group">
                    <button type="button" className="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <span className="gridButtons">03 Maggio / 09 Maggio</span>
                    <button type="button" className="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                
            <div className="gridWeekContainer m-3">
                {giorni.map((e, index) => (
                <div key={index} className="card">   
                    <div className="card-body">
                        <h5 className="card-title">{e.title}</h5>
                        <h5 className="card-title">23/04</h5>
                        <img src={sunny} className="card-img" alt={"weather"}/>
                        <div className="card-minMaxTemp mt-3">
                            <span>24 <FontAwesomeIcon icon={faTemperatureHigh}/></span>
                            <span>16 <FontAwesomeIcon icon={faTemperatureLow}/></span>
                        </div>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faTint}/> 0.3 mm</h5>
                        <h5 className="card-text mt-2"><FontAwesomeIcon icon={faWind}/> 10 m/s</h5>
                        <h5 className="card-text mt-2">Umidità:10 %</h5>
                    </div> 
                </div>
                ))}
            </div>
        </div>
        );
    }
}