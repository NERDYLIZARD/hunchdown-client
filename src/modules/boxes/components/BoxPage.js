/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBoxes, deleteBox, openBoxEditorModal } from '../actions';
import * as selectors from '../selectors';
import BoxList from './BoxList';
import BoxEditorModal from './BoxEditorModal'; // eslint-disable-line import/no-named-as-default


export class BoxPage extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.deleteBox = this.deleteBox.bind(this);
  }

  componentDidMount () {
    this.props.loadBoxes();
  }

  deleteBox (e, box) {
    e.preventDefault();
    this.props.deleteBox(box);
  }

  render () {
    const {boxes, openBoxEditorModal} = this.props;

    return (
      <div className="box-page container-fluid">
        <div className="row">
          <div className="box-page-header clearfix">
            <div className="pull-left">
              <h2>Boxes</h2>
            </div>
            <div className="pull-right">
              <button className="create-box-button btn btn-success" onClick={() => openBoxEditorModal(null, selectors.getEditor)}>New Box</button>
            </div>
          </div>
        </div>
        <div className="row">
          {boxes ?
            <BoxList boxes={boxes} onDelete={this.deleteBox}/> : null
          }
        </div>
        <BoxEditorModal/>
      </div>
    );
  }
}

BoxPage.propTypes = {
  boxes: PropTypes.array,
  loadBoxes: PropTypes.func.isRequired,
  deleteBox: PropTypes.func.isRequired,
  openBoxEditorModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    boxes: selectors.getAll(state)
  }
};

export default connect(mapStateToProps, {loadBoxes, deleteBox, openBoxEditorModal})(BoxPage);
