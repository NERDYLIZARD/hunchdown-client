import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import cards from './modules/cards';

const reducers = combineReducers({
  [cards.constants.NAME]: cards.reducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
