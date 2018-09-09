/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BoxItem from './BoxItem'; // eslint-disable-line import/no-named-as-default


const BoxList = ({boxes, onEdit, onDelete}) => {
  return (
    <div className="box-list">
      {boxes.map(box =>
        <div className="col-xs-4" key={box.id}>
          <BoxItem
            box={box}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>)}
    </div>
  );
};

BoxList.propTypes = {
  boxes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default BoxList;
