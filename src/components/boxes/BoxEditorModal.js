/**
 * Created on 02-Aug-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBox, closeBoxEditorModal, clearBoxEditor, updateBox } from '../../actions/boxes';
import * as selectors from '../../selectors/boxes';
import BoxEditorForm from './BoxEditorForm'; // eslint-disable-line import/no-named-as-default
import { getFormValues } from 'redux-form';

import Modal from 'react-bootstrap/lib/Modal';

export class BoxEditorModal extends Component
{
  constructor () {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.close = this.close.bind(this);
    this.suspend = this.suspend.bind(this);
  }

  submitForm (box) {
    const {createBox, updateBox} = this.props;
    box.id ? updateBox(box) : createBox(box);
    this.close();
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
    const {box, isOpenedWithModal} = this.props;

    return (
      <Modal show={isOpenedWithModal}
             centered
             keyboard={false}
             onHide={(e) => {
               e ? this.close() : this.suspend()
             }}
             id="box-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="box-editor-modal-title">{box ? 'Edit Box' : 'New Box'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BoxEditorForm ref={f => this.editForm = f} onSubmit={box => this.submitForm(box)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="box-editor-modal-save" className="btn btn-primary" onClick={this.handleSave}>Save</button>
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
  updateBox: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  box: PropTypes.object,
};

export function mapStateToProps (state) {
  const {isOpenedWithModal, props} = selectors.getEditor(state);
  return {
    box: props,
    isOpenedWithModal,
    formValues: getFormValues('box-editor')(state)
  };
}

export default connect(mapStateToProps, {
  createBox,
  updateBox,
  closeBoxEditorModal,
  clearBoxEditor
})(BoxEditorModal);
