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
import InfiniteScroll from '../common/InfiniteScroll';
import Grid from '../common/Grid';
import BoxPreviewWithRouter from './preview/BoxPreview';


export class BoxPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.deleteBox = this.deleteBox.bind(this);
    this.createBox = this.createBox.bind(this);
    this.editBox = this.editBox.bind(this);
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

  editBox (e, box) {
    e.preventDefault();
    this.props.openBoxEditorModal(selectors.getEditor, box);
  }

  deleteBox (e, box) {
    e.preventDefault();
    this.props.deleteBox(box);
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
            <InfiniteScroll args={[true]} onScroll={this.props.loadBoxes}>
              <Grid
                className="box-list"
                items={boxes}
                render={(box) =>
                  <BoxPreviewWithRouter
                    box={box}
                    onDelete={this.deleteBox}
                    onEdit={this.editBox}
                  />
                }/>
              {isFetchingBoxes && <div className="box-page__boxes-loading">Loading . . .</div>}
            </InfiniteScroll>
            <BoxEditorModal/>
          </div>
        </div>
      </div>
    );
  }
}

BoxPage.propTypes = {
  boxes: PropTypes.array,
  isFetchingBoxes: PropTypes.bool.isRequired,
  loadBoxes: PropTypes.func.isRequired,
  unloadBoxes: PropTypes.func.isRequired,
  deleteBox: PropTypes.func.isRequired,
  openBoxEditorModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {isFetching: isFetchingBoxes} = selectors.getPagination(state);
  return {
    isFetchingBoxes,
    boxes: selectors.getAll(state),
  }
};

export default connect(mapStateToProps, {
  loadBoxes,
  unloadBoxes,
  deleteBox,
  openBoxEditorModal
})(BoxPage);
