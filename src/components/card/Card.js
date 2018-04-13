/**
 * Created on 11-Apr-18.
 */
import React from 'react';
import CustomPropTypes from '../../constants/customPropTypes';

const Card = ({ card }) => {
  return (
    <tr>
      <td><i>{card.wisdom}</i></td>
      <td>{card.attribute}</td>
    </tr>
  );
};

Card.propTypes = {
  card: CustomPropTypes.card.isRequired,
};

export default Card;
