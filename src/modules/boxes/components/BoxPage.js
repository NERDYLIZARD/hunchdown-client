/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as selectors from '../selectors';
import CustomPropTypes from '../../../utils/customPropTypes';
import BoxList from './BoxList';
import CreateBoxModal from './CreateBoxModal'; // eslint-disable-line import/no-named-as-default


export class BoxPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.state = {
      showCreateBoxModal: false,
    };

    this.deleteBox = this.deleteBox.bind(this);
    this.openCreateBoxModal = this.openCreateBoxModal.bind(this);
    this.closeCreateBoxModal = this.closeCreateBoxModal.bind(this);
  }

  componentDidMount () {
    this.props.loadBoxes();
  }

  openCreateBoxModal (e) {
    e.preventDefault();
    this.setState({showCreateBoxModal: true});
  }

  closeCreateBoxModal () {
    this.setState({showCreateBoxModal: false});
  }

  deleteBox (e, box) {
    e.preventDefault();
    this.props.deleteBox(box);
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
              <button className="create-box-button btn btn-success" onClick={this.openCreateBoxModal}>New Box</button>
            </div>
          </div>
        </div>
        <div className="row">
          {boxes ?
            <BoxList boxes={boxes} onDelete={this.deleteBox}/> : null
          }
        </div>
        <CreateBoxModal modalOpen={this.state.showCreateBoxModal} closeCreateBoxModal={this.closeCreateBoxModal}/>
      </div>
    );
  }
}

BoxPage.propTypes = {
  boxes: PropTypes.objectOf(CustomPropTypes.box),
  loadBoxes: PropTypes.func.isRequired,
  deleteBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    boxes: selectors.getAll(state)
  }
};

export default connect(mapStateToProps, {...actions})(BoxPage);
