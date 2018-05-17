/**
 * Created on 13-Apr-18.
 */
import * as actions from './actions';
import reducer from './activeCardReducer';
import initialState from '../../initialState';
import mockDataFactory from '../../utils/test/mockDataFactory';

describe('Active Card Reducer', () => {

  it('handle unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.card;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should update state on LOAD_CARD_SUCCESS action and return the normalized version of card', () => {
    const card = mockDataFactory.createCard();
    const expectedState = card;
    const action = actions.loadCardSuccess(card);
    const newState = reducer(initialState.card, action);

    expect(newState).toEqual(expectedState);
  });

});
