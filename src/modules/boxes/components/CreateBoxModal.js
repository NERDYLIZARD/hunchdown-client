/**
 * Created on 02-Aug-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBox } from '../actions';
import * as selectors from '../selectors';
import CreateBoxForm from './CreateBoxForm'; // eslint-disable-line import/no-named-as-default

import Modal from 'react-bootstrap/lib/Modal';

export class CreateBoxModal extends Component
{
  constructor () {
    super();
    this.handleSave = this.handleSave.bind(this);
  }

  submitForm (box) {
    const {closeCreateBoxModal, createBox} = this.props;
    createBox(box);
    closeCreateBoxModal();
  }

  handleSave () {
    this.editForm.getWrappedInstance().submit();
  }

  render () {
    const {modalOpen, closeCreateBoxModal} = this.props;

    return (
      <Modal show={modalOpen} onHide={closeCreateBoxModal} id="create-box-modal">
        <Modal.Header closeButton>
          <Modal.Title id="create-box-modal-title">New Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoxForm ref={f => this.editForm = f} onSubmit={box => this.submitForm(box)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="create-box-modal-save" className="btn btn-primary" onClick={this.handleSave}>Create</button>
          <button id="create-box-modal-close" className="btn" onClick={closeCreateBoxModal}>Cancel</button>
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
  return {...selectors.getSelected(state)};
}

export default connect(mapStateToProps, {createBox})(CreateBoxModal);
