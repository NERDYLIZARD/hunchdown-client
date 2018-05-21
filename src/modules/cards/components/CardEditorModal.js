/**
 * Created on 17-May-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CardEditorForm from './CardEditorForm'; // eslint-disable-line import/no-named-as-default

import Modal from 'react-bootstrap/lib/Modal';

export class CardEditorModal extends Component {

  constructor() {
    super();
    this.saveClick = this.saveClick.bind(this);
  }

  submitForm(card) {
    const { closeCardEditorModal, updateCard, createCard } = this.props;

    if (card.slug)
      updateCard(card);
    else
      createCard(card);
    closeCardEditorModal();
  }

  saveClick() {
    this.editForm.getWrappedInstance().submit();
  }

  render() {
    const { modalOpen, closeCardEditorModal, card } = this.props;

    return (
      <Modal show={modalOpen} onHide={() => closeCardEditorModal()} id="card-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="card-editor-modal-title">{card ? 'Edit Card' : 'New Card'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardEditorForm ref={f => this.editForm = f} onSubmit={card => this.submitForm(card)}/>
        </Modal.Body>
        <Modal.Footer>
          <button id="card-editor-modal-save" className="btn btn-primary" onClick={this.saveClick}>Save</button>
          <button id="card-editor-modal-close" className="btn" onClick={() => closeCardEditorModal()}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CardEditorModal.propTypes = {
  card: PropTypes.object,
  modalOpen: PropTypes.bool.isRequired,
  closeCardEditorModal: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired
};

export function mapStateToProps(state) {
  return { ...state.cards.editing };
}

export default connect(mapStateToProps, { ...actions })(CardEditorModal);
