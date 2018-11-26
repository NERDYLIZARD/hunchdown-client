/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const HunchPreviewHeader = ({hunch, onEdit, onDelete}) => {
  return (
    <div className="hunch-preview__header card-header clearfix">
      <div className="hunch-preview__header__actions pull-right">
        <a className="hunch-preview__header__edit-button" href="#" onClick={() => onEdit(hunch)}><i className="fa fa-edit"/></a>
        <a className="hunch-preview__header__delete-button" href="#" onClick={() => onDelete(hunch)}><i className="fa fa-trash"/></a>
      </div>
    </div>
  );
};

HunchPreviewHeader.propTypes = {
  hunch: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

