/**
 * Created on 26-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrap ContextConsumer and return it with validation layer.
 * The validation throws error if the compound component's components is rendering without context i.e. outside the compound component.
 */
const withContextConsumerValidation = (componentName, ContextConsumer) => {
  function Wrapper ({children}) {
    return (
      <ContextConsumer>
        {context => {
          if (!context) {
            throw new Error(`${componentName} compound components cannot be rendered outside the ${componentName} component`);
          }
          return children(context);
        }}
      </ContextConsumer>
    );
  }
  Wrapper.displayName = `${componentName}ContextConsumer`;
  return Wrapper;
};

withContextConsumerValidation.propTypes = {
  componentName: PropTypes.string.isRequired,
  ContextConsumer: PropTypes.node.isRequired,
};

export default withContextConsumerValidation;
