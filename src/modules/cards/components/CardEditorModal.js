/**
 * Created on 17-May-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CardEditorForm from './CardEditorForm'; // eslint-disable-line import/no-named-as-default

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

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
      <Modal show={modalOpen} onHide={() => closeCardEditorModal()} bsSize="lg" aria-labelledby="contained-modal-title-sm" id="card-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">{card ? 'Edit Card' : 'New Card'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardEditorForm ref={f => this.editForm = f} onSubmit={card => this.submitForm(card)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary card-editor-modal-save" onClick={this.saveClick}>Save</Button>
          <Button className="btn btn-warning card-editor-modal-close" onClick={() => closeCardEditorModal()}>Cancel</Button>
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
