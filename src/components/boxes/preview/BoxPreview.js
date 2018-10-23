/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../../utils/custom-proptypes';
import { BoxPreviewHeader } from './BoxPreviewHeader';
import { BoxPreviewBody } from './BoxPreviewBody';

export const BoxPreview = ({box, onBodyClick, onEdit, onDelete}) => {
  return (
    <div className="box-preview card">
      <BoxPreviewHeader box={box} onEdit={onEdit} onDelete={onDelete}/>
      <BoxPreviewBody box={box} onClick={onBodyClick}/>
    </div>
  );
};

BoxPreview.propTypes = {
  box: CustomPropTypes.box.isRequired,
  onBodyClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
