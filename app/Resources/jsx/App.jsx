import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import DashboardComponent from './DashboardComponent.jsx';
import RecordComponent from './RecordComponent.jsx';

import NavbarInstance from './NavbarInstance.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// Define App
var App = React.createClass({
    render: function () {
        return(null);
    }
});

// Render the app
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component = {DashboardComponent} />
        <Route path="record" component={RecordComponent} />
    </Router>, document.getElementById('app')); 

// Render the navbar
ReactDOM.render(<NavbarInstance />, document.getElementById("navbar"));