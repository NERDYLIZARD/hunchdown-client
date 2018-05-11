/**
 * Created on 27-Mar-18.
 */
import initialState from "../../constants/initialState";
import {
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARD_SUCCESS
} from "../../constants/actionTypes";
import _ from 'lodash';

export default function cardReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      // turn array to associative array having 'slug' as key
      return _.mapKeys(action.payload.cards, 'slug');

    case CREATE_CARD_SUCCESS:
      return { ...state, [action.payload.card.slug]: action.payload.card };

    case UPDATE_CARD_SUCCESS:
      return { ...state, [action.payload.card.slug]: action.payload.card };

    case DELETE_CARD_SUCCESS:
      return _.omit(state, action.payload.card.slug);

    default:
      return state;
  }
}
