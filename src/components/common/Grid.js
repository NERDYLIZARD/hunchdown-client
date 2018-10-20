/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Grid = ({items, render, className}) => {
  return (
    <div className={classnames('grid', className)}>
      <div className="row">
        {items.map(item =>
          <div className="grid__item col-sm-12 col-md-6 col-lg-4 col-xl-3" key={item.id}>
            {render(item)}
          </div>)}
      </div>
    </div>
  );
};

Grid.propTypes = {
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Grid;
