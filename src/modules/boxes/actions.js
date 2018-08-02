/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';

export const loadBoxes = () => ({type: types.LOAD_BOXES});
export const loadBoxesSuccess = boxes => ({type: types.LOAD_BOXES_SUCCESS, boxes});

export const createBox = (box) => ({type: types.CREATE_BOX, box});
export const createBoxSuccess = box => ({type: types.CREATE_BOX_SUCCESS, box});

export const deleteBox = (box) => ({type: types.DELETE_BOX, box});
export const deleteBoxSuccess = box => ({type: types.DELETE_BOX_SUCCESS, box});

export const openCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: true}});
export const closeCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: false}});
