/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as actions from './actions';
import * as types from './actionTypes';
import reducer from './reducer';
import initialState from '../../initialState';
import mockDataFactory from '../../utils/test/mockDataFactory';

describe('Card Reducer', () => {

  it('handle unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.cards;
    expect(reducer(undefined, action)).toEqual(expected);
  });


  it (`should set editing values on ${types.EDIT_CARD} action`, () => {
    const card = mockDataFactory.createCard();
    const action = actions.openCardEditorModal(card);

    let newState = reducer(initialState.cards , action);
    expect(newState.editing.modalOpen).toBe(true);
    expect(newState.editing.card).toEqual(card);

    newState = reducer(newState, actions.closeCardEditorModal());
    expect(newState.editing.modalOpen).toBe(false);
  });


  it(`should update state on ${types.LOAD_CARDS_SUCCESS} action and return the normalized version of cards`, () => {
    const initialState = {};
    const cards = [
      mockDataFactory.createCard(),
      mockDataFactory.createCard()
    ];
    const expectedState = { byId: _.mapKeys(cards, 'slug') };
    const action = actions.loadCardsSuccess(cards);
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.LOAD_CARD_SUCCESS} action`, () => {

    const currentState = { byId: _.mapKeys([mockDataFactory.createCard()], 'slug') };
    const loadedCard = mockDataFactory.createCard();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [loadedCard.slug]: loadedCard
      }
    };
    const action = actions.loadCardSuccess(loadedCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.CREATE_CARD_SUCCESS} action`, () => {
    // const currentState = {
    //   abc: {
    //     slug: 'abc',
    //     wisdom: 'abc',
    //     attribute: '123'
    //   },
    // };
    const currentState = { byId: _.mapKeys([mockDataFactory.createCard()], 'slug') };
    const newCard = mockDataFactory.createCard();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [newCard.slug]: newCard
      }
    };
    const action = actions.createCardSuccess(newCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.UPDATE_CARD_SUCCESS} action`, () => {
    const card = mockDataFactory.createCard();
    const currentState = { byId: _.mapKeys([card], 'slug') };
    const updatingCard = { ...card, wisdom: 'updated wisdom' };
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [updatingCard.slug]: updatingCard
      }
    };
    const action = actions.updateCardSuccess(updatingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.DELETE_CARD_SUCCESS} action`, () => {
    const cards = [mockDataFactory.createCard(), mockDataFactory.createCard()];
    const currentState = { byId: _.mapKeys(cards, 'slug') };
    const deletingCard = cards[1];
    const expectedState = {
      ...currentState,
      byId: _.omit(currentState.byId, deletingCard.slug)
    };
    const action = actions.deleteCardSuccess(deletingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

});
