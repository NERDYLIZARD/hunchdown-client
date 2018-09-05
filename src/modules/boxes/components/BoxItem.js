/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CustomPropTypes from '../../../utils/customPropTypes';

export const BoxItem = ({ box, onDelete, onEdit, history }) => {
  return (
    <div className="box card">
      <div className="box-header card-header clearfix">
        <div className="box-actions pull-right">
          <a className="box-edit-button" href="#" onClick={e => onEdit(e, box)}><i className="fa fa-edit"></i></a>
          <a className="box-delete-button" href="#" onClick={e => onDelete(e, box)}><i className="fa fa-trash"></i></a>
        </div>
      </div>
      <div className="box-body card-body" onClick={() => history.push(`boxes/${box.id}`)}>
        <p className="box-title card-title">{box.title}</p>
        {box.description ?
          <p className="box-description card-description">{box.description}</p> : null
        }
      </div>
    </div>
  );
};

BoxItem.propTypes = {
  box: CustomPropTypes.box.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(BoxItem);
