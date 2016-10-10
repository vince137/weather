import React from 'react';
import ReactDOM from 'react-dom';

var RecordComponent = React.createClass({
    records: {},

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
            }).catch((error) => {
                console.error(error);
            });
    },

    getTemperatureMin: function () {
        'temperature_min', 
    },

    getTemperatureMax: function () {
        'temperature_max', 
    },

    getHumidityMin: function () {
        'humidity_min',

    },

    getHumidityMax: function () {
        'humidity_max'
    },


    /**
     * Loaded at the start
     */
    componentDidMount: function () {
        this.getRecords();
    },

    render: function () {
        
        let temperatureMin = this.getTemperatureMin();
        let temperatureMax = this.getTemperatureMax();
        let getHumidityMin = this.getHumidityMin();
        let getHumidityMax = this.getHumidityMax();


        return (null);
    }

});
export default RecordComponent;