/**
 * Created on 11-Oct-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class BoxSelectionForm extends Component
{
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>Box Selection</div>
    );
  }
}

BoxSelectionForm.propTypes = {
  // myProp: PropTypes.string.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(BoxSelectionForm);
