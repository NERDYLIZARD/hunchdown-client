/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../constants/custom-proptypes';

const HunchItem = ({ hunch, onEdit, onDelete }) => {
  return (
    <div className="hunch-item hunch card">
      <div className="card-header hunch-header clearfix">
        <div className="hunch-actions pull-right">
          <a className="hunch-edit-button" href="#" onClick={e => onEdit(e, hunch)}><i className="fa fa-edit"/></a>
          <a className="hunch-delete-button" href="#" onClick={e => onDelete(e, hunch)}><i className="fa fa-trash"/></a>
        </div>
      </div>
      <div className="hunch-body card-body">
        <p className="hunch-wisdom">{hunch.wisdom}</p>
        {hunch.attribute ?
          <p className="hunch-attribute">- {hunch.attribute} -</p> : null
        }
      </div>
    </div>
  );
};

HunchItem.propTypes = {
  hunch: CustomPropTypes.hunch.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HunchItem;
