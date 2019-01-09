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
import forOwn from "lodash/forOwn";

export class HunchSelectorModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.selectBox = this.selectBox.bind(this);
    this.deselectBox = this.deselectBox.bind(this);
    this.handleBackNavigationClick = this.handleBackNavigationClick.bind(this);
    this.accumulateSelectedHunches = this.accumulateSelectedHunches.bind(this);
    this.addHunches = this.addHunches.bind(this);

    this.state = {
      selectedBox: null,
      selectedHunches: {},
    }
  }

  componentDidMount() {}

  selectBox(box) {
    this.setState(() => ({
      selectedBox: box
    }));
  }

  deselectBox() {
    this.setState(() => ({
      selectedBox: null
    }));
  }

  handleBackNavigationClick() {
    this.hunchSelectionForm.getWrappedInstance().returnSelectedHunches();
  }

  accumulateSelectedHunches(selectedHunches) {
    this.setState(state => ({
      selectedHunches: {
        ...state.selectedHunches,
        [state.selectedBox.id]: selectedHunches
      }
    }));
    this.deselectBox();
  }

  addHunches() {
    let toBeAddedHunches = [];
    forOwn(this.state.selectedHunches, (value, key) => {
      toBeAddedHunches = toBeAddedHunches.concat(value)
    });
    // console.log(toBeAddedHunches);
    // call api.addHunches(toBeAddedHunches)
  }

  render() {
    const {beingEditedBox, hideModal} = this.props;
    return (
      <Modal
        show={true}
        onHide={() => hideModal()}
        centered
        size="lg"
        className="hunch-selector-modal">

        <Modal.Header closeButton>
          <Modal.Title className="hunch-selector-modal__title">
            {this.state.selectedBox &&
            <button className="hunch-selector-modal__back-navigation btn"
                    onClick={this.handleBackNavigationClick}>Back</button>}
            <h1>{beingEditedBox.title}: Select Hunches</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            this.state.selectedBox ?

              <HunchSelectionForm
                ref={f => this.hunchSelectionForm = f}
                box={this.state.selectedBox}
                omittedHunches={beingEditedBox.hunches}
                selectedHunches={this.state.selectedHunches[this.state.selectedBox.id]}
                onReturnSelectedHunches={selectedHunches => this.accumulateSelectedHunches(selectedHunches)}/> :

              <BoxSelectionForm
                omitBox={beingEditedBox}
                selectedBoxes={this.state.selectedHunches}
                onBoxSelected={this.selectBox}/>
          }
        </Modal.Body>

        {!this.state.selectedBox &&
        <Modal.Footer>
          <button className="btn">Cancel</button>
          <button className="btn btn-success" onClick={this.addHunches}>Add Hunches</button>
        </Modal.Footer>}
      </Modal>
    );
  }
}

HunchSelectorModal.propTypes = {
  beingEditedBox: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    beingEditedBox: selectBoxById(state, ownProps.boxId)
  }
};

export default connect(mapStateToProps, {
  hideModal,
})(HunchSelectorModal);
