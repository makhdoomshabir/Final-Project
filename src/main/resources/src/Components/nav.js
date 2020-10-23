import React from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
// import logo from './images/qalogo-removebg-preview (1).png';

export function Navigation() {
  return (
      <div>
        <Navbar className="bg-dark text-white" expand="lg">
          <Navbar.Brand tag={Link} to="/">
              {/*<img alt="logo" src={logo} width="50"/>*/}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Cohort" id="collasible-nav-dropdown">
                <NavDropdown.Item tag={Link} to="/software-development">Software Development</NavDropdown.Item>
                <NavDropdown.Item tag={Link} to="/cloud-computing">Cloud Computing</NavDropdown.Item>
                <NavDropdown.Item tag={Link} to="/dev-ops">DevOps</NavDropdown.Item>
                <NavDropdown.Item tag={Link} to="/robotic-process-automation">Robotic Process Automation</NavDropdown.Item>
                <NavDropdown.Item tag={Link} to="/pega">Pega</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>

        <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                  <Button variant="outline-success">Search</Button>
          </Form>

          <Button variant="outline-success" tag={Link} to="/add-ticket">Add Ticket</Button>

        </Navbar>
      </div>
  );
}

export default Navigation;