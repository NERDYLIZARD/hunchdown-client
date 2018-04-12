/**
 * Created on 27-Mar-18.
 */
import initialState from "../../constants/initialState";
import { CREATE_CARD_SUCCESS, LOAD_CARDS_SUCCESS } from "../../constants/actionTypes";
import _ from 'lodash';

export default function cardReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      // turn array to associative array having 'id' as key
      return _.mapKeys(action.payload.cards, 'id');

    case CREATE_CARD_SUCCESS:
      return { ...state, [action.payload.card.id]: action.payload.card };

    default:
      return state;
  }
}
