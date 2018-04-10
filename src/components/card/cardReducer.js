/**
 * Created on 27-Mar-18.
 */
import initialState from "../../constants/initialState";
import {LOAD_CARDS_SUCCESS} from "../../constants/actionTypes";

export default function cardReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return action.cards;
    default:
      return state;
  }
}
