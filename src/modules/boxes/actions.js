/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';

export const loadBoxes = (requestingNextPage) => ({type: types.LOAD_BOXES, payload: {requestingNextPage}});

export const fetchBoxes = (url) => ({type: types.FETCH_BOXES, payload: {url}});
export const fetchBoxesRequested = () => ({type: types.FETCH_BOXES_REQUEST});
export const fetchBoxesSucceeded = (entities, items, nextPageUrl) => ({type: types.FETCH_BOXES_SUCCESS, payload: {entities, items, nextPageUrl}});
export const fetchBoxesFailed = (error) => ({type: types.FETCH_BOXES_FAILURE, error});

export const createBox = (box) => ({type: types.CREATE_BOX, payload: {...box}});
export const createBoxRequested = () => ({type: types.CREATE_BOX_REQUEST});
export const createBoxSucceeded = box => ({type: types.CREATE_BOX_SUCCESS, payload: {...box}});
export const createBoxFailed = (error) => ({type: types.CREATE_BOX_FAILURE, error});

export const deleteBox = (box) => ({type: types.DELETE_BOX, payload: {...box}});
export const deleteBoxRequested = () => ({type: types.DELETE_BOX_REQUEST});
export const deleteBoxSucceeded = box => ({type: types.DELETE_BOX_SUCCESS, payload: {...box}});
export const deleteBoxFailed = (error) => ({type: types.DELETE_BOX_FAILURE, error});

export const openCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: true}});
export const closeCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: false}});
