/**
 * Created on 27-Mar-18.
 */
import {
  FETCH_HUNCHES_FAILURE, FETCH_HUNCHES_REQUEST, FETCH_HUNCHES_SUCCESS,
  CREATE_HUNCH_FAILURE, CREATE_HUNCH_REQUEST, CREATE_HUNCH_SUCCESS,
  DELETE_HUNCH_FAILURE, DELETE_HUNCH_REQUEST, DELETE_HUNCH_SUCCESS,
} from "./actionTypes";
import { combineReducers } from 'redux';
import { createPaginationReducer } from '../common/reducer-factories';


const boxesReducer = combineReducers({
  pagination: createPaginationReducer(
    [FETCH_HUNCHES_REQUEST, FETCH_HUNCHES_SUCCESS, FETCH_HUNCHES_FAILURE],
    [CREATE_HUNCH_REQUEST, CREATE_HUNCH_SUCCESS, CREATE_HUNCH_FAILURE],
    [DELETE_HUNCH_REQUEST, DELETE_HUNCH_SUCCESS, DELETE_HUNCH_FAILURE]),
});

export default boxesReducer;
