/**
 * Created on 18-May-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HunchItem from './HunchItem'; // eslint-disable-line import/no-named-as-default

const HunchList = ({hunches, onEdit, onDelete}) => {
  return (
    <div className="hunch-list">
      <div className="row">
        {hunches.map(hunch =>
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={hunch.id}>
            <HunchItem
              hunch={hunch}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>)}
      </div>
    </div>
  );
};

HunchList.propTypes = {
  hunches: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default HunchList;
