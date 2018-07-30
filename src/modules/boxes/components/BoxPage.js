/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CustomPropTypes from '../../../utils/customPropTypes';


export class BoxPage extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  // componentDidMount() {
  //   this.props.loadBoxes();
  // }

  render() {
    return (
      <div>
        <h1>BoxPage</h1>
      </div>
    );
  }
}

BoxPage.propTypes = {
  boxes: PropTypes.objectOf(CustomPropTypes.box),
};

const mapStateToProps = ({ boxes }) => {
  return {};
  // return {
  //   boxes: boxes.byId
  // }
};

export default connect(mapStateToProps, { ...actions })(BoxPage);
