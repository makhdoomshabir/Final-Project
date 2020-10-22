import React from 'react';
import {Form, Navbar, FormControl, Button, NavDropdown, Nav} from 'react-bootstrap';

export function Navigation() {
  return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <img alt="logo" src="https://i.imgur.com/smguoM3.png" width="100"/>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Cohort" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Software Development</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Cloud Computing</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">DevOps</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Robotic Process Automation</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Pega</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>

        <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                  <Button variant="outline-success">Search</Button>
          </Form>

          <Button variant="outline-success">Add Ticket</Button>

        </Navbar>
      </div>
  );
}