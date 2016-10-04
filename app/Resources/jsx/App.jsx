import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import DashboardComponent from './DashboardComponent.jsx';
import NavbarInstance from './NavbarInstance.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// Define App
var App = React.createClass({
    render: function () {
        return(
            <Router history={hashHistory}>
                <Route path='/' component={DashboardComponent} />
            </Router>);
    }
});
ReactDOM.render(<App/>, document.getElementById('app')); 

// Render the navbar
ReactDOM.render(<NavbarInstance />, document.getElementById("navbar"));