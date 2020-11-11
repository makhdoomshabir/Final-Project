import React, {Component} from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav, InputGroup, Card} from 'react-bootstrap';
import {BrowserRouter as Router, Link, NavLink} from "react-router-dom";
import logo from './images/qalogo.png';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

export class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cohortFilter: "",
            keyword: ''
        }
    }

    handleChange = (cohort) => {
        this.setState({
            cohortFilter: cohort.target.value
        })
        //this.props.onChange(event.target.value)
    }


    render() {
        return (
            <div>
                <Router>
                    <Navbar className="bg-dark text-white" expand="lg">
                        <a href="/" className="bg-dark text-white" expand="lg">
                            <img src={logo} width="75"/>
                        </a>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <NavDropdown title="Cohort" id="collasible-nav-dropdown">
                                    <a className="dropdown-item" href="/Azure-Devops">Azure Devops - (20OctDevOps1)</a>
                                    <a className="dropdown-item" href="/Software-BAE">Software BAE - (20OCTBAE2)</a>
                                    <a className="dropdown-item" href="/SDET">SDET - (20OCTSDET3</a>
                                    <a className="dropdown-item" href="/Cloud-Native-Engineer">Cloud Native Engineer -
                                        (20SeptCNE)</a>
                                    <a className="dropdown-item" href="/Scala">Scala - (20NovSoftware1)</a>
                                </NavDropdown>

                            </Nav>
                        </Navbar.Collapse>


                        <a href="/add-ticket">
                            <Button variant="outline-success" className="is-rounded">
                                <span>Add Ticket</span>
                            </Button>
                        </a>

                    </Navbar>
                </Router>
            </div>
        );
    }
}

export default Navigation;