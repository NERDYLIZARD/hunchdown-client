/**
 * Created on 30-Jul-18.
 */
import {
  FETCH_BOXES_FAILURE,
  FETCH_BOXES_REQUEST,
  FETCH_BOXES_SUCCESS,
  FETCH_BOX_FAILURE,
  FETCH_BOX_REQUEST,
  FETCH_BOX_SUCCESS,
  CREATE_BOX_FAILURE,
  CREATE_BOX_REQUEST,
  CREATE_BOX_SUCCESS,
  DELETE_BOX_FAILURE,
  DELETE_BOX_REQUEST,
  DELETE_BOX_SUCCESS,
  BOOST_BOX_EDITOR,
  RESUME_BOX_EDITOR_MODAL,
  CLEAR_BOX_EDITOR, CLOSE_BOX_EDITOR_MODAL, UNLOAD_BOX, UNLOAD_BOXES, LOAD_BOX,
} from "../actions/types/boxes";
import { combineReducers } from 'redux';
import { createEditorReducer, createPaginationReducer, createActiveReducer } from './factories/index';

export const activeReducer = createActiveReducer([
  FETCH_BOX_REQUEST, FETCH_BOX_SUCCESS,
  FETCH_BOX_FAILURE, LOAD_BOX, UNLOAD_BOX
]);

export const editorReducer = createEditorReducer([
  BOOST_BOX_EDITOR, RESUME_BOX_EDITOR_MODAL,
  CLEAR_BOX_EDITOR, CLOSE_BOX_EDITOR_MODAL]);

export const paginationReducer = createPaginationReducer(
  [FETCH_BOXES_REQUEST, FETCH_BOXES_SUCCESS, FETCH_BOXES_FAILURE],
  [CREATE_BOX_REQUEST, CREATE_BOX_SUCCESS, CREATE_BOX_FAILURE],
  [DELETE_BOX_REQUEST, DELETE_BOX_SUCCESS, DELETE_BOX_FAILURE],
  UNLOAD_BOXES);

const boxesReducer = combineReducers({
  active: activeReducer,
  editor: editorReducer,
  pagination: paginationReducer,
});

export default boxesReducer;
