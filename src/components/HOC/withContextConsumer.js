/**
 * Created on 31-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit'

/**
 * return the component wrapping with ContextConsumer and having props and selective context's props
 * @param Component A Component to be wrapped
 * @param ContextConsumer A ContextConsumer that wraps the Component
 * @param omittedContext The context's properties that are omitted
 * @returns The component wrapping with ContextConsumer and having props and selective context's props
 */
const withContextConsumer = (Component, ContextConsumer, omittedContext = []) => {
  function Wrapper (props) {
    return (
      <ContextConsumer>{(context) =>
        <Component {...props} {...omit(context, omittedContext)}/>
      }</ContextConsumer>
    );
  }
  Wrapper.displayName = `withContextConsumer(${Component.displayName || Component.name})`;
  return Wrapper;
};

withContextConsumer.propTypes = {
  Component: PropTypes.element.isRequired,
  ContextConsumer: PropTypes.element.isRequired,
};

export default withContextConsumer;
