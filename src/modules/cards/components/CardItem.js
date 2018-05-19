/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import CustomPropTypes from '../../../utils/customPropTypes';
import PropTypes from 'prop-types';

const CardItem = ({ card, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header clearfix">
        <div className="card-actions pull-right">
          <a href="#" onClick={e => onEdit(e, card)}><i className="fa fa-edit"></i></a>
          <a href="#" onClick={e => onDelete(e, card)}><i className="fa fa-trash"></i></a>
        </div>
      </div>
      <div className="card-body">
        <p className="card-wisdom">{card.wisdom}</p>
        <p className="card-attribute">- {card.attribute} -</p>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: CustomPropTypes.card.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardItem;
