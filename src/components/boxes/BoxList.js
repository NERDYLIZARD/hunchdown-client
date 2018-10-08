/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BoxPreview from './preview/BoxPreview'; // eslint-disable-line import/no-named-as-default


const BoxList = ({boxes, onEdit, onDelete}) => {
  return (
    <div className="box-list">
      <div className="row">
        {boxes.map(box =>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={box.id}>
            <BoxPreview
              box={box}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>)}
      </div>
    </div>
  );
};

BoxList.propTypes = {
  boxes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default BoxList;
