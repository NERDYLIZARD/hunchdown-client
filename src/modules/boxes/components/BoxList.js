/**
 * Created on 30-Jul-18.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BoxItem from './BoxItem'; // eslint-disable-line import/no-named-as-default


const BoxList = ({boxes, onEdit, onDelete}) => {
  return (
    <div className="box-list">
      {_.map(boxes, box =>
        <div className="col-xs-4">
          <BoxItem
            key={box.id}
            box={box}
            // onEdit={onEdit}
            // onDelete={onDelete}
          />
        </div>)}
    </div>
  );
};

BoxList.propTypes = {
  boxes: PropTypes.object.isRequired,
  // onEdit: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired
};

export default BoxList;
