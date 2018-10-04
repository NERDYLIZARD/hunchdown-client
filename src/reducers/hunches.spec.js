/**
 * Created on 06-Apr-18.
 */
import * as types from '../actions/types/hunches';
import { editorReducer, paginationReducer } from './hunches';
import { initialState as paginationInitialState } from './factories/pagination';
import { initialState as editorInitialState } from './factories/editor';
import { union, without } from 'lodash';

describe('Hunch Reducer', () => {

  describe('editor', () => {
    const initialState = editorInitialState;

    it('handles unknown action', () => {
      const action = {type: 'UNKNOWN'};
      expect(editorReducer(undefined, action)).toEqual(initialState);
    });

    it(`${types.BOOST_HUNCH_EDITOR} action: updates 'isOpenedWithModal' according to 'action.withModal' and populate 'props' with 'action.data'`, () => {
      const action = {
        type: types.BOOST_HUNCH_EDITOR,
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

    it(`${types.RESUME_HUNCH_EDITOR_MODAL} action: updates 'isOpenedWithModal: true'`, () => {
      const action = {
        type: types.RESUME_HUNCH_EDITOR_MODAL,
      };
      const expectedState = {
        ...initialState,
        isOpenedWithModal: true,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.CLEAR_HUNCH_EDITOR} action: updates 'props: null'`, () => {
      const action = {
        type: types.CLEAR_HUNCH_EDITOR,
      };
      const expectedState = {
        ...initialState,
        props: null,
      };
      const newState = editorReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });

    it(`${types.CLOSE_HUNCH_EDITOR_MODAL} action: updates 'isOpenedWithModal: false' & 'props: action.retainedData`, () => {
      const action = {
        type: types.CLOSE_HUNCH_EDITOR_MODAL,
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

    it(`${types.CREATE_HUNCH_REQUEST}, ${types.DELETE_HUNCH_REQUEST}, ${types.FETCH_HUNCHES_REQUEST} actions: updates 'isFetching' to 'true'`, () => {
      const requestTypeActions = [
        {type: types.CREATE_HUNCH_REQUEST},
        {type: types.DELETE_HUNCH_REQUEST},
        {type: types.FETCH_HUNCHES_REQUEST},
      ];
      requestTypeActions.forEach(action => {
        const expectedState = {...initialState, isFetching: true};
        const newState = paginationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    });

    it(`${types.CREATE_HUNCH_FAILURE}, ${types.DELETE_HUNCH_FAILURE}, ${types.FETCH_HUNCHES_FAILURE} actions: updates 'isFetching' to 'false'`, () => {
      const failureTypeActions = [
        {type: types.CREATE_HUNCH_FAILURE},
        {type: types.DELETE_HUNCH_FAILURE},
        {type: types.FETCH_HUNCHES_FAILURE},
      ];
      failureTypeActions.forEach(action => {
        const expectedState = {...initialState, isFetching: false};
        const newState = paginationReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    });

    it(`${types.FETCH_HUNCHES_SUCCESS} action: appends the fetched 'hunches' to 'ids' array & update 'nextPageUrl'`, () => {
      const action = {
        type: types.FETCH_HUNCHES_SUCCESS,
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

    it(`${types.CREATE_HUNCH_SUCCESS} action: appends 'id' of created 'hunch' to 'ids' array`, () => {
      const action = {
        type: types.CREATE_HUNCH_SUCCESS,
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

    it(`${types.DELETE_HUNCH_FAILURE} action: removes 'id' of deleted 'hunch' from 'ids' array`, () => {
      const action = {
        type: types.DELETE_HUNCH_FAILURE,
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

    it(`${types.UNLOAD_HUNCHES} action: return 'initialState'`, () => {
      const action = {
        type: types.UNLOAD_HUNCHES,
      };
      expect(paginationReducer(undefined, action)).toEqual(initialState);
    });
  });

});
