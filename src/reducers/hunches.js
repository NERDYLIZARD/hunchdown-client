/**
 * Created on 27-Mar-18.
 */
import {
  BOOST_HUNCH_EDITOR,
  CLEAR_HUNCH_EDITOR,
  CLOSE_HUNCH_EDITOR_MODAL,
  CREATE_HUNCH_FAILURE,
  CREATE_HUNCH_REQUEST,
  CREATE_HUNCH_SUCCESS,
  DELETE_HUNCH_FAILURE,
  DELETE_HUNCH_REQUEST,
  DELETE_HUNCH_SUCCESS,
  FETCH_HUNCHES_FAILURE,
  FETCH_HUNCHES_REQUEST,
  FETCH_HUNCHES_SUCCESS,
  RESUME_HUNCH_EDITOR_MODAL, UNLOAD_HUNCHES,
} from "../actions/types/hunches";
import { combineReducers } from 'redux';
import { createEditorReducer, createPaginationReducer } from './factories/index';

export const editorReducer = createEditorReducer([
  BOOST_HUNCH_EDITOR, RESUME_HUNCH_EDITOR_MODAL,
  CLEAR_HUNCH_EDITOR, CLOSE_HUNCH_EDITOR_MODAL]);

export const paginationReducer = createPaginationReducer(
  [FETCH_HUNCHES_REQUEST, FETCH_HUNCHES_SUCCESS, FETCH_HUNCHES_FAILURE],
  [CREATE_HUNCH_REQUEST, CREATE_HUNCH_SUCCESS, CREATE_HUNCH_FAILURE],
  [DELETE_HUNCH_REQUEST, DELETE_HUNCH_SUCCESS, DELETE_HUNCH_FAILURE],
  UNLOAD_HUNCHES);

const hunchesReducer = combineReducers({
  editor: editorReducer,
  pagination: paginationReducer,
});

export default hunchesReducer;
