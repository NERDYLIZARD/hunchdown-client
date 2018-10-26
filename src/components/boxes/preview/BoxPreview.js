/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import CustomPropTypes from '../../../constants/custom-proptypes';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';
import withValidation from '../../HOC/withContextConsumerValidation';

const BoxPreviewContext = React.createContext();

export class BoxPreview extends React.Component
{
  static Header = BoxPreviewHeader;
  static Body = BoxPreviewBody;

  // prevent unintentional re-render of Context's consumer.
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

export const BoxPreviewContextConsumer = withValidation(BoxPreview.displayName, BoxPreviewContext.Consumer);

BoxPreview.propTypes = {
  box: CustomPropTypes.box.isRequired,
};
