/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteHunch, loadHunches, openHunchEditorModal, unloadHunches } from '../../actions/hunches';
import { loadBox, unloadBox } from '../../actions/boxes';
import { showModal } from '../../actions/modal';
import * as selectors from '../../selectors/hunches';
import * as boxSelectors from '../../selectors/boxes';
import * as modalTypes from '../../constants/modal';
import { isEmpty } from 'lodash';
/* eslint-disable import/no-named-as-default */
import HunchEditorModal from '../hunches/HunchEditorModal';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from "../common/Spinner";
import Grid from "../common/Grid";
import { HunchPreview } from "../hunches/preview/HunchPreview";


export class BoxDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.loadData = this.loadData.bind(this);
    this.unloadData = this.unloadData.bind(this);
    this.addHunch = this.addHunch.bind(this);
    this.createHunch = this.createHunch.bind(this);
    this.deleteHunch = this.deleteHunch.bind(this);
    this.editHunch = this.editHunch.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.unloadData();
  }

  loadData() {
    const boxId = this.props.match.params.id;
    this.props.loadBox(boxId);
    this.props.loadHunches(boxId, false, 12);
  }

  unloadData() {
    this.props.unloadBox();
    this.props.unloadHunches();
  }

  addHunch() {
    const {box} = this.props;
    const boxId = box && box.id ? box.id : this.props.match.params.id;
    this.props.showModal(modalTypes.HUNCH_SELECTOR_MODAL, {boxId});
  }

  createHunch() {
    this.props.openHunchEditorModal(selectors.getEditor);
  }

  editHunch(hunch) {
    this.props.openHunchEditorModal(selectors.getEditor, hunch);
  }

  deleteHunch(hunch) {
    this.props.deleteHunch(hunch);
  }

  render() {
    const {isFetchingBox, isFetchingHunches, box, hunches} = this.props;

    return (
      <div className="box-detail">
        <div className="container">
          <div className="box-detail__header pt-3 pb-3">
            {isFetchingBox && <div className="box-detail__box-loading my-4"><Spinner/></div>}
            {!box && !isFetchingBox && <div className="box-detail__box-not-found">Box Not Found</div>}
            {box &&
            <div className="clearfix">
              <div className="float-left">
                <h2 className="box-detail__box-title">{box.title}</h2>
              </div>
              <div className="float-right">
                <button
                  className="box-detail__create-hunch-button btn btn-success mr-2"
                  onClick={this.createHunch}>New Hunch
                </button>
                <button
                  className="box-detail__add-hunch-button btn btn-primary"
                  onClick={this.addHunch}>Existing Hunch
                </button>
              </div>
            </div>}
          </div>

          {box &&
          <div className="box-detail__body">
            {!isFetchingHunches && isEmpty(hunches) &&
            <div className="box-detail__hunches-not-found">No Hunch in the Box. <strong>Add a Hunch.</strong></div>}

            <InfiniteScroll
              loadMore={() => this.props.loadHunches(true)}
              loader={<div className="box-detail__hunches-loading my-4"><Spinner/></div>}
              hasMore={!!this.props.nextPageUrlForHunches}>
              <Grid
                className="hunch-list"
                items={hunches}
                render={hunch =>
                  <HunchPreview hunch={hunch}>
                    <HunchPreview.Header onDelete={this.deleteHunch} onEdit={this.editHunch}/>
                    <HunchPreview.Body/>
                  </HunchPreview>
                }/>
            </InfiniteScroll>

            <HunchEditorModal/>

          </div>}
        </div>
      </div>);
  }
}

BoxDetail.propTypes = {
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
  nextPageUrlForHunches: PropTypes.string,
  hunches: PropTypes.array,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {isFetching: isFetchingHunches, nextPageUrl: nextPageUrlForHunches} = selectors.getPagination(state);
  const {isFetching: isFetchingBox} = boxSelectors.getActive(state);
  return {
    isFetchingHunches,
    hunches: selectors.getAll(state),
    nextPageUrlForHunches,
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
})(BoxDetail);
