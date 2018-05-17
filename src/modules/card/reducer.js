/**
 * Created on 27-Mar-18.
 */
import initialState from '../../initialState';
import {
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS, EDIT_CARD,
  LOAD_CARDS_SUCCESS,
  LOAD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
} from "./actionTypes";
import _ from 'lodash';


export default function cardReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      // turn array to associative array having 'slug' as key
      return {
        ...state,
        byId: _.mapKeys(action.payload.cards, 'slug')
      };

    case LOAD_CARD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.payload.card.slug]: action.payload.card
        }
      };

    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.payload.card.slug]: action.payload.card
        }
      };

    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.payload.card.slug]: action.payload.card
        }
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        byId: _.omit(state.byId, action.payload.card.slug)
      };

    case EDIT_CARD:
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.editing
        }
      };

    default:
      return state;
  }
}
