/**
 * Created on 02-Aug-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBox, closeBoxEditorModal, clearBoxEditor } from '../actions';
import * as selectors from '../selectors';
import CreateBoxForm from './BoxEditorForm'; // eslint-disable-line import/no-named-as-default
import { getFormValues } from 'redux-form';
import { Modal } from 'react-bootstrap';

export class BoxEditorModal extends Component
{
  constructor () {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.close = this.close.bind(this);
    this.suspend = this.suspend.bind(this);
  }

  submitForm (box) {
    const {closeBoxEditorModal, createBox} = this.props;
    createBox(box);
    closeBoxEditorModal();
  }

  handleSave () {
    this.editForm.getWrappedInstance().submit();
  }

  close () {
    this.props.clearBoxEditor();
    this.props.closeBoxEditorModal();
  }

  suspend () {
    this.props.closeBoxEditorModal(this.props.formValues);
  }

  render () {
    const {isOpenedWithModal} = this.props;

    return (
      <Modal show={isOpenedWithModal}
             keyboard={false}
             onHide={(e) => {e ? this.close() : this.suspend()}}
             id="box-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="box-editor-modal-title">New Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBoxForm ref={f => this.editForm = f} onSubmit={box => this.submitForm(box)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="box-editor-modal-save" className="btn btn-primary" onClick={this.handleSave}>Create</button>
          <button id="box-editor-modal-close" className="btn" onClick={this.close}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

BoxEditorModal.propTypes = {
  isOpenedWithModal: PropTypes.bool.isRequired,
  closeBoxEditorModal: PropTypes.func.isRequired,
  clearBoxEditor: PropTypes.func.isRequired,
  createBox: PropTypes.func.isRequired,
  formValues: PropTypes.object,
};

export function mapStateToProps (state) {
  return {
    ...selectors.getEditor(state),
    formValues: getFormValues('box-editor')(state)
  };
}

export default connect(mapStateToProps, {createBox, closeBoxEditorModal, clearBoxEditor})(BoxEditorModal);
