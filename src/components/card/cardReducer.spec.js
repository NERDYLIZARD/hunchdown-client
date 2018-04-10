/**
 * Created on 06-Apr-18.
 */

import * as actions from './cardActions';
import reducer from './cardReducer';
import initialState from '../../constants/initialState';

describe('Card Reducer', () => {

  it('handle unknown action', () => {
    const action = {type: 'UNKNOWN'};
    const expected = initialState.cards;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should update state on LOAD_CARD_SUCCESS action', () => {
    const cards = [
      {
        wisdom: 'abc',
        attribute: '123'
      },
      {
        wisdom: 'def',
        attribute: '456'
      }
    ];
    const action = actions.loadCardsSuccess(cards);
    const newState = reducer(initialState.cards, action);

    expect(newState).toEqual(cards);
  });


});
