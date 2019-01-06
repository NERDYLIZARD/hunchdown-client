/**
 * Created on 10-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hideModal} from '../../actions/modal';

import Modal from 'react-bootstrap/lib/Modal';
import {selectBoxById} from '../../selectors/entities';
import HunchSelectionForm from './HunchSelectionForm';
import BoxSelectionForm from './BoxSelectionForm';

export class HunchSelectorModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.selectBox = this.selectBox.bind(this);
    this.deselectBox = this.deselectBox.bind(this);

    this.state = {
      selectedBox: null,
      selectedHunches: null,
    }
  }

  selectBox(box) {
    this.setState(() => ({
        selectedBox: box
      })
    );
  }

  deselectBox() {
    this.setState(() => ({
        selectedBox: null
      })
    );
  }

  render() {
    const {box, hideModal} = this.props;
    return (
      <Modal
        show={true}
        onHide={() => hideModal()}
        centered
        size="lg"
        id="hunch-selector-modal">
        <Modal.Header closeButton>
          <Modal.Title id="hunch-selector-modal-title">{box.title}: Select Hunches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.selectedBox ?
              <HunchSelectionForm onBackNavigationClick={this.deselectBox}/> :
              <BoxSelectionForm onBoxSelected={this.selectBox}/>
          }
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

HunchSelectorModal.propTypes = {
  box: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    box: selectBoxById(state, ownProps.boxId)
  }
};

export default connect(mapStateToProps, {
  hideModal,
})(HunchSelectorModal);
