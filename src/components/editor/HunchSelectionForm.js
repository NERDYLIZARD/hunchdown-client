/**
 * Created on 11-Oct-18.
 */
/**
 * Created on 27-Mar-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadHunches} from '../../actions/hunches';
import {loadBox} from '../../actions/boxes';
import * as selectors from '../../selectors/hunches';
import * as boxSelectors from '../../selectors/boxes';
import {isEmpty} from 'lodash';
/* eslint-disable import/no-named-as-default */
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from "../common/Spinner";
import Grid from "../common/Grid";
import {HunchPreview} from "../hunches/preview/HunchPreview";
import forOwn from 'lodash/forOwn'


export class HunchSelectionForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.loadData = this.loadData.bind(this);
    this.handleHunchClick = this.handleHunchClick.bind(this);
    this.returnSelectedHunches = this.returnSelectedHunches.bind(this);

    this.state = {
      // load hunches without props.omittedHunches
      hunches: [],
      // derived from arrya props.selectedHunches an object with id as key and boolean as value
      selectedHunches: {},
    };

  }

  componentDidMount() {
    this.loadData();
    this.setState(() => ({
      selectedHunches: HunchSelectionForm.formatSelectedHunches(this.props.selectedHunches)
    }))
  }

  loadData() {
    const boxId = this.props.box.id;
    this.props.loadHunches(boxId, false, 12);
  }

  static formatSelectedHunches(selectedHunches = []) {
    return selectedHunches.reduce((formattedSelectedHunches, selectedHunch) => {
      formattedSelectedHunches[selectedHunch] = true;
      return formattedSelectedHunches;
    }, {})
  }

  handleHunchClick(hunch) {
    this.setState((state) => ({
      selectedHunches: {
        ...state.selectedHunches,
        [hunch.id]: !state.selectedHunches[hunch.id]
      }
    }));
  }

  returnSelectedHunches() {
    const selectedHunchesArray = [];
    forOwn(this.state.selectedHunches, (value, key) => {
      if (value === true)
        selectedHunchesArray.push(key)
    });
    this.props.onReturnSelectedHunches(selectedHunchesArray)
  }

  render() {
    const {isFetchingBox, isFetchingHunches, box, hunches} = this.props;

    return (
      <div className="hunch-selection-form scrollable">
        <div className="container">
          <div className="box-detail__header pt-3 pb-3">
            {isFetchingBox && <div className="box-detail__box-loading my-4"><Spinner/></div>}
            {!box && !isFetchingBox && <div className="box-detail__box-not-found">Box Not Found</div>}
            {box &&
            <div>
              <h2 className="box-detail__box-title">{box.title}</h2>
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
                    <HunchPreview.Body onClick={hunch => this.handleHunchClick(hunch)}/>
                    {this.state.selectedHunches[hunch.id] && <p className="text-center">selected</p>}
                  </HunchPreview>
                }/>
            </InfiniteScroll>

          </div>}
        </div>
      </div>);
  }
}

HunchSelectionForm.propTypes = {
  loadHunches: PropTypes.func.isRequired,
  box: PropTypes.object,
  isFetchingHunches: PropTypes.bool.isRequired,
  nextPageUrlForHunches: PropTypes.string,
  hunches: PropTypes.array,
  selectedHunches: PropTypes.array,
  onReturnSelectedHunches: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const {isFetching: isFetchingHunches, nextPageUrl: nextPageUrlForHunches} = selectors.getPagination(state);
  const {isFetching: isFetchingBox} = boxSelectors.getActive(state);
  return {
    isFetchingHunches,
    hunches: selectors.getAll(state),
    nextPageUrlForHunches,
    isFetchingBox,
  }
};

export default connect(mapStateToProps, {
  loadBox,
  loadHunches,
}, null, { withRef: true })(HunchSelectionForm);
