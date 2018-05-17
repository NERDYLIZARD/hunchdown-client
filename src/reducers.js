import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import cards from './modules/card/reducer';

const reducers = combineReducers({
  cards,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
