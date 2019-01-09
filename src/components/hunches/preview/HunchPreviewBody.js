/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const HunchPreviewBody = ({hunch, onClick}) => {
  return (
    <div className="hunch-preview__body card-body" onClick={() => onClick(hunch)}>
      <p className="hunch-preview__body__wisdom card-title">{hunch.wisdom}</p>
      {hunch.attribute &&
      <p className="hunch-preview__body__attribute card-description">- {hunch.attribute} -</p>}
    </div>

  );
};

HunchPreviewBody.propTypes = {
  hunch: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
