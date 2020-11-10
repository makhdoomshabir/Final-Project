import React, {Component} from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Link, NavLink} from "react-router-dom";
import logo from './images/qalogo-removebg-preview (1).png';

export class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cohortFilter: ""
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
                            <img src={logo} width="50"/>
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

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <a>
                                <Button variant="outline-success">Search</Button>
                            </a>

                        </Form>

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