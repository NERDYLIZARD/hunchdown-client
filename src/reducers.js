import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import hunches from './modules/hunches';

const reducers = combineReducers({
  [hunches.constants.NAME]: hunches.reducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
