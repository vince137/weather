import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

export default class navbarInstance extends React.Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Weather</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#/">Dashboard</NavItem>
                        <NavItem eventKey={2} href="#/record">Records</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}