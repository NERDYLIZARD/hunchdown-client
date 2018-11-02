/**
 * Created on 18-May-18.
 */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
/* eslint-disable import/no-named-as-default */
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

class NavigationBar extends React.Component
{
  render () {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <LinkContainer to="/" activeClassName="active">
          <Navbar.Brand>HunchDown</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-navigation-bar"/>
        <Navbar.Collapse id="main-navigation-bar">
          <Nav className="mr-auto">
            <LinkContainer to="/boxes" activeClassName="active">
              <Nav.Link>Boxes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" activeClassName="active">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
