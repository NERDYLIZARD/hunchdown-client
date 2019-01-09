/**
 * Created on 11-Oct-18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as selectors from "../../selectors/boxes";
import {isEmpty} from "lodash";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../common/Spinner";
import Grid from "../common/Grid";
import {BoxPreview} from "../boxes/preview/BoxPreview";
import {loadBoxes} from "../../actions/boxes";


export class BoxSelectionForm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.loadBoxes(12, false);
  }

  render() {
    const {boxes, isFetchingBoxes, selectedBoxes} = this.props;

    return (
      <div className="box-selection-form scrollable">
        <div className="container">

          <div className="box-page__header clearfix pt-3 pb-3">
            <div className="float-left">
              <h3>Boxes</h3>
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
                    <BoxPreview.Body onClick={box => this.props.onBoxSelected(box)}/>
                    {selectedBoxes &&
                    selectedBoxes[box.id] &&
                    selectedBoxes[box.id].length > 0 &&
                    <p className="text-center">{selectedBoxes[box.id].length} Selected</p>}
                  </BoxPreview>
                }/>
            </InfiniteScroll>

          </div>
        </div>
      </div>
    );
  }
}

BoxSelectionForm.propTypes = {
  boxes: PropTypes.array,
  selectedBoxes: PropTypes.object,
  isFetchingBoxes: PropTypes.bool.isRequired,
  nextPageUrl: PropTypes.string,
  loadBoxes: PropTypes.func.isRequired,
  onBoxSelected: PropTypes.func.isRequired,
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
})(BoxSelectionForm);
