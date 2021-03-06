import React from 'react';

import {Panel, Table} from "react-bootstrap";
import moment from "moment";


var DashboardComponent = React.createClass({
    reports: {},


    /**
     * Set the initial state
     */
    getInitialState: function () {
        return {
            lastReport: {},
            reports: {},
            lastReports: {}
        };
    },

    /**
     * Get all reports from the api
     * @return promise
     */
    getReports: function () {
        return fetch('http://wd.dev/web/app_dev.php/api/reports')
            .then((response) => response.json())
            .then((responseJson) => {
                // Update the component data
                this.reports = responseJson;
                this.setLastReport();
                this.setLastReports();
            }).catch((error) => {
                console.error(error);
            });
    },

    /**
     * Define the last report used in real time
     * 
     */
    setLastReport: function () {
        return this.setState({ lastReport: this.reports[0] });
    },

    /**
     * Define the last reports used in the last reports panel
     */
    setLastReports: function () {
        return this.setState({ lastReports: this.reports });
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

        let reports = this.state.lastReports;

        var lastReports = Object.keys(reports).map(function (key) {
            return <tr>
                    <td>{moment(reports[key].date).format("DD-MM-YYYY à HH:mm")}</td>
                    <td>{reports[key].temperature}°C</td>
                    <td>{reports[key].humidity}%</td>
                    </tr>;
        });

        return (
            <div className="dashboard">
                <h1> Dashboard </h1>
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
                        Dernière mise à jour le {moment(this.state.lastReport.date).format("DD-MM-YYYY à HH:mm") }.
                    </div>
                </Panel>
                <Panel className="list">
                    <h2> Derniers relevés </h2>
                    <Table className="text-center"><thead className="text-center"><tr><th>Date du relevé</th><th>Température</th><th>Humidité</th></tr></thead><tbody>{lastReports}</tbody></Table>
                </Panel>
            </div>
        );
    }

});

export default DashboardComponent;