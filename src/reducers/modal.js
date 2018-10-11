/**
 * Created on 10-Oct-18.
 */
import * as types from '../actions/types/modal';

export const initialState = {
  modalType: null,
  modalProps: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case types.HIDE_MODAL:
      return initialState;
    default:
      return state
  }
}
