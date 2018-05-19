/**
 * Created on 18-May-18.
 */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class NavigationBar extends React.Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to='/' activeClassName="active">Hunch Down</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/cards" activeClassName="active">
              <NavItem eventKey={1}>
                Cards
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/boxes" activeClassName="active">
              <NavItem eventKey={2}>
                Boxes
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
