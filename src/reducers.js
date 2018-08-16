import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import hunches from './modules/hunches';
import boxes from './modules/boxes';
import entitiesReducer from './modules/app/entitiesReducer';

const reducers = combineReducers({
  [hunches.constants.NAME]: hunches.reducer,
  [boxes.constants.NAME]: boxes.reducer,
  entities: entitiesReducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
