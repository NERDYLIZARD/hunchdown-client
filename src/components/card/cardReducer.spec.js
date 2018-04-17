/**
 * Created on 06-Apr-18.
 */

import * as actions from './cardActions';
import reducer from './cardReducer';
import initialState from '../../constants/initialState';
import _ from 'lodash';

describe('Card Reducer', () => {

  it('handle unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.cards;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should update state on LOAD_CARDS_SUCCESS action and return the normalized version of cards', () => {
    const cards = [
      {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
      {
        id: 'def',
        wisdom: 'def',
        attribute: '456'
      }
    ];
    const expectedState = _.mapKeys(cards, 'id');
    const action = actions.loadCardsSuccess(cards);
    const newState = reducer(initialState.cards, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on CREATE_CARD_SUCCESS action', () => {
    const currentState = {
      abc: {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
    };
    const newCard = {
      id: 'ghi',
      wisdom: 'ghi',
      attribute: '789'
    };
    const expectedState = {
      abc: {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
      ghi: {
        id: 'ghi',
        wisdom: 'ghi',
        attribute: '789'
      }
    };
    const action = actions.createCardSuccess(newCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on UPDATE_CARD_SUCCESS action', () => {
    const currentState = {
      abc: {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
    };
    const updatingCard = {
      id: 'abc',
      wisdom: 'ghi',
      attribute: '789'
    };
    const expectedState = {
      abc: {
        id: 'abc',
        wisdom: 'ghi',
        attribute: '789'
      }
    };
    const action = actions.updateCardSuccess(updatingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update state on UPDATE_CARD_SUCCESS action', () => {
    const currentState = {
      abc: {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
      def: {
        id: 'def',
        wisdom: 'def',
        attribute: '456'
      },
    };
    const deletingCard = {
      id: 'def',
      wisdom: 'def',
      attribute: '456'
    };
    const expectedState = {
      abc: {
        id: 'abc',
        wisdom: 'abc',
        attribute: '123'
      },
    };
    const action = actions.deleteCardSuccess(deletingCard);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


});
