/**
 * Created on 27-Mar-18.
 */
import _ from 'lodash';
import initialState from '../../initialState';
import {
  CREATE_HUNCH_SUCCESS,
  DELETE_HUNCH_SUCCESS, EDIT_HUNCH,
  LOAD_HUNCHES_SUCCESS,
  LOAD_HUNCH_SUCCESS,
  UPDATE_HUNCH_SUCCESS,
} from "./actionTypes";


export default function hunchReducer(state = initialState.hunches, action) {
  switch (action.type) {
    case LOAD_HUNCHES_SUCCESS:
      // turn array to associative array having 'id' as key
      return {
        ...state,
        byId: _.mapKeys(action.hunches, 'id')
      };

    case LOAD_HUNCH_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.hunch.id]: action.hunch
        }
      };

    case CREATE_HUNCH_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.hunch.id]: action.hunch
        }
      };

    case UPDATE_HUNCH_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId, [action.hunch.id]: action.hunch
        }
      };

    case DELETE_HUNCH_SUCCESS:
      return {
        ...state,
        byId: _.omit(state.byId, action.hunch.id)
      };

    case EDIT_HUNCH:
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.editing
        }
      };

    default:
      return state;
  }
}
