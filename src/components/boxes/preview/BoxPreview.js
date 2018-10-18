/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CustomPropTypes from '../../../utils/custom-proptypes';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';

export class BoxPreview extends React.Component
{
  constructor (props, context) {
    super(props, context);
    this.navigateToBoxDetail = this.navigateToBoxDetail.bind(this);
  }

  navigateToBoxDetail() {
    this.props.history.push(`/boxes/${this.props.box.id}`);
  }

  render() {
    const {box, onEdit, onDelete} = this.props;
    return (
      <div className="box-preview card">
        <BoxPreviewHeader box={box} onEdit={onEdit} onDelete={onDelete}/>
        <BoxPreviewBody box={box} onClick={this.navigateToBoxDetail}/>
      </div>
    );
  }
}

BoxPreview.propTypes = {
  box: CustomPropTypes.box.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default withRouter(BoxPreview);
