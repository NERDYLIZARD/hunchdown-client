/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { loadHunches, deleteHunch } from '../actions';
import { connect } from 'react-redux';
import CustomPropTypes from '../../../utils/customPropTypes';
import HunchEditorModal from './HunchEditorModal'; // eslint-disable-line import/no-named-as-default
import HunchList from './HunchList';
import * as selectors from '../selectors';


export class HunchPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.state = {
      showHunchEditorModal: false,
      activeHunch: null,
    };

    this.createHunch = this.createHunch.bind(this);
    this.deleteHunch = this.deleteHunch.bind(this);
    this.editHunch = this.editHunch.bind(this);
    this.openHunchEditorModal = this.openHunchEditorModal.bind(this);
    this.closeHunchEditorModal = this.closeHunchEditorModal.bind(this);
  }

  componentDidMount () {
    this.props.loadHunches();
  }

  createHunch (e) {
    e.preventDefault();
    this.openHunchEditorModal();
  }

  editHunch (e, hunch) {
    e.preventDefault();
    this.openHunchEditorModal(hunch)
  }

  openHunchEditorModal (hunch = null) {
    this.setState({
      showHunchEditorModal: true,
      activeHunch: hunch
    })
  }

  closeHunchEditorModal () {
    this.setState({showHunchEditorModal: false});
  }

  deleteHunch (e, hunch) {
    e.preventDefault();
    this.props.deleteHunch(hunch);
  }

  render () {
    const {hunches} = this.props;
    return (
      <div className="hunch-page container-fluid">
        <div className="row">
          <div className="hunch-page-header clearfix">
            <div className="pull-left">
              <h2>Hunches</h2>
            </div>
            <div className="pull-right">
              <button className="create-hunch-button btn btn-success" onClick={this.createHunch}>New Hunch</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            {hunches ?
              <HunchList hunches={hunches} onEdit={this.editHunch} onDelete={this.deleteHunch}/> : null
            }
          </div>
        </div>
        <HunchEditorModal
          hunch={this.state.activeHunch}
          modalOpen={this.state.showHunchEditorModal}
          closeHunchEditorModal={this.closeHunchEditorModal}/>
      </div>
    );
  }
}

HunchPage.propTypes = {
  loadHunches: PropTypes.func.isRequired,
  deleteHunch: PropTypes.func.isRequired,
  hunches: PropTypes.objectOf(CustomPropTypes.hunch),
};

const mapStateToProps = (state) => {
  return {
    hunches: selectors.getAll(state)
  }
};

export default connect(mapStateToProps, {loadHunches, deleteHunch})(HunchPage);
