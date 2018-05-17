/**
 * Created on 27-Mar-18.
 */
import * as types from './actionTypes';

export const loadCards = () => ({ type: types.LOAD_CARDS });
export const loadCardsSuccess = cards => ({ type: types.LOAD_CARDS_SUCCESS, payload: { cards } });

export const loadCard = (slug) => ({ type: types.LOAD_CARD, slug });
export const loadCardSuccess = card => ({ type: types.LOAD_CARD_SUCCESS, payload: { card } });

export const createCard = ({ card, redirectLocation }) => ({ type: types.CREATE_CARD, card, redirectLocation });
export const createCardSuccess = card => ({ type: types.CREATE_CARD_SUCCESS, payload: { card } });

export const updateCard = ({ card, redirectLocation }) => ({ type: types.UPDATE_CARD, card, redirectLocation });
export const updateCardSuccess = card => ({ type: types.UPDATE_CARD_SUCCESS, payload: { card } });

export const deleteCard = (card) => ({ type: types.DELETE_CARD, card });
export const deleteCardSuccess = card => ({ type: types.DELETE_CARD_SUCCESS, payload: { card } });
