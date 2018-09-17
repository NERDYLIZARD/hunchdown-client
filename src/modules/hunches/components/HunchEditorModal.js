/**
 * Created on 17-May-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearHunchEditor, closeHunchEditorModal, createHunch, updateHunch } from '../actions';
import boxes from '../../boxes';
import * as selectors from '../selectors';
import HunchEditorForm from './HunchEditorForm'; // eslint-disable-line import/no-named-as-default
import { getFormValues } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';

export class HunchEditorModal extends React.Component
{
  constructor () {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.close = this.close.bind(this);
    this.suspend = this.suspend.bind(this);
  }

  componentDidMount () {
    this.props.loadBoxes(12);
  }

  componentWillUnmount () {
    this.props.unloadBoxes();
  }

  submitForm (hunch) {
    const {updateHunch, createHunch} = this.props;
    hunch.id ? updateHunch(hunch) : createHunch(hunch);
    this.close();
  }

  close () {
    this.props.clearHunchEditor();
    this.props.closeHunchEditorModal();
  }

  suspend () {
    this.props.closeHunchEditorModal(this.props.formValues);
  }

  handleSave () {
    this.editForm.getWrappedInstance().submit();
  }

  render () {
    const {isOpenedWithModal, hunch} = this.props;
    return (
      <Modal show={isOpenedWithModal}
             centered
             keyboard={false}
             onHide={(e) => {e ? this.close() : this.suspend()}}
             id="hunch-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="hunch-editor-modal-title">{hunch ? 'Edit Hunch' : 'New Hunch'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HunchEditorForm ref={f => this.editForm = f} onSubmit={hunch => this.submitForm(hunch)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="hunch-editor-modal-save" className="btn btn-primary" onClick={this.handleSave}>Save</button>
          <button id="hunch-editor-modal-close" className="btn" onClick={this.close}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

HunchEditorModal.propTypes = {
  hunch: PropTypes.object,
  formValues: PropTypes.object,
  isOpenedWithModal: PropTypes.bool.isRequired,
  closeHunchEditorModal: PropTypes.func.isRequired,
  clearHunchEditor: PropTypes.func.isRequired,
  createHunch: PropTypes.func.isRequired,
  updateHunch: PropTypes.func.isRequired,
  boxes: PropTypes.array.isRequired,
  loadBoxes: PropTypes.func.isRequired,
  unloadBoxes: PropTypes.func.isRequired
};

export function mapStateToProps (state) {
  const {isOpenedWithModal, props} = selectors.getEditor(state);
  return {
    hunch: props,
    isOpenedWithModal,
    boxes: boxes.selectors.getAll(state),
    formValues: getFormValues('hunch-editor')(state)
  };
}

export default connect(mapStateToProps, {
  createHunch,
  updateHunch,
  loadBoxes: boxes.actions.loadBoxes,
  unloadBoxes: boxes.actions.unloadBoxes,
  closeHunchEditorModal,
  clearHunchEditor
})(HunchEditorModal);
