/**
 * Created on 27-Mar-18.
 */
import * as types from './types/hunches';
import { CALL_API } from '../middlewares/api/index';
import { hunchSchema } from '../utils/normalizr-schema';
import { editorActionCreatorFactory } from './factories/index';


export const loadHunches = (boxId, nextPageIsRequested = false, perPage = 12) => ({
  type: types.LOAD_HUNCHES,
  boxId,
  nextPageIsRequested,
  perPage
});
export const fetchHunches = (url) => ({
  [CALL_API]: {
    types: [types.FETCH_HUNCHES_REQUEST, types.FETCH_HUNCHES_SUCCESS, types.FETCH_HUNCHES_FAILURE],
    schema: [hunchSchema],
    endpoint: url,
    method: 'GET',
  }
});
export const unloadHunches = () => ({type: types.UNLOAD_HUNCHES});


export const createHunch = (hunch) => ({
  [CALL_API]: {
    types: [types.CREATE_HUNCH_REQUEST, types.CREATE_HUNCH_SUCCESS, types.CREATE_HUNCH_FAILURE],
    schema: hunchSchema,
    endpoint: '/hunches',
    method: 'POST',
    data: hunch
  }
});

export const updateHunch = (hunch) => ({
  [CALL_API]: {
    types: [types.UPDATE_HUNCH_REQUEST, types.UPDATE_HUNCH_SUCCESS, types.UPDATE_HUNCH_FAILURE],
    schema: hunchSchema,
    endpoint: `/hunches/${hunch.id}`,
    method: 'PATCH',
    data: hunch
  }
});

export const deleteHunch = (hunch) => ({
  [CALL_API]: {
    types: [types.DELETE_HUNCH_REQUEST, types.DELETE_HUNCH_SUCCESS, types.DELETE_HUNCH_FAILURE],
    schema: hunchSchema,
    endpoint: `/hunches/${hunch.id}`,
    method: 'DELETE',
    data: hunch
  }
});

export const openHunchEditorModal = editorActionCreatorFactory.createOpenEditorModal(types.BOOST_HUNCH_EDITOR, types.RESUME_HUNCH_EDITOR_MODAL);
export const openHunchEditor = editorActionCreatorFactory.createOpenEditor(types.BOOST_HUNCH_EDITOR);
export const clearHunchEditor = editorActionCreatorFactory.createClearEditor(types.CLEAR_HUNCH_EDITOR);
export const closeHunchEditorModal = editorActionCreatorFactory.createCloseEditorModal(types.CLOSE_HUNCH_EDITOR_MODAL);
