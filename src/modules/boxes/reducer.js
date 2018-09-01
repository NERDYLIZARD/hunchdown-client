/**
 * Created on 30-Jul-18.
 */
import {
  FETCH_BOXES_FAILURE, FETCH_BOXES_REQUEST, FETCH_BOXES_SUCCESS,
  CREATE_BOX_FAILURE, CREATE_BOX_REQUEST, CREATE_BOX_SUCCESS,
  DELETE_BOX_FAILURE, DELETE_BOX_REQUEST, DELETE_BOX_SUCCESS,
} from "./actionTypes";
import { combineReducers } from 'redux';
import { createPaginationReducer } from '../common/reducer-factories';


const boxesReducer = combineReducers({
  pagination: createPaginationReducer(
    [FETCH_BOXES_REQUEST, FETCH_BOXES_SUCCESS, FETCH_BOXES_FAILURE],
    [CREATE_BOX_REQUEST, CREATE_BOX_SUCCESS, CREATE_BOX_FAILURE],
    [DELETE_BOX_REQUEST, DELETE_BOX_SUCCESS, DELETE_BOX_FAILURE]),
});

export default boxesReducer;
