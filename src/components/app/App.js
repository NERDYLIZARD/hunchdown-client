/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from '../common/NavigationBar';
import HomePage from '../pages/HomePage';
import HunchPage from '../boxes/BoxDetail';
import NotFoundPage from '../pages/NotFoundPage';
import BoxPage from '../boxes/BoxPage';
import Modal from '../common/Modal';
import BoxSelectionForm from "../editor/BoxSelectionForm";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component
{
  render () {
    return (
      <div>
        <NavigationBar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/boxes/:id" component={HunchPage}/>
          <Route path="/boxes" component={BoxPage}/>
          <Route path="/test" component={BoxSelectionForm}/>
          <Route component={NotFoundPage}/>
        </Switch>
        <Modal/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
