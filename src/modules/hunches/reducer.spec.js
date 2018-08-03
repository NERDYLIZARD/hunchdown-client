/**
 * Created on 06-Apr-18.
 */

import _ from 'lodash';
import * as actions from './actions';
import * as types from './actionTypes';
import reducer from './reducer';
import initialState from '../../initialState';
import { generateHunch } from '../../utils/test/mockDataFactory';

describe('Hunch Reducer', () => {

  it('handles unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.hunches;
    expect(reducer(undefined, action)).toEqual(expected);
  });


  it (`sets editing values on ${types.EDIT_HUNCH} action`, () => {
    const hunch = generateHunch();

    let newState = reducer(initialState.hunches , actions.openHunchEditorModal(hunch));
    expect(newState.editing.modalOpen).toBe(true);
    expect(newState.editing.hunch).toEqual(hunch);

    newState = reducer(newState, actions.closeHunchEditorModal());
    expect(newState.editing.modalOpen).toBe(false);
  });


  it(`updates state on ${types.LOAD_HUNCHES_SUCCESS} action and return the normalized version of hunches`, () => {
    const initialState = {};
    const hunches = [
      generateHunch(),
      generateHunch()
    ];
    const expectedState = { byId: _.mapKeys(hunches, 'id') };
    const action = actions.loadHunchesSuccess(hunches);
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.LOAD_HUNCH_SUCCESS} action`, () => {

    const currentState = { byId: _.mapKeys([generateHunch()], 'id') };
    const loadedHunch = generateHunch();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [loadedHunch.id]: loadedHunch
      }
    };
    const action = actions.loadHunchSuccess(loadedHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.CREATE_HUNCH_SUCCESS} action`, () => {
    // const currentState = {
    //   35d925c1-bb39-4729-b59f-eb078f1e70d0: {
    //     id: '35d925c1-bb39-4729-b59f-eb078f1e70d0',
    //     slug: 'abc-def',
    //     wisdom: 'Abc dEf',
    //     attribute: 'hoppy'
    //   },
    // };
    const currentState = { byId: _.mapKeys([generateHunch()], 'id') };
    const newHunch = generateHunch();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [newHunch.id]: newHunch
      }
    };
    const action = actions.createHunchSuccess(newHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.UPDATE_HUNCH_SUCCESS} action`, () => {
    const hunch = generateHunch();
    const currentState = { byId: _.mapKeys([hunch], 'id') };
    const updatingHunch = { ...hunch, wisdom: 'updated wisdom' };
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [updatingHunch.id]: updatingHunch
      }
    };
    const action = actions.updateHunchSuccess(updatingHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.DELETE_HUNCH_SUCCESS} action`, () => {
    const hunches = [generateHunch(), generateHunch()];
    const currentState = { byId: _.mapKeys(hunches, 'id') };
    const deletingHunch = hunches[1];
    const expectedState = {
      ...currentState,
      byId: _.omit(currentState.byId, deletingHunch.id)
    };
    const action = actions.deleteHunchSuccess(deletingHunch);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

});
