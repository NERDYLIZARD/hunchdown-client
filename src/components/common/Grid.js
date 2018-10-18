/**
 * Created on 30-Jul-18.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({items, render, className}) => {
  let _className = 'grid';
  if (className)
    _className = `${_className} ${className}`;

  return (
    <div className={_className}>
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
