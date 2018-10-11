import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import entities from './entities';
import hunches from './hunches';
import boxes from './boxes';
import modal from './modal';

const rootReducer = combineReducers({
  boxes,
  hunches,
  entities,
  modal,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
