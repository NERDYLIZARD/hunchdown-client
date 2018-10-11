/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteHunch, loadHunches, unloadHunches, openHunchEditorModal } from '../../actions/hunches';
import { loadBox, unloadBox } from '../../actions/boxes';
import { showModal } from '../../actions/modal';
import * as selectors from '../../selectors/hunches';
import * as boxSelectors from '../../selectors/boxes';
import * as modalTypes from '../../constants/modal';
import { isEmpty } from 'lodash';
/* eslint-disable import/no-named-as-default */
import HunchList from './HunchList';
import HunchEditorModal from './HunchEditorModal';
import InfiniteScroll from '../common/InfiniteScroll';


export class HunchPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.loadData = this.loadData.bind(this);
    this.unloadData = this.unloadData.bind(this);
    this.addHunch = this.addHunch.bind(this);
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
    this.props.loadHunches(boxId, false, 12);
  }

  unloadData () {
    this.props.unloadBox();
    this.props.unloadHunches();
  }

  addHunch (e) {
    e.preventDefault();
    this.props.showModal(modalTypes.HUNCH_SELECTOR_MODAL);
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
    const {isFetchingBox, isFetchingHunches, box, hunches} = this.props;
    const {id: boxId} = this.props.match.params;

    return (
      <div className="hunch-page">
        <div className="container">
          <div className="hunch-page__header pt-3 pb-3">
            {isFetchingBox && <div className="hunch-page__box-loading">Loading . . .</div>}
            {!box && !isFetchingBox && <div className="hunch-page__box-not-found">Box Not Found</div>}
            {box &&
            <div className="clearfix">
              <div className="float-left">
                <h2 className="hunch-page__box-title">{box.title}</h2>
              </div>
              <div className="float-right">
                <button
                  className="hunch-page__create-hunch-button btn btn-success mr-2"
                  onClick={this.createHunch}>New Hunch
                </button>
                <button
                  className="hunch-page__add-hunch-button btn btn-primary"
                  onClick={this.addHunch}>Existing Hunch
                </button>
              </div>
            </div>}
          </div>

          {box &&
          <div className="hunch-page__body">
            {!isFetchingHunches && isEmpty(hunches) &&
            <div className="hunch-page__hunches-not-found">No Hunch in the Box. <strong>Add a Hunch.</strong></div>}
            <InfiniteScroll args={[boxId, true]} onScroll={this.props.loadHunches}>
              <HunchList
                hunches={hunches}
                onEdit={this.editHunch}
                onDelete={this.deleteHunch}/>
              {isFetchingHunches && <div className="hunch-page__hunches-loading">Loading . . .</div>}
            </InfiniteScroll>

            <HunchEditorModal/>

          </div>
          }
        </div>
      </div>);
  }
}

HunchPage.propTypes = {
  openHunchEditorModal: PropTypes.func.isRequired,
  loadHunches: PropTypes.func.isRequired,
  unloadHunches: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  loadBox: PropTypes.func.isRequired,
  unloadBox: PropTypes.func.isRequired,
  deleteHunch: PropTypes.func.isRequired,
  isFetchingBox: PropTypes.bool.isRequired,
  box: PropTypes.object,
  isFetchingHunches: PropTypes.bool.isRequired,
  hunches: PropTypes.array,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {isFetching: isFetchingHunches} = selectors.getPagination(state);
  const {isFetching: isFetchingBox} = boxSelectors.getActive(state);
  return {
    isFetchingHunches,
    hunches: selectors.getAll(state),
    isFetchingBox,
    box: boxSelectors.getActiveElement(state)
  }
};

export default connect(mapStateToProps, {
  loadBox,
  unloadBox,
  loadHunches,
  unloadHunches,
  deleteHunch,
  openHunchEditorModal,
  showModal,
})(HunchPage);
