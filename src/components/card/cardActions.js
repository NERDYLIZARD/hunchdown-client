/**
 * Created on 27-Mar-18.
 */
import CardApi from '../../api/mockCardApi';
import * as types from '../../constants/actionTypes';

export const loadCardsSuccess = cards => ({ type: types.LOAD_CARDS_SUCCESS, payload: { cards } });
export const createCardSuccess = card => ({ type: types.CREATE_CARD_SUCCESS, payload: { card } });

export const loadCards = () =>
  dispatch => {
    return CardApi.getAllCards()
    // return agents.Cards.requests.get()
      .then(cards => dispatch(loadCardsSuccess(cards)))
      .catch(error => {
        throw(error)
      })
  };

export const saveCard = (card) =>
  dispatch => {
    return CardApi.saveCard(card)
    // return agents.Cards.requests.post()
      .then(card => dispatch(createCardSuccess(card)))
      .catch(error => {
        throw(error)
      })
  };

