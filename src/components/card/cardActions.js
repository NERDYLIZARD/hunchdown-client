/**
 * Created on 27-Mar-18.
 */
import CardApi from '../../api/mockCardApi';
import * as types from '../../constants/actionTypes';
import agent from '../../agent';

export const loadCardsSuccess = cards => ({ type: types.LOAD_CARDS_SUCCESS, payload: { cards } });
export const loadCardSuccess = card => ({ type: types.LOAD_CARD_SUCCESS, payload: { card } });
export const createCardSuccess = card => ({ type: types.CREATE_CARD_SUCCESS, payload: { card } });
export const updateCardSuccess = card => ({ type: types.UPDATE_CARD_SUCCESS, payload: { card } });
export const deleteCardSuccess = card => ({ type: types.DELETE_CARD_SUCCESS, payload: { card } });

export const loadCards = () =>
  dispatch => {
    return agent.Cards.find()
      .then(cards => dispatch(loadCardsSuccess(cards)))
      .catch(error => {
        throw(error)
      });
  };

export const loadCard = (id) =>
  dispatch => {
    return agent.Cards.get(id)
      .then(card => dispatch(loadCardSuccess(card)))
      .catch(error => {
        throw(error)
      });
  };

export const saveCard = (card) =>
  dispatch => {
    return CardApi.saveCard(card)
    // return agents.Cards.requests.post()
      .then(savedCard => card.id ?
        dispatch(updateCardSuccess(savedCard)) :
        dispatch(createCardSuccess(savedCard)))
      .catch(error => {
        throw(error)
      });
  };

export const deleteCard = (card) =>
  dispatch => {
    return agent.Cards.delete(card.id)
      .then(() => dispatch(deleteCardSuccess(card)))
      .catch(error => {
        throw(error)
      });
  };
