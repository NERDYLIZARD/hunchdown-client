/**
 * Created on 26-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Accept ContextConsumer and return it with Compound Component validator. The validator throws error if the compound component's components is rendering without context i.e. outside the compound component.
 * @param ContextConsumer The ContextConsumer to be wrapped with validator
 * @returns The ContextConsumer wrapped with validator
 */
const withContextConsumerValidation = (ContextConsumer) => {
  function Wrapper ({children}) {
    return (
      <ContextConsumer>
        {context => {
          if (!context) {
            throw new Error(`Compound components cannot be rendered as a standalone component.`);
          }
          return children(context);
        }}
      </ContextConsumer>
    );
  }

  Wrapper.propTypes = {children: PropTypes.func.isRequired};
  Wrapper.displayName = 'withContextConsumerValidation';
  return Wrapper;
};

withContextConsumerValidation.propTypes = {
  ContextConsumer: PropTypes.node.isRequired,
};

export default withContextConsumerValidation;
