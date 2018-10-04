/**
 * Created on 03-Aug-18.
 */
import * as types from '../actions/types/boxes';
import { activeReducer, editorReducer, paginationReducer } from './boxes';
import { initialState as activeInitialState } from './factories/active';
import { initialState as editorInitialState } from './factories/editor';
import { initialState as paginationInitialState } from './factories/pagination';
import { union, without } from 'lodash';

describe('Box Reducer', () => {

  describe('active', () => {
    const initialState = activeInitialState;

    it('handles unknown action', () => {
      const action = {type: 'UNKNOWN'};
      expect(activeReducer(undefined, action)).toEqual(initialState);
    });

    it(`${types.FETCH_BOX_REQUEST} action: updates 'isFetching' to 'true'`, () => {
      const action = {type: types.FETCH_BOX_REQUEST};
      const expectedState = {...initialState, isFetching: true};
      const newState = activeReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.FETCH_BOX_SUCCESS} & ${types.FETCH_BOX_FAILURE} actions: updates 'isFetching' to 'false'`, () => {
      const actions = [
        {type: types.FETCH_BOX_SUCCESS},
        {type: types.FETCH_BOX_FAILURE},
      ];
      actions.forEach(action => {
        const expectedState = {...initialState, isFetching: false};
        const newState = activeReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    });

    it(`${types.LOAD_BOX} action: updates 'id' to 'action.id'`, () => {
      const action = {
        type: types.LOAD_BOX,
        id: 'id#1'
      };
      const expectedState = {...initialState, id: action.id};
      const newState = activeReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.UNLOAD_BOX} action: return 'initialState'`, () => {
      const action = {type: types.UNLOAD_BOX,};
      expect(activeReducer(undefined, action)).toEqual(initialState);
    });
  });


  describe('editor', () => {
    const initialState = editorInitialState;

    it('handles unknown action', () => {
      const action = {type: 'UNKNOWN'};
      expect(editorReducer(undefined, action)).toEqual(initialState);
    });

    it(`${types.BOOST_BOX_EDITOR} action: updates 'isOpenedWithModal' according to 'action.withModal' and populate 'props' with 'action.data'`, () => {
      const action = {
        type: types.BOOST_BOX_EDITOR,
        withModal: true,
        data: {
          prop1: 'prop#1',
          prop2: 'prop#2'
        }
      };
      const expectedState = {
        ...initialState,
        isOpenedWithModal: action.withModal,
        props: action.data,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.RESUME_BOX_EDITOR_MODAL} action: updates 'isOpenedWithModal: true'`, () => {
      const action = {
        type: types.RESUME_BOX_EDITOR_MODAL,
      };
      const expectedState = {
        ...initialState,
        isOpenedWithModal: true,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.CLEAR_BOX_EDITOR} action: updates 'props: null'`, () => {
      const action = {
        type: types.CLEAR_BOX_EDITOR,
      };
      const expectedState = {
        ...initialState,
        props: null,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.CLOSE_BOX_EDITOR_MODAL} action: updates 'isOpenedWithModal: false' & 'props: action.retainedData`, () => {
      const action = {
        type: types.CLOSE_BOX_EDITOR_MODAL,
        retainedData: {
          prop1: 'prop#1',
          prop2: 'prop#2'
        }
      };
      const expectedState = {
        ...initialState,
        isOpenedWithModal: false,
        props: action.retainedData,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });


  describe('pagination', () => {
    const initialState = paginationInitialState;

    it('handles unknown action', () => {
      const action = {type: 'UNKNOWN'};
      expect(paginationReducer(undefined, action)).toEqual(initialState);
    });

    it(`${types.CREATE_BOX_REQUEST}, ${types.DELETE_BOX_REQUEST}, ${types.FETCH_BOXES_REQUEST} actions: updates 'isFetching' to 'true'`, () => {
      const requestTypeActions = [
        {type: types.CREATE_BOX_REQUEST},
        {type: types.DELETE_BOX_REQUEST},
        {type: types.FETCH_BOXES_REQUEST},
      ];
      requestTypeActions.forEach(action => {
        const expectedState = {...initialState, isFetching: true};
        const newState = paginationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    });

    it(`${types.CREATE_BOX_FAILURE}, ${types.DELETE_BOX_FAILURE}, ${types.FETCH_BOXES_FAILURE} actions: updates 'isFetching' to 'false'`, () => {
      const failureTypeActions = [
        {type: types.CREATE_BOX_FAILURE},
        {type: types.DELETE_BOX_FAILURE},
        {type: types.FETCH_BOXES_FAILURE},
      ];
      failureTypeActions.forEach(action => {
        const expectedState = {...initialState, isFetching: false};
        const newState = paginationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    });

    it(`${types.FETCH_BOXES_SUCCESS} action: appends the fetched 'boxes' to 'ids' array & update 'nextPageUrl'`, () => {
      const action = {
        type: types.FETCH_BOXES_SUCCESS,
        payload: {
          result: ['id#1', 'id#2'],
          nextPageUrl: 'next'
        }
      };
      const expectedState = {
        ...initialState,
        isFetching: false,
        ids: union(initialState.ids, action.payload.result),
        nextPageUrl: action.payload.nextPageUrl,
        page: initialState.page + 1,
      };
      const newState = paginationReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.CREATE_BOX_SUCCESS} action: appends 'id' of created 'box' to 'ids' array`, () => {
      const action = {
        type: types.CREATE_BOX_SUCCESS,
        payload: {
          result: 'id#1',
        }
      };
      const expectedState = {
        ...initialState,
        isFetching: false,
        ids: [action.payload.result, ...initialState.ids]
      };
      const newState = paginationReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.DELETE_BOX_FAILURE} action: removes 'id' of deleted 'box' from 'ids' array`, () => {
      const action = {
        type: types.DELETE_BOX_FAILURE,
        payload: {
          result: 'id#1',
        }
      };
      const expectedState = {
        ...initialState,
        isFetching: false,
        ids: without(initialState.ids, action.payload.result)
      };
      const newState = paginationReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.UNLOAD_BOXES} action: return 'initialState'`, () => {
      const action = {
        type: types.UNLOAD_BOXES,
      };
      expect(paginationReducer(undefined, action)).toEqual(initialState);
    });
  });

});
