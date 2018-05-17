import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cards from './modules/card/reducer';
import activeCard from './modules/card/activeCardReducer';

const reducers = combineReducers({
  cards,
  activeCard,
  routing: routerReducer,
});

export default reducers;
