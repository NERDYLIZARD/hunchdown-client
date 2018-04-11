/**
 * Created on 11-Apr-18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initialState from '../../constants/initialState';
// import CustomPropTypes from '../../constants/customPropTypes';


export class CardEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      card: initialState.card,
      errors: {},
      isSaving: false
    };
  }

  render() {
    return (
      <div>
        Editor
      </div>
    );
  }
}

CardEditor.propTypes = {
  // card: PropTypes.objectOf(CustomPropTypes.card).isRequired
};

const mapStateToProps = ({ }) => ({

});

export default connect(mapStateToProps, {})(CardEditor);
