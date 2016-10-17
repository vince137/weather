import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from "react-bootstrap";
import moment from "moment";

var RecordComponent = React.createClass({
    records: {},

    /**
     * Set the initial state
     */
    getInitialState: function () {
        return {
            records: {
                'temperature_min': {},
                'temperature_max': {},
                'humidity_min': {},
                'humidity_max': {}
            }
        };
    },

    /**
     * Get all Record from the api
     * @return promise
     */
    getRecords: function () {
        return fetch('http://wd.dev/web/app_dev.php/api/records')
            .then((response) => response.json())
            .then((responseJson) => {
                // Update the component data
                this.records = responseJson;
                this.setRecords();
            }).catch((error) => {
                console.error(error);
            });
    },


    getTemperatureMin: function () {
        var temperatureMin = {};

        // Define all records
        for (let i = 0; i < 2; i++) {
            temperatureMin[i] = {};
            let temperatureMinimal = this.state.records['temperature_min'][i];
            if (typeof temperatureMinimal === "undefined") {
                temperatureMin[i]['temperature'] = 999;
            } else {
                temperatureMin[i]['temperature'] = this.state.records['temperature_min'][i].temperature;
                temperatureMin[i]['recordDate'] = this.state.records['temperature_min'][i].date;
            }
        }

        return {
            lastTemperatureMin: { temperature: temperatureMin[0]['temperature'], dateRecord: temperatureMin[0]['recordDate'] },
            pastLastTemperatureMin: { temperature: temperatureMin[1]['temperature'], dateRecord: temperatureMin[1]['recordDate'] }
        };

    },

    getTemperatureMax: function () {

        var temperatureMax = {};

        // Define all records
        for (let i = 0; i < 2; i++) {
            temperatureMax[i] = {};
            let temperatureMaximal = this.state.records['temperature_max'][i];
            if (typeof temperatureMaximal === "undefined") {
                temperatureMax[i]['temperature'] = 999;
            } else {
                temperatureMax[i]['temperature'] = this.state.records['temperature_max'][i].temperature;
                temperatureMax[i]['recordDate'] = this.state.records['temperature_max'][i].date;
            }
        }

        return {
            lastTemperatureMax: { temperature: temperatureMax[0]['temperature'], dateRecord: temperatureMax[0]['recordDate'] },
            pastLastTemperatureMax: { temperature: temperatureMax[1]['temperature'], dateRecord: temperatureMax[1]['recordDate'] }
        };
    },

    getHumidityMin: function () {

        var humidityMin = {};

        // Define all records
        for (let i = 0; i < 2; i++) {
            humidityMin[i] = {};
            let humidityMinimal = this.state.records['humidity_min'][i];
            if (typeof humidityMinimal === "undefined") {
                humidityMin[i]['humidity'] = 999;
            } else {
                humidityMin[i]['humidity'] = this.state.records['humidity_min'][i].humidity;
                humidityMin[i]['recordDate'] = this.state.records['humidity_min'][i].date;
            }
        }

        return {
            lastHumidityMin: { humidity: humidityMin[0]['humidity'], dateRecord: humidityMin[0]['recordDate'] },
            pastLastHumidityMin: { humidity: humidityMin[1]['humidity'], dateRecord: humidityMin[1]['recordDate'] }
        };
    },

    getHumidityMax: function () {

        var humidityMax = {};

        // Define all records
        for (let i = 0; i < 2; i++) {
            humidityMax[i] = {};
            let humidityMaximal = this.state.records['humidity_max'][i];
            if (typeof humidityMaximal === "undefined") {
                humidityMax[i]['humidity'] = 999;
            } else {
                humidityMax[i]['humidity'] = this.state.records['humidity_max'][i].humidity;
                humidityMax[i]['recordDate'] = this.state.records['humidity_max'][i].date;
            }
        }

        return {
            lastHumidityMax: { humidity: humidityMax[0]['humidity'], dateRecord: humidityMax[0]['recordDate'] },
            pastLastHumidityMax: { humidity: humidityMax[1]['humidity'], dateRecord: humidityMax[1]['recordDate'] }
        };

    },

    /**
     * Define the records
     */
    setRecords: function () {
        return this.setState({ records: this.records });
    },

    /**
     * Loaded at the start
     */
    componentDidMount: function () {
        this.getRecords();
    },

    render: function () {

        let records = this.state.records;

        let temperatureMin = this.getTemperatureMin();
        let temperatureMax = this.getTemperatureMax();
        let humidityMin = this.getHumidityMin();
        let humidityMax = this.getHumidityMax();

        return (<div className="records"> <h1> Records </h1>
            <Panel className="real_time">
                <h2> Records depuis toujours </h2>
                <div className="real_time_releve large record_temperature">
                    <span className='rubrique_text title_bloc'>
                        Records de température minimales
                    </span>
                    <hr />
                    <span className='rubrique_text'> Dernier record : </span> <br />
                    {temperatureMin.lastTemperatureMin.temperature}°C<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(temperatureMin.lastTemperatureMin.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                    <hr />
                    <span className='rubrique_text'> Ancien record : </span> <br />
                    {temperatureMin.pastLastTemperatureMin.temperature}°C<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(temperatureMin.pastLastTemperatureMin.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                </div>

                <div className="real_time_releve large record_temperature_max">
                    <span className='rubrique_text title_bloc'>
                        Records de température maximales
                    </span>
                    <hr />
                    <span className='rubrique_text'> Dernier record : </span> <br />
                    {temperatureMax.lastTemperatureMax.temperature}°C<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(temperatureMax.lastTemperatureMax.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                    <hr />
                    <span className='rubrique_text '> Ancien record : </span> <br />
                    {temperatureMax.pastLastTemperatureMax.temperature}°C<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(temperatureMax.pastLastTemperatureMax.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                </div>

                <div className="real_time_releve large record_temperature_max">
                    <span className='rubrique_text title_bloc'>
                        Records d'humidité minimale
                    </span>
                    <hr />
                    <span className='rubrique_text'> Dernier record : </span> <br />
                    {humidityMin.lastHumidityMin.humidity}% <br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(humidityMin.lastHumidityMin.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                    <hr />
                    <span className='rubrique_text'> Ancien record : </span> <br />
                    {humidityMin.pastLastHumidityMin.humidity}%<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(humidityMin.pastLastHumidityMin.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                </div>

                <div className="real_time_releve large record_temperature_max">
                    <span className='rubrique_text title_bloc'>
                        Records d'humidité maximale
                    </span>
                    <hr />
                    <span className='rubrique_text'> Dernier record : </span> <br />
                    {humidityMax.lastHumidityMax.humidity}% <br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(humidityMax.lastHumidityMax.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                    <hr />
                    <span className='rubrique_text'> Ancien record : </span> <br />
                    {humidityMax.pastLastHumidityMax.humidity}%<br />
                    <span className='real_time_name largeFont'>
                        Obtenu le : {moment(humidityMax.pastLastHumidityMax.dateRecord).format("DD-MM-YYYY à HH:mm")}
                    </span>
                </div>

            </Panel>
        </div>);
    }

});
export default RecordComponent;