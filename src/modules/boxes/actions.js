/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';
import { boxSchema } from '../../normalizr-schema';
import { CALL_API } from '../../middlewares/api';
import { OPEN_EDITOR_MODAL } from '../../middlewares/editor-modal';


export const loadBoxes = (nextPageIsRequested) => ({
  type: types.LOAD_BOXES,
  nextPageIsRequested
});

export const fetchBoxes = (url) => ({
  [CALL_API]: {
    types: [types.FETCH_BOXES_REQUEST, types.FETCH_BOXES_SUCCESS, types.FETCH_BOXES_FAILURE],
    schema: [boxSchema],
    endpoint: url,
    method: 'GET',
  }
});

export const createBox = (box) => ({
  [CALL_API]: {
    types: [types.CREATE_BOX_REQUEST, types.CREATE_BOX_SUCCESS, types.CREATE_BOX_FAILURE],
    schema: boxSchema,
    endpoint: '/boxes',
    method: 'POST',
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

export const openBoxEditorModal = (data, editorSelector) => ({
  [OPEN_EDITOR_MODAL]: {
    boostEditorType: types.BOOST_BOX_EDITOR,
    resumeEditorType: types.RESUME_BOX_EDITOR_MODAL,
    data,
    editorSelector
  }
});

export const openBoxEditor = (data) => ({
  type: types.BOOST_BOX_EDITOR,
  withModal: false,
  data,
});

export const clearBoxEditor = () => ({
  type: types.CLEAR_BOX_EDITOR,
});

export const closeBoxEditorModal = (retainedData) => ({
  type: types.CLOSE_BOX_EDITOR_MODAL,
  retainedData
});
