/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../../constants/custom-proptypes';
import { HunchPreviewHeader } from './HunchPreviewHeader';
import { HunchPreviewBody } from './HunchPreviewBody';
import withValidation from '../../HOC/withContextConsumerValidation';
import withContextConsumer from '../../HOC/withContextConsumer';

const HunchPreviewContext = React.createContext();
const HunchPreviewContextConsumer = withValidation(HunchPreviewContext.Consumer);

export class HunchPreview extends React.Component
{
  static Header = withContextConsumer(HunchPreviewHeader, HunchPreviewContextConsumer);
  static Body = withContextConsumer(HunchPreviewBody, HunchPreviewContextConsumer);

  // prevent unintentional re-rendering of Context's consumer.
  state = {
    hunch: this.props.hunch
  };

  render () {
    return (
      <HunchPreviewContext.Provider value={this.state}>
        <div className="hunch-preview card">
          {this.props.children}
        </div>
      </HunchPreviewContext.Provider>
    );
  }
}

HunchPreview.propTypes = {
  hunch: CustomPropTypes.hunch.isRequired,
  children: PropTypes.node.isRequired,
};
