/**
 * Created on 18-May-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HunchItem from './HunchItem'; // eslint-disable-line import/no-named-as-default

const HunchList = ({ hunches, onEdit, onDelete }) => {
  return (
    <div className="hunch-list">
      {hunches.map(hunch =>
        <HunchItem
          key={hunch.id}
          hunch={hunch}
          onEdit={onEdit}
          onDelete={onDelete}
        />)}
    </div>
  );
};

HunchList.propTypes = {
  hunches: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default HunchList;
