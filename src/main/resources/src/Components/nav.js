import React from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Link, NavLink} from "react-router-dom";
import logo from './images/qalogo-removebg-preview (1).png';

export function Navigation() {
  return (
      <div>
          <Router>
        <Navbar className="bg-dark text-white" expand="lg">
          <Link to="/" classname="bg-dark text-white" expand="lg">
              <img src={logo} width="50"/>
        </Link>
         

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Cohort" id="collasible-nav-dropdown" >
                  <Link className="dropdown-item" to="/software-development">Software Development</Link>
                  <Link className="dropdown-item" to="/cloud-computing">Cloud Computing</Link>
                  <Link className="dropdown-item" to="/dev-ops">DevOps</Link>
                  <Link className="dropdown-item" to="/robotic-process-automation">Robotic Process Automation</Link>
                  <Link className="dropdown-item" to="/pega">Pega</Link>
              </NavDropdown>

            </Nav>
        </Navbar.Collapse>

        <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                  <Button variant="outline-success">Search</Button>
          </Form>

            <Link to="/add-ticket">
                <Button variant="outline-success" className="is-rounded">
                    <span>Add Ticket</span>
                </Button>
            </Link>

        </Navbar>
        </Router>
      </div>
  );
}

export default Navigation;