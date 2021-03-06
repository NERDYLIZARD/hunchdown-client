/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { deleteBox, loadBoxes, openBoxEditorModal, unloadBoxes } from '../../actions/boxes';
import * as selectors from '../../selectors/boxes';
/* eslint-disable import/no-named-as-default */
import BoxEditorModal from './BoxEditorModal';
import InfiniteScroll from 'react-infinite-scroller';
import Grid from '../common/Grid';
import { BoxPreview } from './preview/BoxPreview';
import Spinner from '../common/Spinner';


export class BoxPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.createBox = this.createBox.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
    this.editBox = this.editBox.bind(this);
    this.navigateToBoxDetail = this.navigateToBoxDetail.bind(this);
  }

  componentDidMount () {
    this.props.loadBoxes(12, false);
  }

  componentWillUnmount () {
    this.props.unloadBoxes();
  }

  createBox (e) {
    e.preventDefault();
    this.props.openBoxEditorModal(selectors.getEditor);
  }

  deleteBox (box) {
    this.props.deleteBox(box);
  }

  editBox (box) {
    this.props.openBoxEditorModal(selectors.getEditor, box);
  }

  navigateToBoxDetail (box) {
    this.props.history.push(`/boxes/${box.id}`);
  }

  render () {
    const {boxes, isFetchingBoxes} = this.props;

    return (
      <div className="box-page">
        <div className="container">

          <div className="box-page__header clearfix pt-3 pb-3">
            <div className="float-left">
              <h2>Boxes</h2>
            </div>
            <div className="float-right">
              <button className="create-box-button btn btn-success" onClick={this.createBox}>New Box</button>
            </div>
          </div>

          <div className="box-page__body">
            {!isFetchingBoxes && isEmpty(boxes) &&
            <div className="box-page__boxes-not-found">No Box, Create a New Box</div>}

            <InfiniteScroll
              loadMore={() => this.props.loadBoxes(true)}
              loader={<div className="box-page__boxes-loading my-4"><Spinner/></div>}
              hasMore={!!this.props.nextPageUrl}>
              <Grid
                className="box-list"
                items={boxes}
                render={box =>
                  <BoxPreview box={box}>
                    <BoxPreview.Header onDelete={this.deleteBox} onEdit={this.editBox}/>
                    <BoxPreview.Body onClick={this.navigateToBoxDetail}/>
                  </BoxPreview>
                }/>
            </InfiniteScroll>

            <BoxEditorModal/>
          </div>
        </div>
      </div>
    );
  }
}

BoxPage.propTypes = {
  history: PropTypes.object,
  boxes: PropTypes.array,
  isFetchingBoxes: PropTypes.bool.isRequired,
  nextPageUrl: PropTypes.string,
  loadBoxes: PropTypes.func.isRequired,
  unloadBoxes: PropTypes.func.isRequired,
  deleteBox: PropTypes.func.isRequired,
  openBoxEditorModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {isFetching: isFetchingBoxes, nextPageUrl} = selectors.getPagination(state);
  return {
    isFetchingBoxes,
    nextPageUrl,
    boxes: selectors.getAll(state),
  }
};

export default connect(mapStateToProps, {
  loadBoxes,
  unloadBoxes,
  deleteBox,
  openBoxEditorModal
})(BoxPage);
