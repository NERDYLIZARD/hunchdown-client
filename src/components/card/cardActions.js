/**
 * Created on 27-Mar-18.
 */
import CardApi from '../../api/mockCardApi';
import * as types from '../../constants/actionTypes';

export const loadCardsSuccess = cards => ({type: types.LOAD_CARDS_SUCCESS, cards});

export const loadCards = () =>
  dispatch => {
    return CardApi.getAllCards()
    // return agents.Cards.requests.get()
      .then(cards => dispatch(loadCardsSuccess(cards)))
      .catch(err => {
        // dispatch LOAD_CARDS_FAILURE
        throw(err);
      });
  };
