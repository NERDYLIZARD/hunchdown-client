/**
 * Created on 17-May-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import HunchEditorForm from './HunchEditorForm'; // eslint-disable-line import/no-named-as-default

import Modal from 'react-bootstrap/lib/Modal';

export class HunchEditorModal extends Component {

  constructor() {
    super();
    this.saveClick = this.saveClick.bind(this);
  }

  submitForm(hunch) {
    const { closeHunchEditorModal, updateHunch, createHunch } = this.props;

    if (hunch.id)
      updateHunch(hunch);
    else
      createHunch(hunch);
    closeHunchEditorModal();
  }

  saveClick() {
    this.editForm.getWrappedInstance().submit();
  }

  render() {
    const { modalOpen, closeHunchEditorModal, hunch } = this.props;

    return (
      <Modal show={modalOpen} onHide={() => closeHunchEditorModal()} id="hunch-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="hunch-editor-modal-title">{hunch ? 'Edit Hunch' : 'New Hunch'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HunchEditorForm ref={f => this.editForm = f} onSubmit={hunch => this.submitForm(hunch)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="hunch-editor-modal-save" className="btn btn-primary" onClick={this.saveClick}>Save</button>
          <button id="hunch-editor-modal-close" className="btn" onClick={() => closeHunchEditorModal()}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

HunchEditorModal.propTypes = {
  hunch: PropTypes.object,
  modalOpen: PropTypes.bool.isRequired,
  closeHunchEditorModal: PropTypes.func.isRequired,
  createHunch: PropTypes.func.isRequired,
  updateHunch: PropTypes.func.isRequired
};

export function mapStateToProps(state) {
  return { ...state.hunches.editing };
}

export default connect(mapStateToProps, { ...actions })(HunchEditorModal);
