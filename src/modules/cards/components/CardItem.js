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
          <a className="card-edit-button" href="#" onClick={e => onEdit(e, card)}><i className="fa fa-edit"></i></a>
          <a className="card-delete-button" href="#" onClick={e => onDelete(e, card)}><i className="fa fa-trash"></i></a>
        </div>
      </div>
      <div className="card-body">
        <p className="card-wisdom">{card.wisdom}</p>
        {card.attribute ?
          <p className="card-attribute">- {card.attribute} -</p> : null
        }
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: CustomPropTypes.card.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardItem;
