/**
 * Created on 27-Mar-18.
 */
import * as types from '../../constants/actionTypes';
import CardService from '../../services/CardService';

export const loadCardsSuccess = cards => ({ type: types.LOAD_CARDS_SUCCESS, payload: { cards } });
export const loadCardSuccess = card => ({ type: types.LOAD_CARD_SUCCESS, payload: { card } });
export const createCardSuccess = card => ({ type: types.CREATE_CARD_SUCCESS, payload: { card } });
export const updateCardSuccess = card => ({ type: types.UPDATE_CARD_SUCCESS, payload: { card } });
export const deleteCardSuccess = card => ({ type: types.DELETE_CARD_SUCCESS, payload: { card } });

export const loadCards = () =>
  dispatch => {
    return CardService.find()
      .then(cards => dispatch(loadCardsSuccess(cards)))
      .catch(error => {
        throw(error)
      });
  };

export const loadCard = (slug) =>
  dispatch => {
    return CardService.get(slug)
      .then(card => dispatch(loadCardSuccess(card)))
      .catch(error => {
        throw(error)
      });
  };

export const createCard = (card) =>
  dispatch => {
    return CardService.create(card)
      .then(savedCard => dispatch(createCardSuccess(savedCard)))
      .catch(error => {
        throw(error)
      });
  };

export const updateCard = (card) =>
  dispatch => {
    return CardService.update(card)
      .then(savedCard => dispatch(updateCardSuccess(savedCard)))
      .catch(error => {
        throw(error)
      });
  };

export const deleteCard = (card) =>
  dispatch => {
    return CardService.delete(card)
      .then(() => dispatch(deleteCardSuccess(card)))
      .catch(error => {
        throw(error)
      });
  };
