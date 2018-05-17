/**
 * Created on 06-Apr-18.
 */

import * as actions from './actions';
import reducer from './reducer';
import initialState  from '../../initialState';
import _ from 'lodash';
import mockDataFactory from '../../utils/test/mockDataFactory';

describe('Card Reducer', () => {

  it('handle unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.cards;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should update state on LOAD_CARDS_SUCCESS action and return the normalized version of cards', () => {
    const cards = [
      mockDataFactory.createCard(),
      mockDataFactory.createCard()
    ];
    const expectedState = _.mapKeys(cards, 'slug');
    const action = actions.loadCardsSuccess(cards);
    const newState = reducer(initialState.cards, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on CREATE_CARD_SUCCESS action', () => {
    // const currentState = {
    //   abc: {
    //     slug: 'abc',
    //     wisdom: 'abc',
    //     attribute: '123'
    //   },
    // };
    const currentState = _.mapKeys([mockDataFactory.createCard()], 'slug');
    const newCard = mockDataFactory.createCard();
    const expectedState = { ...currentState, [newCard.slug]: newCard };
    const action = actions.createCardSuccess(newCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on UPDATE_CARD_SUCCESS action', () => {
    const card = mockDataFactory.createCard();
    const currentState = _.mapKeys([card], 'slug');
    const updatingCard = { ...card, wisdom: 'updated wisdom' };
    const expectedState = _.mapKeys([updatingCard], 'slug');
    const action = actions.updateCardSuccess(updatingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on DELETE_CARD_SUCCESS action', () => {
    const cards = [mockDataFactory.createCard(), mockDataFactory.createCard()];
    const currentState = _.mapKeys(cards, 'slug');
    const deletingCard = cards[1];
    const expectedState = _.omit(currentState, deletingCard.slug);
    const action = actions.deleteCardSuccess(deletingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

});
