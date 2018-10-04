/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../common/NavigationBar';
import HomePage from '../pages/HomePage';
import HunchPage from '../hunches/HunchPage';
import NotFoundPage from '../pages/NotFoundPage';
import BoxPage from '../boxes/BoxPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/boxes/:id" component={HunchPage} />
          <Route path="/boxes" component={BoxPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
