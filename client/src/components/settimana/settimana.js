import React, { Component } from 'react';
import WeatherDataService from "../../services/weather.service";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './settimana.css'

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

    


    render() {
        const { giorni } = this.state;

        return (
            <div className="gridGiorni">
                <div className="gridButtonsContainer btn-group">
                    <button type="button" class="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowLeft}/></button>
                    <span className="gridButtons">03 Maggio / 09 Maggio</span>
                    <button type="button" class="btn btn-primary gridButtons"><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                
            <div className="test">
                {/* <ul className="list-group flex-row">
                    {giorni.map(e => 
                        (<li className="list-group-item">{e.title}</li>)
                    )}
                </ul> */}
            </div>
        </div>
        );
    }
}