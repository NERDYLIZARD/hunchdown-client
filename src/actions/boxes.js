/**
 * Created on 30-Jul-18.
 */
import * as types from './types/boxes';
import { boxSchema } from '../utils/normalizr-schema';
import { CALL_API } from '../middlewares/api/index';
import { editorActionCreatorFactory } from './factories/index';


export const loadBoxes = (nextPageIsRequested = false, perPage = 12) => ({
  type: types.LOAD_BOXES,
  nextPageIsRequested,
  perPage,
});
export const fetchBoxes = (url) => ({
  [CALL_API]: {
    types: [types.FETCH_BOXES_REQUEST, types.FETCH_BOXES_SUCCESS, types.FETCH_BOXES_FAILURE],
    schema: [boxSchema],
    endpoint: url,
    method: 'GET',
  }
});
export const unloadBoxes = () => ({type: types.UNLOAD_BOXES,});


export const loadBox = (id) => ({
  type: types.LOAD_BOX,
  id
});
export const fetchBox = (id) => ({
  [CALL_API]: {
    types: [types.FETCH_BOX_REQUEST, types.FETCH_BOX_SUCCESS, types.FETCH_BOX_FAILURE],
    schema: boxSchema,
    endpoint: `/boxes/${id}`,
    method: 'GET',
  }
});
export const unloadBox = () => ({type: types.UNLOAD_BOX,});


export const createBox = (box) => ({
  [CALL_API]: {
    types: [types.CREATE_BOX_REQUEST, types.CREATE_BOX_SUCCESS, types.CREATE_BOX_FAILURE],
    schema: boxSchema,
    endpoint: '/boxes',
    method: 'POST',
    data: box
  }
});

export const updateBox = (box) => ({
  [CALL_API]: {
    types: [types.UPDATE_BOX_REQUEST, types.UPDATE_BOX_SUCCESS, types.UPDATE_BOX_FAILURE],
    schema: boxSchema,
    endpoint: `/boxes/${box.id}`,
    method: 'PATCH',
    data: box
  }
});

export const deleteBox = (box) => ({
  [CALL_API]: {
    types: [types.DELETE_BOX_REQUEST, types.DELETE_BOX_SUCCESS, types.DELETE_BOX_FAILURE],
    schema: boxSchema,
    endpoint: `/boxes/${box.id}`,
    method: 'DELETE',
    data: box
  }
});

export const openBoxEditorModal = editorActionCreatorFactory.createOpenEditorModal(types.BOOST_BOX_EDITOR, types.RESUME_BOX_EDITOR_MODAL);
export const openBoxEditor = editorActionCreatorFactory.createOpenEditor(types.BOOST_BOX_EDITOR);
export const clearBoxEditor = editorActionCreatorFactory.createClearEditor(types.CLEAR_BOX_EDITOR);
export const closeBoxEditorModal = editorActionCreatorFactory.createCloseEditorModal(types.CLOSE_BOX_EDITOR_MODAL);
