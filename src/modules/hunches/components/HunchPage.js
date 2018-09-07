/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteHunch, loadHunches, unloadHunches, openHunchEditorModal } from '../actions';
import * as selectors from '../selectors';
import HunchList from './HunchList';
import HunchEditorModal from './HunchEditorModal'; // eslint-disable-line import/no-named-as-default
import boxes from '../../boxes';


export class HunchPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.loadData = this.loadData.bind(this);
    this.unloadData = this.unloadData.bind(this);
    this.createHunch = this.createHunch.bind(this);
    this.deleteHunch = this.deleteHunch.bind(this);
    this.editHunch = this.editHunch.bind(this);
  }

  componentDidMount () {
    this.loadData();
  }

  componentWillUnmount () {
    this.unloadData();
  }

  loadData () {
    const boxId = this.props.match.params.id;
    this.props.loadBox(boxId);
    this.props.loadHunches(boxId);
  }

  unloadData () {
    this.props.unloadBox();
    this.props.unloadHunches();
  }

  createHunch (e) {
    e.preventDefault();
    this.props.openHunchEditorModal(selectors.getEditor);
  }

  editHunch (e, hunch) {
    e.preventDefault();
    this.props.openHunchEditorModal(selectors.getEditor, hunch);
  }

  deleteHunch (e, hunch) {
    e.preventDefault();
    this.props.deleteHunch(hunch);
  }

  render () {
    const {box, hunches} = this.props;
    if (!box || !hunches) {
      return (
        <div>Loading . . .</div>
      );
    }
    return (
      <div className="hunch-page container-fluid">
        <div className="row">
          <div className="hunch-page-header clearfix">
            <div className="pull-left">
              <h2>{box.title}</h2>
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
        <HunchEditorModal/>
      </div>
    );
  }
}

HunchPage.propTypes = {
  openHunchEditorModal: PropTypes.func.isRequired,
  loadHunches: PropTypes.func.isRequired,
  unloadHunches: PropTypes.func.isRequired,
  loadBox: PropTypes.func.isRequired,
  unloadBox: PropTypes.func.isRequired,
  deleteHunch: PropTypes.func.isRequired,
  box: PropTypes.object,
  hunches: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    hunches: selectors.getAll(state),
    box: boxes.selectors.getActiveElement(state)
  }
};

export default connect(mapStateToProps, {
  loadBox: boxes.actions.loadBox,
  unloadBox: boxes.actions.unloadBox,
  loadHunches,
  unloadHunches,
  deleteHunch,
  openHunchEditorModal
})(HunchPage);
