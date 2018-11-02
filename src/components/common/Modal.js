/**
 * Created on 10-Oct-18.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as types from '../../constants/modal';
import PropTypes from 'prop-types';
/* eslint-disable import/no-named-as-default */
import HunchSelectorModal from '../editor/HunchSelectorModal';

const MODAL_COMPONENTS = {
  [types.HUNCH_SELECTOR_MODAL]: HunchSelectorModal,
};

const Modal = ({modalType, modalProps}) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />
};

Modal.propTypes = {
  modalType: PropTypes.object,
  modalProps: PropTypes.object,
};

export default connect(
  state => state.modal
)(Modal)
