/**
 * Created on 03-Aug-18.
 */
import _ from 'lodash';
import * as actions from './actions';
import * as types from './actionTypes';
import reducer from './reducer';
import initialState from '../../initialState';
import { generateBox } from '../../utils/test/mockDataFactory';

describe('Box Reducer', () => {

  it('handles unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const expected = initialState.boxes;
    expect(reducer(undefined, action)).toEqual(expected);
  });


  it (`sets 'editing' values on ${types.EDIT_BOX} action`, () => {
    let newState = reducer(initialState.boxes , actions.openCreateBoxModal());
    expect(newState.editing.modalOpen).toBe(true);

    newState = reducer(newState, actions.closeCreateBoxModal());
    expect(newState.editing.modalOpen).toBe(false);
  });


  it(`updates state on ${types.LOAD_BOXES_SUCCESS} and returns the normalized version of 'boxes'`, () => {
    const initialState = {};
    const boxes = [
      generateBox(),
      generateBox()
    ];
    const expectedState = { byId: _.mapKeys(boxes, 'id') };
    const action = actions.loadBoxesSuccess(boxes);
    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.CREATE_BOX_SUCCESS} action`, () => {
    // const currentState = {
    //   35d925c1-bb39-4729-b59f-eb078f1e70d0: {
    //     id: '35d925c1-bb39-4729-b59f-eb078f1e70d0',
    //     title: 'Inspiration',
    //     description: 'blablabla'
    //   },
    // };
    const currentState = { byId: _.mapKeys([generateBox()], 'id') };
    const newBox = generateBox();
    const expectedState = {
      ...currentState,
      byId: {
        ...currentState.byId, [newBox.id]: newBox
      }
    };
    const action = actions.createBoxSuccess(newBox);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });


  it(`updates state on ${types.DELETE_BOX_SUCCESS} action`, () => {
    const boxes = [generateBox(), generateBox()];
    const currentState = { byId: _.mapKeys(boxes, 'id') };
    const deletingBox = boxes[1];
    const expectedState = {
      ...currentState,
      byId: _.omit(currentState.byId, deletingBox.id)
    };
    const action = actions.deleteBoxSuccess(deletingBox);
    const newState = reducer(currentState, action);

    expect(newState).toEqual(expectedState);
  });

});
