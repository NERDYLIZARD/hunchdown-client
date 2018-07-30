/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CustomPropTypes from '../../../utils/customPropTypes';
import BoxList from './BoxList';


export class BoxPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

  }

  componentDidMount () {
    this.props.loadBoxes();
  }

  render () {
    const {boxes} = this.props;

    return (
      <div className="box-page container-fluid">
        <div className="row">
          <div className="box-page-header clearfix">
            <div className="pull-left">
              <h2>Boxes</h2>
            </div>
            <div className="pull-right">
              <button className="create-box-button btn btn-success">New Box</button>
            </div>
          </div>
        </div>
        <div className="row">
          {boxes ?
            <BoxList boxes={boxes}/> : null
          }
        </div>
      </div>
    );
  }
}

BoxPage.propTypes = {
  loadBoxes: PropTypes.func.isRequired,
  boxes: PropTypes.objectOf(CustomPropTypes.box),
};

const mapStateToProps = ({boxes}) => {
  return {
    boxes: boxes.byId
  }
};

export default connect(mapStateToProps, {...actions})(BoxPage);
