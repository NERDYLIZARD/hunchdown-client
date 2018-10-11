/**
 * Created on 10-Oct-18.
 */
import reducer, { initialState } from './modal';
import * as types from '../actions/types/modal';

describe('Modal Reducer', () => {

  it('handles unknown action', () => {
    const action = {type: 'UNKNOWN'};
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it(`${types.SHOW_MODAL} action: return {modalType, modalProps}`, () => {
    const action = {
      type: types.SHOW_MODAL,
      modalType: 'FOO_MODAL',
      modalProps: {}
    };
    const expectedState = {
      modalType: 'FOO_MODAL',
      modalProps: {}
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it(`${types.HIDE_MODAL} action: return initial state`, () => {
    const action = {
      type: types.HIDE_MODAL,
    };
    expect(reducer(initialState, action)).toEqual(initialState);
  });

});
