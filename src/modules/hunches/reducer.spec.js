/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as actions from './actions';
import * as types from './actionTypes';
import reducer from './reducer';
import initialState from '../../initialState';
import mockDataFactory from '../../utils/test/mockDataFactory';

describe('Hunch Reducer', () => {

  it('handle unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.hunches;
    expect(reducer(undefined, action)).toEqual(expected);
  });


  it (`should set editing values on ${types.EDIT_HUNCH} action`, () => {
    const hunch = mockDataFactory.createHunch();
    const action = actions.openHunchEditorModal(hunch);

    let newState = reducer(initialState.hunches , action);
    expect(newState.editing.modalOpen).toBe(true);
    expect(newState.editing.hunch).toEqual(hunch);

    newState = reducer(newState, actions.closeHunchEditorModal());
    expect(newState.editing.modalOpen).toBe(false);
  });


  it(`should update state on ${types.LOAD_HUNCHES_SUCCESS} action and return the normalized version of hunches`, () => {
    const initialState = {};
    const hunches = [
      mockDataFactory.createHunch(),
      mockDataFactory.createHunch()
    ];
    const expectedState = { byId: _.mapKeys(hunches, 'slug') };
    const action = actions.loadHunchesSuccess(hunches);
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.LOAD_HUNCH_SUCCESS} action`, () => {

    const currentState = { byId: _.mapKeys([mockDataFactory.createHunch()], 'slug') };
    const loadedHunch = mockDataFactory.createHunch();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [loadedHunch.slug]: loadedHunch
      }
    };
    const action = actions.loadHunchSuccess(loadedHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.CREATE_HUNCH_SUCCESS} action`, () => {
    // const currentState = {
    //   abc: {
    //     slug: 'abc',
    //     wisdom: 'abc',
    //     attribute: '123'
    //   },
    // };
    const currentState = { byId: _.mapKeys([mockDataFactory.createHunch()], 'slug') };
    const newHunch = mockDataFactory.createHunch();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [newHunch.slug]: newHunch
      }
    };
    const action = actions.createHunchSuccess(newHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.UPDATE_HUNCH_SUCCESS} action`, () => {
    const hunch = mockDataFactory.createHunch();
    const currentState = { byId: _.mapKeys([hunch], 'slug') };
    const updatingHunch = { ...hunch, wisdom: 'updated wisdom' };
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [updatingHunch.slug]: updatingHunch
      }
    };
    const action = actions.updateHunchSuccess(updatingHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`should update state on ${types.DELETE_HUNCH_SUCCESS} action`, () => {
    const hunches = [mockDataFactory.createHunch(), mockDataFactory.createHunch()];
    const currentState = { byId: _.mapKeys(hunches, 'slug') };
    const deletingHunch = hunches[1];
    const expectedState = {
      ...currentState,
      byId: _.omit(currentState.byId, deletingHunch.slug)
    };
    const action = actions.deleteHunchSuccess(deletingHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

});
