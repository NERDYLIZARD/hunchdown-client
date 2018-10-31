/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../../constants/custom-proptypes';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';
import withValidation from '../../HOC/withContextConsumerValidation';
import withContextConsumer from '../../HOC/withContextConsumer';

const BoxPreviewContext = React.createContext();
const BoxPreviewContextConsumer = withValidation(BoxPreviewContext.Consumer);

export class BoxPreview extends React.Component
{
  static Header = withContextConsumer(BoxPreviewHeader, BoxPreviewContextConsumer);
  static Body = withContextConsumer(BoxPreviewBody, BoxPreviewContextConsumer);

  // prevent unintentional re-rendering of Context's consumer.
  state = {
    box: this.props.box
  };

  render () {
    return (
      <BoxPreviewContext.Provider value={this.state}>
        <div className="box-preview card">
          {this.props.children}
        </div>
      </BoxPreviewContext.Provider>
    );
  }
}

BoxPreview.propTypes = {
  box: CustomPropTypes.box.isRequired,
  children: PropTypes.node.isRequired,
};
