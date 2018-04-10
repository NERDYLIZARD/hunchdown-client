/**
 * Created on 27-Mar-18.
 */
import CardApi from '../../api/mockCardApi';
import * as types from '../../constants/actionTypes';

export const loadCardsSuccess = cards => ({type: types.LOAD_CARDS_SUCCESS, cards});

export const loadCards = () =>
  dispatch => {
    return CardApi.getAllCards()
      .then(cards => dispatch(loadCardsSuccess(cards)))
      .catch(err => {
        throw(err);
      });
  };
