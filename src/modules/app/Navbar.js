/**
 * Created on 18-May-18.
 */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink to="/" className="navbar-brand" activeClassName="active">HunchDown</NavLink>
          </div>

          <div className="collapse navbar-collapse">

            <ul className="nav navbar-nav">
              <li><NavLink to="/cards">Cards</NavLink></li>
            </ul>

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {

};

export default Navbar;
