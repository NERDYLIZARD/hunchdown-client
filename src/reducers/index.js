import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import entities from './entities';
import hunches from './hunches';
import boxes from './boxes';

const rootReducer = combineReducers({
  boxes,
  hunches,
  entities,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
