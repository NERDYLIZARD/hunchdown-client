/**
 * Created on 11-Oct-18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


export class HunchSelectionForm extends Component
{
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <button className="btn" onClick={() => this.props.onBackNavigationClick()}>Back</button>
        <h2>Hunch Selection</h2>
      </div>
    );
  }
}

HunchSelectionForm.propTypes = {
  onBackNavigationClick: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(HunchSelectionForm);
