/**
 * Created on 18-May-18.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import HunchItem from './HunchItem'; // eslint-disable-line import/no-named-as-default


const HunchList = ({ hunches, onEdit, onDelete }) => {
  return (
    <div className="hunch-list">
      {_.map(hunches, hunch =>
        <HunchItem
          key={hunch.slug}
          hunch={hunch}
          onEdit={onEdit}
          onDelete={onDelete}
        />)}
    </div>
  );
};

HunchList.propTypes = {
  hunches: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default HunchList;
