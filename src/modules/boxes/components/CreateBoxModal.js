/**
 * Created on 02-Aug-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CreateBoxForm from './CreateBoxForm'; // eslint-disable-line import/no-named-as-default

import Modal from 'react-bootstrap/lib/Modal';

export class CreateBoxModal extends Component
{
  constructor () {
    super();
    this.saveClick = this.saveClick.bind(this);
  }

  submitForm (box) {
    const {closeCreateBoxModal, createBox} = this.props;

    createBox(box);
    closeCreateBoxModal();
  }

  saveClick () {
    this.editForm.getWrappedInstance().submit();
  }

  render () {
    const {modalOpen, closeCreateBoxModal} = this.props;

    return (
      <Modal show={modalOpen} onHide={() => closeCreateBoxModal()} id="create-box-modal">
        <Modal.Header closeButton>
          <Modal.Title id="create-box-modal-title">New Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoxForm ref={f => this.editForm = f} onSubmit={box => this.submitForm(box)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="create-box-modal-save" className="btn btn-primary" onClick={this.saveClick}>Create</button>
          <button id="create-box-modal-close" className="btn" onClick={() => closeCreateBoxModal()}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateBoxModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  closeCreateBoxModal: PropTypes.func.isRequired,
  createBox: PropTypes.func.isRequired,
};

export function mapStateToProps (state) {
  return {...state.boxes.editing};
}

export default connect(mapStateToProps, {...actions})(CreateBoxModal);
