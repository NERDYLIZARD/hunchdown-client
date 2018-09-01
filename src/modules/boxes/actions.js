/**
 * Created on 30-Jul-18.
 */
import * as types from './actionTypes';
import { CALL_API } from '../../middlewares/api';
import { boxSchema } from '../../normalizr-schema';


export const loadBoxes = (requestingNextPage) => ({
  type: types.LOAD_BOXES,
  // todo does it need meta, payload for actions that are not api-concerned
  payload: {requestingNextPage}
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

export const openCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: true}});
export const closeCreateBoxModal = () => ({type: types.EDIT_BOX, editing: {modalOpen: false}});
