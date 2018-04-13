/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import CustomPropTypes from '../../constants/customPropTypes';
import { Link } from 'react-router-dom';

const Card = ({ card }) => {
  return (
    <tr>
      <td><i>{card.wisdom}</i></td>
      <td>{card.attribute}</td>
      <td><Link to={`/cards/edit/${card.id}`}>Edit</Link></td>
    </tr>
  );
};

Card.propTypes = {
  card: CustomPropTypes.card.isRequired,
};

export default Card;
