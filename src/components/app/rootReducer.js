import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cards from '../card/cardReducer';
import activeCard from '../card/activeCardReducer';

const rootReducer = combineReducers({
  cards,
  activeCard,
  routing: routerReducer,
});

export default rootReducer;
