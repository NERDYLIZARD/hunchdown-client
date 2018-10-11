/**
 * Created on 10-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';

import Modal from 'react-bootstrap/lib/Modal';

export class HunchSelectorModal extends React.Component
{
  constructor (props, context) {
    super(props, context);
  }

  render () {
    const {hideModal} = this.props;
    return (
      <Modal
        show={true}
        onHide={() => hideModal()}
        centered
        size="lg"
        id="hunch-selector-modal">
        <Modal.Header closeButton>
          <Modal.Title id="hunch-selector-modal-title">Select Hunches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

HunchSelectorModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {

};

export default connect(mapStateToProps, {
  hideModal,
})(HunchSelectorModal);
