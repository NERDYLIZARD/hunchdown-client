/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import CustomPropTypes from '../../constants/customPropTypes';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ card, onDelete }) => {
  return (
    <tr>
      <td><i>{card.wisdom}</i></td>
      <td>{card.attribute}</td>
      <td><Link to={`/cards/edit/${card.slug}`}>Edit</Link></td>
      <td><Link to="#" onClick={() => onDelete(card)}>Delete</Link></td>
    </tr>
  );
};

Card.propTypes = {
  card: CustomPropTypes.card.isRequired,
  onDelete: PropTypes.func,
};

export default Card;
