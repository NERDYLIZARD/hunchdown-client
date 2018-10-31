/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const BoxPreviewHeader = ({box, onEdit, onDelete}) => {
  return (
    <div className="box-preview__header card-header clearfix">
      <div className="box-preview__header__actions pull-right">
        <a className="box-preview__header__edit-button" href="#" onClick={() => onEdit(box)}><i
          className="fa fa-edit"></i></a>
        <a className="box-preview__header__delete-button" href="#" onClick={() => onDelete(box)}><i
          className="fa fa-trash"></i></a>
      </div>
    </div>
  );
};

BoxPreviewHeader.propTypes = {
  box: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

