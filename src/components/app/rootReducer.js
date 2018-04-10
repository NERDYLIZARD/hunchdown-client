import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cards from '../card/cardReducer';

const rootReducer = combineReducers({
  cards,
  routing: routerReducer,
});

export default rootReducer;
