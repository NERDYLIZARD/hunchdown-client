/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../../utils/custom-proptypes';

export const BoxPreviewBody = ({box, onClick}) => {
  return (
    <div className="box-preview__body card-body" onClick={() => onClick(box)}>
      <p className="box-preview__body__title card-title">{box.title}</p>
      {box.description ?
        <p className="box-preview__body__description card-description">{box.description}</p> : null
      }
    </div>
  );
};

BoxPreviewBody.propTypes = {
  box: CustomPropTypes.box.isRequired,
  onClick: PropTypes.func.isRequired,
};
