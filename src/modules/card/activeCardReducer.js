/**
 * Created on 13-Apr-18.
 */
import initialState from '../../initialState';
import { LOAD_CARD_SUCCESS } from './actionTypes';


export default function activeCardReducer(state = initialState.card, action) {
  switch (action.type) {
    case LOAD_CARD_SUCCESS:
      return action.payload.card;

    default:
      return state;
  }
}
