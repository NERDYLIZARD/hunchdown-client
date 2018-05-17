/**
 * Created on 27-Mar-18.
 */
import * as types from './actionTypes';

export const loadCards = () => ({ type: types.LOAD_CARDS });
export const loadCardsSuccess = cards => ({ type: types.LOAD_CARDS_SUCCESS, payload: { cards } });

export const loadCard = (slug) => ({ type: types.LOAD_CARD, slug });
export const loadCardSuccess = card => ({ type: types.LOAD_CARD_SUCCESS, payload: { card } });

export const createCard = (card) => ({ type: types.CREATE_CARD, card });
export const createCardSuccess = card => ({ type: types.CREATE_CARD_SUCCESS, payload: { card } });

export const updateCard = (card) => ({ type: types.UPDATE_CARD, card });
export const updateCardSuccess = card => ({ type: types.UPDATE_CARD_SUCCESS, payload: { card } });

export const deleteCard = (card) => ({ type: types.DELETE_CARD, card });
export const deleteCardSuccess = card => ({ type: types.DELETE_CARD_SUCCESS, payload: { card } });

export const openCardEditorModal = card => ({
  type: types.EDIT_CARD,
  editing: {
    modalOpen: true,
    card
  }
});

export const closeCardEditorModal = () => ({ type: types.EDIT_CARD, editing: { modalOpen: false } });
