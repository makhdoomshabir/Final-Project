import React from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Link, NavLink} from "react-router-dom";
import logo from './images/qalogo-removebg-preview (1).png';

export function Navigation() {
  return (
      <div>
          <Router>
        <Navbar className="bg-dark text-white" expand="lg">

          <a href="/" className="bg-dark text-white" expand="lg">
              <img src={logo} width="50"/>
          </a>
         

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Cohort" id="collasible-nav-dropdown" >
                  <a className="dropdown-item" href="/software-development">Software Development</a>
                  <a className="dropdown-item" href="/cloud-computing">Cloud Computing</a>
                  <a className="dropdown-item" href="/dev-ops">DevOps</a>
                  <a className="dropdown-item" href="/robotic-process-automation">Robotic Process Automation</a>
                  <a className="dropdown-item" href="/pega">Pega</a>
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

export default Navigation;