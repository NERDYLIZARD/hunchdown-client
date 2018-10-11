/**
 * Created on 10-Oct-18.
 */
import * as types from './types/modal';

export const showModal = (modalType, modalProps = {}) => ({
  type: types.SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = () => ({type: types.HIDE_MODAL});
