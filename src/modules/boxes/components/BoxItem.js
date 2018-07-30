/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../../utils/customPropTypes';

const BoxItem = ({ box, onDelete }) => {
  return (
    <div className="box card">
      <div className="box-header card-header clearfix">
        <div className="box-actions pull-right">
          <a className="box-delete-button" href="#" onClick={e => onDelete(e, box)}><i className="fa fa-trash"></i></a>
        </div>
      </div>
      <div className="box-body card-body">
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
};

export default BoxItem;
