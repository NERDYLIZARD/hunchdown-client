/**
 * Created on 27-Mar-18.
 */
import * as types from './actionTypes';

export const loadHunches = () => ({ type: types.LOAD_HUNCHES });
export const loadHunchesSuccess = hunches => ({ type: types.LOAD_HUNCHES_SUCCESS, hunches });

export const loadHunch = (slug) => ({ type: types.LOAD_HUNCH, slug });
export const loadHunchSuccess = hunch => ({ type: types.LOAD_HUNCH_SUCCESS, hunch });

export const createHunch = (hunch) => ({ type: types.CREATE_HUNCH, hunch });
export const createHunchSuccess = hunch => ({ type: types.CREATE_HUNCH_SUCCESS, hunch });

export const updateHunch = (hunch) => ({ type: types.UPDATE_HUNCH, hunch });
export const updateHunchSuccess = hunch => ({ type: types.UPDATE_HUNCH_SUCCESS, hunch });

export const deleteHunch = (hunch) => ({ type: types.DELETE_HUNCH, hunch });
export const deleteHunchSuccess = hunch => ({ type: types.DELETE_HUNCH_SUCCESS, hunch });

export const openHunchEditorModal = hunch => ({
  type: types.EDIT_HUNCH,
  editing: {
    modalOpen: true,
    hunch
  }
});

export const closeHunchEditorModal = () => ({ type: types.EDIT_HUNCH, editing: { modalOpen: false } });
