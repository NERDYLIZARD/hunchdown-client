/**
 * Created on 30-Jul-18.
 */
import {
  FETCH_BOXES_FAILURE,
  FETCH_BOXES_REQUEST,
  FETCH_BOXES_SUCCESS,
  CREATE_BOX_FAILURE,
  CREATE_BOX_REQUEST,
  CREATE_BOX_SUCCESS,
  DELETE_BOX_FAILURE,
  DELETE_BOX_REQUEST,
  DELETE_BOX_SUCCESS,
  BOOST_BOX_EDITOR,
  RESUME_BOX_EDITOR_MODAL,
  CLEAR_BOX_EDITOR, CLOSE_BOX_EDITOR_MODAL,
} from "./actionTypes";
import { combineReducers } from 'redux';
import { createEditorReducer, createPaginationReducer } from '../common/reducer-factories';


const boxesReducer = combineReducers({
  pagination: createPaginationReducer(
    [FETCH_BOXES_REQUEST, FETCH_BOXES_SUCCESS, FETCH_BOXES_FAILURE],
    [CREATE_BOX_REQUEST, CREATE_BOX_SUCCESS, CREATE_BOX_FAILURE],
    [DELETE_BOX_REQUEST, DELETE_BOX_SUCCESS, DELETE_BOX_FAILURE]),
  editor: createEditorReducer(
    BOOST_BOX_EDITOR, RESUME_BOX_EDITOR_MODAL,
    CLEAR_BOX_EDITOR, CLOSE_BOX_EDITOR_MODAL),
});

export default boxesReducer;
