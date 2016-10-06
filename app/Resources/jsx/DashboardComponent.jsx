import React from 'react';

import {Panel} from "react-bootstrap";
import moment from "moment";


var DashboardComponent = React.createClass({
    reports: {},


    /**
     * Set the initial state
     */
    getInitialState: function () {
        return {
            lastReport: {},
            reports: {}
        };
    },

    /**
     * Get all reports from the api
     * @return promise
     */
    getReports: function () {
        return fetch('http://191.168.35.187/weather/web/app_dev.php/api/reports')
            .then((response) => response.json())
            .then((responseJson) => {
                // Update the component data
                this.reports = responseJson;
                this.setLastReport();
            }).catch((error) => {
                console.error(error);
            });
    },

    setLastReport: function () {
        return this.setState({ lastReport: this.reports[0] });
    },

    /**
     * Loaded at the start
     */
    componentDidMount: function () {
        this.getReports();
    },

    /**
     * Render to the view
     */
    render: function () {
        return (
            <div className="dashboard">                
                <Panel className="real_time">
                    <h2> Données en temps réel </h2>
                    <div className="real_time_releve last_temperature">
                        {this.state.lastReport.temperature}°C <br/>
                        <span className='real_time_name'> Température </span>
                    </div>
                    <div className="real_time_releve last_humidity"> 
                        {this.state.lastReport.humidity}% <br/>
                        <span className='real_time_name'> Humidité relative </span>
                    </div>
                    <div className="last_update">
                        Dernière mise à jour le {moment(this.state.lastReport.date).format("DD-MM-YYYY à HH:mm")}.
                    </div>
                </Panel>
            </div>
        );
    }

});

export default DashboardComponent;