/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const BoxPreviewBody = ({box, onClick}) => {
  return (
    <div className="box-preview__body card-body" onClick={() => onClick(box)}>
      <p className="box-preview__body__title card-title">{box.title}</p>
      {box.description &&
      <p className="box-preview__body__description card-description">{box.description}</p>}
    </div>
  );
};

BoxPreviewBody.propTypes = {
  box: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
